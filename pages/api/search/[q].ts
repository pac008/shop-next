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
      return searchProducts(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = "" } = req.query;
  if (q?.length === 0) {
    return res
      .status(400)
      .json({ message: "Debe especificar el query de búsqueda" });
  }
  try {
    q = q.toString().toLowerCase();
    await db.connect();

    const products = await Product.find({
      $text: { $search: q },
    })
      .select("title price slug inStock images -_id")
      .lean();

    if (!products.length) {
      await db.disconnect();
      return res
        .status(404)
        .json({ message: "no se encontró ningún producto" });
    }
    await db.disconnect();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(500).json({ message: "Algo salió mal request" });
  }
};
