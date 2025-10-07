import { action, Action } from "easy-peasy";
import { CurrentUser } from "../common/interfaces";

export type CurrentUserStore = {
  userData: CurrentUser;
  setUserData: Action<CurrentUserStore, CurrentUser>;
};

export const userModel: CurrentUserStore = {
  userData: {
    userId: "",
    email: "",
    role: "",
  },
  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
};
