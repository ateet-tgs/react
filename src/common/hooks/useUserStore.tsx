import { useStoreActions, useStoreState } from "easy-peasy";

export const useUserStore = () => {
  const userData = useStoreState((state: any) => state.user.userData);
  const setUserData = useStoreActions(
    (actions: any) => actions.user.setUserData
  );
  return { userData, setUserData };
};
