import { action, Action } from "easy-peasy";
import { Cart, CartItem, ShippingInfo } from "../common/interfaces";

export type CartStore = {
  cartData: Cart;

  addItem: Action<CartStore, CartItem>;
  removeItem: Action<CartStore, string>; // item id
  updateQuantity: Action<CartStore, { id: string; qty: number }>;
  setShipping: Action<CartStore, ShippingInfo>;
  clearCart: Action<CartStore>;
  calculateTotals: Action<CartStore>;
};

export const cartModel: CartStore = {
  cartData: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    shipping: undefined,
  },

  // Add item to cart
  addItem: action((state, payload) => {
    const existingItem = state.cartData.items.find(
      (item) => item.id === payload.id
    );

    if (existingItem) {
      // If item already in cart, just increase quantity
      existingItem.qty += payload.qty;
    } else {
      // Add as a new item
      state.cartData.items.push(payload);
    }

    // Recalculate totals after adding
    let totalQty = 0;
    let totalAmt = 0;

    state.cartData.items.forEach((item) => {
      totalQty += item.qty;
      totalAmt += item.qty * item.price;
    });

    state.cartData.totalQuantity = totalQty;
    state.cartData.totalAmount = totalAmt;
  }),

  // Remove item completely
  removeItem: action((state, itemId) => {
    state.cartData.items = state.cartData.items.filter(
      (item) => item.id !== itemId
    );

    // Recalculate totals
    let totalQty = 0;
    let totalAmt = 0;

    state.cartData.items.forEach((item) => {
      totalQty += item.qty;
      totalAmt += item.qty * item.price;
    });

    state.cartData.totalQuantity = totalQty;
    state.cartData.totalAmount = totalAmt;
  }),

  // Update quantity for specific item
  updateQuantity: action((state, { id, qty }) => {
    const item = state.cartData.items.find((i) => i.id === id);
    if (item) {
      item.qty = qty;
    }

    // Recalculate totals
    let totalQty = 0;
    let totalAmt = 0;

    state.cartData.items.forEach((item) => {
      totalQty += item.qty;
      totalAmt += item.qty * item.price;
    });

    state.cartData.totalQuantity = totalQty;
    state.cartData.totalAmount = totalAmt;
  }),

  // Set shipping info
  setShipping: action((state, shipping) => {
    state.cartData.shipping = shipping;
  }),

  // Clear entire cart
  clearCart: action((state) => {
    state.cartData = {
      items: [],
      totalAmount: 0,
      totalQuantity: 0,
      shipping: undefined,
    };
  }),

  // Manual recalculation (if needed externally)
  calculateTotals: action((state) => {
    let totalQty = 0;
    let totalAmt = 0;

    state.cartData.items.forEach((item) => {
      totalQty += item.qty;
      totalAmt += item.qty * item.price;
    });

    state.cartData.totalQuantity = totalQty;
    state.cartData.totalAmount = totalAmt;
  }),
};
