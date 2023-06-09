import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "@/database";
import { IOrder, IOrderItem, IUser } from "@/interfaces";
import { Order, Product } from "@/models";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;
  try {
    // verificar que tengamos un user
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!session) {
      return res
        .status(401)
        .json({ message: "Debe de estar autenticado para hacer esto" });
    }
    // crear un arreglo con los productos que la persona quiere
    const productsIds = orderItems.map((p) => p._id);
    await db.connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (product) => product.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error("Verifique el carrito de nuevo, producto no existe");
      }
      return prev + currentPrice * current.quantity;
    }, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);
    if (total !== backendTotal) {
      throw new Error("El total no cuadra con el monto");
    }
    // Todo bien hasta este punto
    const userId = (session.user as IUser)._id;
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      user: userId,
    });
    newOrder.total = Math.round(newOrder.total * 100) / 100;
    await newOrder.save();
    await db.disconnect();
    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }
};
