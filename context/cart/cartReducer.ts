import { ICartProduct } from "@/interfaces";
import { CartState } from "./CartProvider";

type CartAction =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Update Products in Cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Change Cart Quantity Product"; payload: ICartProduct }
  | { type: "[Cart] - Remove Product In Cart"; payload: ICartProduct }
  | {
      type: "[Cart] - Update Order Summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };
export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Update Products in Cart":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "[Cart] - Change Cart Quantity Product":
      return {
        ...state,
        cart: state.cart.map((p) => {
          if (p._id !== action.payload._id) return p;
          if (p._id !== action.payload.size) return p;
          return action.payload;
        }),
      };
    case "[Cart] - Remove Product In Cart":
      return {
        ...state,
        cart: state.cart.filter(
          (p) =>
            !(p._id === action.payload._id && p.size === action.payload.size)
        ),
      };
    case "[Cart] - Update Order Summary":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
