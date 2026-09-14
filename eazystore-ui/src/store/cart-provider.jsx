import { useEffect, useReducer } from "react";
import { CartContext } from "./cart-context";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (prevCart, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingItem = prevCart.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity }];
    }
    case REMOVE_FROM_CART: {
      return prevCart.filter(
        (item) => item.productId !== action.payload.productId,
      );
    }
    case CLEAR_CART:
      return [];
    default:
      return prevCart;
  }
};

export const CartProvider = ({ children }) => {
  const initialCartState = (() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (err) {
      console.error("Error parsing cart from local storage: ", err);
      return [];
    }
  })();

  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart to local storage: ", err);
    }
  }, [cart]);

  const addToCart = (product, quantity) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce((price, item) => price + item.quantity * item.price, 0);

  return (
    <CartContext
      value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity, totalPrice }}
    >
      {children}
    </CartContext>
  );
};
