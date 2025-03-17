import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import RegisterPage from "../modules/auth/pages/register";
import LoginPage from "../modules/auth/pages/login";
import { AuthRoutes } from "../modules/auth/routes";
import { WallRoutes } from "../modules/app/routes";
import WallPage from "../modules/app/pages/wall";
import ProtectedLayout from "../layouts/ProtectedLayout";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to={WallRoutes.INDEX} />} />
          <Route path={AuthRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AuthRoutes.REGISTER} element={<RegisterPage />} />

          <Route element={<ProtectedLayout />}>
            <Route path={WallRoutes.INDEX} element={<WallPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
