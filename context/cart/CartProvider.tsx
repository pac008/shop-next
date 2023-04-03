import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from ".";
import { ICartProduct } from "@/interfaces";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const CartInitialState: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => prev + current.quantity,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };
    dispatch({ type: "[Cart] - Update Order Summary", payload: orderSummary });
  }, [state.cart]);

  useEffect(() => {
    try {
      const productsInCookies = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      return dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: productsInCookies,
      });
    } catch (error) {
      return dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  const updateCart = (product: ICartProduct) => {
    const exisProductInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!exisProductInCart) {
      return dispatch({
        type: "[Cart] - Update Products in Cart",
        payload: [...state.cart, product],
      });
    }
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      // p.quantity += product.quantity;
      return product;
    });
    return dispatch({
      type: "[Cart] - Update Products in Cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Change Cart Quantity Product",
      payload: product,
    });
  };

  const removeProductInCart = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Remove Product In Cart",
      payload: product,
    });
  };
  return (
    <CartContext.Provider
      value={{ ...state, updateCart, updateCartQuantity, removeProductInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
