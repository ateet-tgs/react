import { useStoreActions, useStoreState } from "easy-peasy";

export const useCartStore = () => {
  const cartData = useStoreState((state: any) => state.cart.cartData);
  return { cartData };
};
