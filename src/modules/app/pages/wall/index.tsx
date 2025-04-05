import { useParams } from "react-router-dom";
import { useGetWallUser } from "../../hooks/use-get-wall-user";

const WallPage = () => {
  const { username } = useParams();

  const wallUserReq = useGetWallUser(username);

  if (wallUserReq.error) {
    return (
      <div className="flex justify-center">
        <h3 className="text-3xl font-bold">Usuario no encontrado</h3>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-8/12 lg:w-8/12 flex flex-col gap-7 items-center md:flex-row">
        <div className="w-8/12 lg:w-6/12 px-5 flex items-center justify-center">
          <img
            src="/user.jpg"
            alt="Imagen de usuario"
            className="rounded-full"
            style={{ maxWidth: 300, maxHeight: 300 }}
          />
        </div>
        <div className="w-8/12 lg:w-6/12 px-5 flex flex-col gap-3">
          <h3 className="font-bold text-3xl">{wallUserReq.data?.username}</h3>
          <p>
            0 <span>publicaciones</span>
          </p>
          <p>
            0 <span>seguidores</span>
          </p>
          <p>
            0 <span>seguidos</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WallPage;
