import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "../interfaces/products";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}
type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: { type: Array },
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "{VALUE} no es un tamaño permitido",
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: { type: Array },
    title: { type: String, required: true },
    type: [
      {
        type: String,
        enum: {
          values: ["shirts", "pants", "hoodies", "hats"],
          message: "{VALUE} no es un tipo permitido",
        },
      },
    ],
    gender: [
      {
        type: String,
        enum: {
          values: ["men", "women", "kid", "unisex"],
          message: "{VALUE} no es un género permitido",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// TODO: Crear indice de Mongo
productSchema.index({ title: "text", tags: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
