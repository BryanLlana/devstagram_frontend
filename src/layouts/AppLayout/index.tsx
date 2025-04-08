import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { AuthRoutes } from "../../modules/auth/routes";
import { theme } from "../../common/config/theme";
import Button from "../../common/components/Button";
import { CameraIcon } from "@heroicons/react/24/solid";
import { PostRoutes } from "../../modules/posts/routes";
import { WallRoutes } from "../../modules/app/routes";

export const AppLayout = () => {
  const navigate = useNavigate();
  const yearCurrent = new Date().getFullYear();
  const { user, setUser } = useUserStore();
  const isAuthenticated =
    user !== null && localStorage.getItem("auth_token") !== null;

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
    navigate(AuthRoutes.LOGIN);
  };

  return (
    <>
      <header className="p-5 bg-white shadow">
        <div className="container mx-auto flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <h1 className="text-3xl font-black">Devstagram</h1>
          <nav className="flex gap-5 items-center">
            {isAuthenticated ? (
              <>
                <div
                  style={{
                    backgroundColor: theme.color.PRIMARY[500],
                    borderRadius: 10,
                    padding: "5px 15px",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(WallRoutes.createWallUsername(user.username));
                  }}
                >
                  {user.name}
                </div>
                <Button
                  variant="secondary-gray"
                  size="M"
                  onClick={() => {
                    navigate(PostRoutes.create);
                  }}
                >
                  Crear
                  <CameraIcon className="text-black size-5" />
                </Button>
                <Button
                  variant="ghost"
                  color={theme.color.ALERT[800]}
                  size="L"
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Link className="text-gray-600" to="/auth/login">
                  Iniciar sesión
                </Link>
                <Link className="text-gray-600" to="/auth/register">
                  Crear cuenta
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
      <footer className="text-center p-5 text-gray-500 font-bold mt-10">
        Devstagram - &copy; Todos los derechos reservados {yearCurrent}
      </footer>
    </>
  );
};
