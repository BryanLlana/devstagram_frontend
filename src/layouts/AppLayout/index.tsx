import { Link, Outlet } from "react-router-dom";

export const AppLayout = () => {
  const yearCurrent = new Date().getFullYear();

  return (
    <>
      <header className="p-5 bg-white shadow">
        <div className="container mx-auto flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <h1 className="text-3xl font-black">Devstagram</h1>
          <nav className="flex gap-5 items-center">
            <Link className="text-gray-600" to="/auth/login">
              Iniciar sesion
            </Link>
            <Link className="text-gray-600" to="/auth/register">
              Crear cuenta
            </Link>
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
