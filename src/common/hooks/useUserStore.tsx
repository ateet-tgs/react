import { useStoreActions, useStoreState } from "easy-peasy";

export const useUserStore = () => {
  const userData = useStoreState((state: any) => state.customer.userData);
  const setUserData = useStoreActions(
    (actions: any) => actions.customer.setUserData
  );
  return { userData, setUserData };
};
