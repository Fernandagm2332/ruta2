//Este componente representa un modal de registro que permite a los usuarios crear una nueva cuenta en la aplicación 
//El modal incluye campos para el nombre, correo electrónico y contraseña del usuario 
//También proporciona opciones para registrarse utilizando cuentas de Google o GitHub 
//Los usuarios pueden alternar entre el modal de registro y el modal de inicio de sesión si ya tienen una cuenta existente

'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input"
import Button from "../Button";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal= () => {
  // Hooks para controlar el estado del modal y la carga
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

  // Registro de campos del formulario utilizando react-hook-form
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  // Función para manejar el envío del formulario de registro
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Llamada a la API para registrar al usuario
    axios.post('/api/register', data)
    .then(() => {
      toast.success('Success!')
      loginModal.onOpen();
      registerModal.onClose();
    })
    .catch((error) => {
      toast.error("Error");
    })
    .finally(() => {
      setIsLoading(false);
    })
  }
  
  // Función para alternar entre el modal de registro y el modal de inicio de sesión
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal])

  // Contenido del cuerpo del modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido a Ruta Veloz!"
        subtitle="Crea una cuenta!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // Contenido del pie de página del modal
  const footerContent = (
    <div className= "flex flex-col gap-4 mt-3"> 
      <hr />
      <Button 
        outline 
        label="Continua con Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Continua con Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <div className="justify-center flex flex-row items-center gap-2">

        <div>
          Ya tienes una cuenta?
        </div>
        <div
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > 
            Inicia Sesion
          </div>
        </div>
      </div>
    </div>
  )

  // Renderización del modal
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registro"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
