import { createStore, Store } from "easy-peasy";
import { CurrentUserStore, userModel } from "./authModel";
import { adminModel, CurrentAdminStore } from "./adminModel";

export interface AppStore {
  user: CurrentUserStore;
  admin: CurrentAdminStore;
}

const storeModel: AppStore = {
  user: userModel,
  admin: adminModel,
};

export const store: Store<AppStore> = createStore(storeModel);
