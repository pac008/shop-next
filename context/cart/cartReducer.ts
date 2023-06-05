import { ICartProduct, ShippingAddress } from "@/interfaces";
import { CartState } from "./";

type CartAction =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - LoadAddress from Cookies"; payload: ShippingAddress }
  | { type: "[Cart] - Update Address"; payload: ShippingAddress }
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
    }
  | { type: "[Cart] - Order Complete" };
export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case "[Cart] - Update Address":
    case "[Cart] - LoadAddress from Cookies":
      return {
        ...state,
        shippingAddress: action.payload,
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
    case "[Cart] - Order Complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };
    default:
      return state;
  }
};
