import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { useUserStore } from "../../common/hooks";
import { ApiResponse } from "../../common/interfaces";
import { Spinner } from "./Spinner";
import { useGetProfileDetails } from "../../api";

export default function Layout() {
  const { mutate, isPending } = useGetProfileDetails();
  const { setUserData } = useUserStore();
  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (res: AxiosResponse<ApiResponse>) => {
          const { data, message, status } = res.data;
          setUserData({ ...data, role: data.role });
          if (status) {
          } else {
            alert(message);
          }
        },
      }
    );
  }, []);
  return (
    <>
      {isPending ? (
        <>
          <div className="flex align-center justify-center w-full h-full">
            <Spinner variant="grow" size="xl" color="success" />
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
