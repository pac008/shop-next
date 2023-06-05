import type { NextApiRequest, NextApiResponse } from "next";
import { SHOP_CONSTANTS, db } from "@/database";
import { Product } from "@/models";
import { IProduct } from "@/interfaces";

type Data = { message: string } | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;
  let condition = {};
  try {
    await db.connect();
    if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
      condition = { gender };
    }

    const products = await Product.find(condition)
      .select("title price slug inStock images -_id")
      .lean();

    await db.disconnect();
    const updatedProducts = products.map((product) => {
      product.images = product.images.map((image) => {
        return image.includes("http")
          ? image
          : `${process.env.HOST_NAME}products/${image}`;
      });
      return product;
    });
    res.status(200).json(updatedProducts);
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: "Algo salió mal" });
  }
};
