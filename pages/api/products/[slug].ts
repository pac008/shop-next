import type { NextApiRequest, NextApiResponse } from "next";
import { SHOP_CONSTANTS, db } from "@/database";
import { Product } from "@/models";
import { IProduct } from "@/interfaces";

type Data = { message: string } | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;
  try {
    await db.connect();
    const product = await Product.findOne({ slug })
      //   .select("title price slug inStock images -_id")
      .lean();

    if (!product) {
      await db.disconnect();
      return res
        .status(404)
        .json({ message: "no existe producto con ese slug " + slug });
    }
    await db.disconnect();
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(500).json({ message: "Algo salió mal request" });
  }
};
