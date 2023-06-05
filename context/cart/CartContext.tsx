import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItems: number;
  removeProductInCart: (product: ICartProduct) => void;
  shippingAddress?: ShippingAddress;
  subTotal: number;
  tax: number;
  total: number;
  updateAddress: (adress: ShippingAddress) => void;
  updateCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext({} as ContextProps);
