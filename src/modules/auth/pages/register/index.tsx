import Button from "../../../../common/components/Button";
import { FieldWrapper } from "../../../../common/components/FieldWrapper";
import Input from "../../../../common/components/Input";
import { useForm } from "react-hook-form";
import { registerSchema, TRegisterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import {
  IRegisterUserPayload,
  registerUser,
} from "../../services/register-user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../routes";

const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm<TRegisterSchema, undefined, undefined>({
    reValidateMode: "onChange",
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const registerUserReq = useSWRMutation([registerUser], async () => {
    const values = form.getValues();

    const payload: IRegisterUserPayload = {
      name: values.name,
      email: values.email,
      username: values.username,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    };

    await registerUser(payload);

    toast.success("Usuario registrado correctamente");
    navigate(AuthRoutes.LOGIN);
  });

  return (
    <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 px-3 md:px-0">
      <div className="md:w-3/12">
        <img src="/register.webp" alt="" className="rounded-lg" />
      </div>
      <div className="md:w-5/12 flex flex-col gap-3 bg-white p-6 rounded-lg shadow-xl">
        <FieldWrapper
          labelContent="Nombre"
          inlineError={form.formState.errors.name?.message}
        >
          <Input placeholder="Ejm: Bryan" {...form.register("name")} />
        </FieldWrapper>
        <FieldWrapper
          labelContent="Nombre de usuario"
          inlineError={form.formState.errors.username?.message}
        >
          <Input placeholder="Ejm: BryanDev" {...form.register("username")} />
        </FieldWrapper>
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
        <FieldWrapper
          labelContent="Confirmar contraseña"
          inlineError={form.formState.errors.passwordConfirmation?.message}
        >
          <Input
            type="password"
            placeholder="Ejm: *********"
            {...form.register("passwordConfirmation")}
          />
        </FieldWrapper>
        <Button
          customStyles={{ width: "100%" }}
          onClick={form.handleSubmit(() => registerUserReq.trigger())}
        >
          Crear cuenta
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
