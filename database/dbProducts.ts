import { Product } from "@/models";
import { db } from "./";
import { IProduct } from "@/interfaces";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  try {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    if (!product) {
      return null;
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    await db.disconnect();
    return null;
  }
};

interface ProductSlug {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[] | null> => {
  try {
    await db.connect();
    const slugs = await Product.find().select("slug -_id").lean();
    await db.disconnect();
    if (!slugs) {
      return null;
    }
    return JSON.parse(JSON.stringify(slugs));
  } catch (error) {
    await db.disconnect();
    return null;
  }
};

export const getProductsByTerm = async (term: string):Promise<IProduct[]> => {
  term = term.toLowerCase();
  try {
    await db.connect();
    const products = await Product.find({
      $text: { $search: term },
    })
      .select("title price slug inStock images -_id")
      .lean();
    await db.disconnect();
    if (!products.length) {
      await db.disconnect();
      return [];
    }
    return products;
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return [];
  }
};
export const getAllProducts = async ():Promise<IProduct[]> => {
  try {
    await db.connect();
    const products = await Product.find()
      .select("title price slug inStock images -_id")
      .lean();
    await db.disconnect();
    return products;
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return [];
  }
};

