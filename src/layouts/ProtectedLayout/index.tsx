import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";
import { AuthRoutes } from "../../modules/auth/routes";
import { useGetUser } from "../../modules/auth/hooks/use-get-user";

const ProtectedLayout = () => {
  const { user, setUser } = useUserStore();

  const userReq = useGetUser();

  useEffect(() => {
    if (userReq.data && !user) {
      setUser(userReq.data);
    }
  }, [userReq.data]);

  if (userReq.isLoading) {
    return <div>Cargando...</div>;
  }

  if (userReq.data || user) {
    return <Outlet />;
  } else {
    return <Navigate to={AuthRoutes.LOGIN} replace />;
  }
};

export default ProtectedLayout;
