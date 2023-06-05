import { db } from "@/database";
import { Order, Product, User } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      numberOfOrders: number;
      paidOrders: number;
      noPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number;
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await db.connect();
    const [
      numberOfOrders,
      paidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
    ] = await Promise.all([
      Order.count(),
      Order.count({ isPaid: true }),
      User.count({ role: "client" }),
      Product.count(),
      Product.count({ inStock: 0 }),
      Product.count({ inStock: { $lte: 10 } }),
    ]);

    await db.disconnect();

    res.status(200).json({
      numberOfOrders,
      paidOrders,
      noPaidOrders: numberOfOrders - paidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el server" });
  }
}
