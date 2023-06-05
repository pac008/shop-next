import { FC, useEffect, useReducer } from "react";
import { CartContext, cartReducer } from ".";
import {
  ICartProduct,
  IOrder,
  IOrderItem,
  ShippingAddress,
} from "@/interfaces";
import Cookie from "js-cookie";
import { tesloApi } from "@/api";
import axios from "axios";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

export const CartInitialState: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
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

  useEffect(() => {
    const shippingAddress = {
      firstName: Cookie.get("firstName") || "",
      lastName: Cookie.get("lastName") || "",
      address: Cookie.get("address") || "",
      address2: Cookie.get("address2") || "",
      zip: Cookie.get("zip") || "",
      city: Cookie.get("city") || "",
      country: Cookie.get("country") || "",
      phone: Cookie.get("phone") || "",
    };
    dispatch({
      type: "[Cart] - LoadAddress from Cookies",
      payload: shippingAddress,
    });
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

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set("firstName", address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    Cookie.set("address2", address.address2 || "");
    Cookie.set("zip", address.zip);
    Cookie.set("city", address.city);
    Cookie.set("country", address.country);
    Cookie.set("phone", address.phone);
    dispatch({ type: "[Cart] - Update Address", payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("No hay dirección de entrega");
    }
    const body: IOrder = {
      orderItems: state.cart as unknown as IOrderItem[],
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };
    try {
      const { data } = await tesloApi.post("/orders", body);
      dispatch({ type: "[Cart] - Order Complete" });
      return {
        hasError: false,
        message: data._id,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Error no controlado hable con el admin",
      };
    }
  };
  return (
    <CartContext.Provider
      value={{
        ...state,
        updateCart,
        updateCartQuantity,
        removeProductInCart,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
