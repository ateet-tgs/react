import { action, Action } from "easy-peasy";
import { CurrentUser } from "../common/interfaces";

export type CurrentAdminStore = {
  adminData: CurrentUser;
  setAdminData: Action<CurrentAdminStore, CurrentUser>;
};

export const adminModel: CurrentAdminStore = {
  adminData: {
    userId: "",
    email: "",
    role: "",
  },
  setAdminData: action((state, payload) => {
    state.adminData = payload;
  }),
};
