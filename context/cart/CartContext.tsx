import { createContext } from "react";
import { ICartProduct } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];
  updateCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeProductInCart: (product: ICartProduct) => void;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const CartContext = createContext({} as ContextProps);
