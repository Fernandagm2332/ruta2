//Este componente representa el modal de inicio de sesión. Permite a los usuarios iniciar sesión en el sistema utilizando su correo electrónico y contraseña, o mediante autenticación social con Google o Github. 
//El componente utiliza react-hook-form para manejar los campos de entrada y NextAuth signIn para gestionar la autenticación. Cuando un usuario inicia sesión correctamente, se muestra un mensaje de éxito y la página se actualiza. 
//También se proporciona un enlace para alternar entre el inicio de sesión y el registro en caso de que el usuario no tenga una cuenta.
'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

/**
 * Componente del modal de inicio de sesión.
 * Permite a los usuarios iniciar sesión en el sistema.
 */
const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal(); // Hook personalizado para el modal de inicio de sesión
  const registerModal = useRegisterModal(); // Hook personalizado para el modal de registro
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  // Formulario react-hook-form para manejar los campos de entrada
  const { 
    register, // Función de registro de campos de entrada
    handleSubmit, // Función para manejar la presentación del formulario
    formState: {
      errors, // Errores del formulario
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  // Función para manejar el envío del formulario de inicio de sesión
  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true); // Establecer isLoading a true durante la carga

    // Iniciar sesión utilizando NextAuth signIn
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => { // Manejar la respuesta de la promesa
      setIsLoading(false); // Establecer isLoading a false después de la carga

      if (callback?.ok) { // Si el inicio de sesión es exitoso
        toast.success('Logged in'); // Mostrar mensaje de éxito
        router.refresh(); // Actualizar la página
        loginModal.onClose(); // Cerrar el modal de inicio de sesión
      }
      
      if (callback?.error) { // Si hay un error en el inicio de sesión
        toast.error(callback.error); // Mostrar mensaje de error
      }
    });
  }

  // Función para alternar entre el inicio de sesión y el registro
  const onToggle = useCallback(() => {
    loginModal.onClose(); // Cerrar el modal de inicio de sesión
    registerModal.onOpen(); // Abrir el modal de registro
  }, [loginModal, registerModal])

  // Contenido del cuerpo del modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido"
        subtitle="¡Inicia sesión con tu cuenta!"
      />
      {/* Campos de entrada para correo electrónico y contraseña */}
      <Input
        id="email"
        label="Email"
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
  )

  // Contenido del pie de página del modal
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* Botones para iniciar sesión con Google y Github */}
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
      {/* Enlace para alternar entre el inicio de sesión y el registro */}
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>Primera vez aqui?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Crea una cuenta</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading} // Deshabilita el modal durante la carga
      isOpen={loginModal.isOpen} // Estado que controla la apertura del modal
      title="Login" // Título del modal
      actionLabel="Continue" // Etiqueta del botón de acción
      onClose={loginModal.onClose} // Función para cerrar el modal
      onSubmit={handleSubmit(onSubmit)} // Función para manejar la presentación del formulario
      body={bodyContent} // Contenido del cuerpo del modal
      footer={footerContent} // Contenido del pie de página del modal
    />
  );
}

export default LoginModal;
