import { createStore, Store } from "easy-peasy";
import { CurrentUserStore, userModel } from "./userModel";
import { adminModel, CurrentAdminStore } from "./adminModel";
import { cartModel, CartStore } from "./cartModel";

export interface AppStore {
  customer: CurrentUserStore;
  admin: CurrentAdminStore;
  cart: CartStore;
}

const storeModel: AppStore = {
  customer: userModel,
  admin: adminModel,
  cart: cartModel,
};

export const store: Store<AppStore> = createStore(storeModel);
