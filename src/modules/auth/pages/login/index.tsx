import { useForm } from "react-hook-form";
import Button from "../../../../common/components/Button";
import { FieldWrapper } from "../../../../common/components/FieldWrapper";
import Input from "../../../../common/components/Input";
import { loginSchema, TLoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { ILoginPayload, login } from "../../services/login";
import { useUserStore } from "../../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { WallRoutes } from "../../../app/routes";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const form = useForm<TLoginSchema, undefined, undefined>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginReq = useSWRMutation([login], async () => {
    const values = form.getValues();

    const payload: ILoginPayload = {
      email: values.email,
      password: values.password,
    };

    const res = await login(payload);
    localStorage.setItem("auth_token", res.data.token);
    setUser(res.data.user);
    navigate(WallRoutes.createWallUsername(res.data.user.username));
  });

  return (
    <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 px-3 md:px-0">
      <div className="md:w-3/12">
        <img src="/register.webp" alt="" className="rounded-lg" />
      </div>
      <div className="md:w-5/12 flex flex-col gap-3 bg-white p-6 rounded-lg shadow-xl">
        <FieldWrapper
          labelContent="Correo"
          inlineError={form.formState.errors.email?.message}
        >
          <Input
            type="email"
            placeholder="Ejm: bryan@gmail.com"
            {...form.register("email")}
          />
        </FieldWrapper>
        <FieldWrapper
          labelContent="Contraseña"
          inlineError={form.formState.errors.password?.message}
        >
          <Input
            type="password"
            placeholder="Ejm: *********"
            {...form.register("password")}
          />
        </FieldWrapper>

        <Button
          customStyles={{ width: "100%" }}
          onClick={form.handleSubmit(() => loginReq.trigger())}
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
