import { useCallback, useState } from "react";
import Button from "../../../../common/components/Button";
import { FieldWrapper } from "../../../../common/components/FieldWrapper";
import Input from "../../../../common/components/Input";
import { theme } from "../../../../common/config/theme";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { postSchema, TPostSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { createPost } from "../../services/create-post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { WallRoutes } from "../../../app/routes";
import { useUserStore } from "../../../../store/useUserStore";

const CreateOrEditPostPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<TPostSchema, undefined, undefined>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    form.setValue("image", file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const createPostReq = useSWRMutation([createPost], async () => {
    const values = form.getValues();
    await createPost(values);

    toast.success("Publicación creada con éxito");
    navigate(WallRoutes.createWallUsername(user!.username));
  });

  return (
    <div className="md:flex md:w-11/12 xl:w-8/12 md:justify-center md:gap-10  mx-auto px-5 md:px-0">
      <div className="md:w-1/2 flex flex-col">
        <FieldWrapper
          labelContent="Imagen"
          inlineError={form.formState.errors.image?.message}
        >
          {form.watch("image") && preview ? (
            <>
              <div style={{ height: 300, position: "relative" }}>
                <img
                  src={preview}
                  alt="Imagen"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -5,
                    backgroundColor: theme.color.ALERT[700],
                    color: "white",
                    borderRadius: "100%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setPreview(null);
                    form.setValue("image", undefined, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                >
                  X
                </div>
              </div>
            </>
          ) : (
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                borderRadius: "5px",
                height: 300,
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta tu archivo aquí...</p>
              ) : (
                <p>
                  Arrastra y suelta tu archivo aquí, o haz clic para seleccionar
                  tu archivo
                </p>
              )}
            </div>
          )}
        </FieldWrapper>
      </div>
      <div className="md:w-1/2 bg-white rounded-lg shadow-xl mt-10 md:mt-0 flex flex-col gap-5 p-5">
        <FieldWrapper
          labelContent="Título"
          inlineError={form.formState.errors.title?.message}
        >
          <Input placeholder="Ejm: Publicación" {...form.register("title")} />
        </FieldWrapper>
        <FieldWrapper
          labelContent="Descripción"
          inlineError={form.formState.errors.description?.message}
        >
          <textarea
            placeholder="dsads"
            rows={10}
            style={{
              border: `1px solid ${theme.color.NEUTRAL[400]}`,
              borderRadius: 8,
              padding: 10,
            }}
            {...form.register("description")}
          ></textarea>
        </FieldWrapper>
        <Button
          fullWidth
          onClick={form.handleSubmit(() => createPostReq.trigger())}
        >
          Crear publicación
        </Button>
      </div>
    </div>
  );
};

export default CreateOrEditPostPage;
