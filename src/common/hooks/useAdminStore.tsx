import { useStoreActions, useStoreState } from "easy-peasy";

export const useAdminStore = () => {
  const adminData = useStoreState((state: any) => state.admin.adminData);
  const setAdminData = useStoreActions(
    (actions: any) => actions.admin.setAdminData
  );
  return { adminData, setAdminData };
};
