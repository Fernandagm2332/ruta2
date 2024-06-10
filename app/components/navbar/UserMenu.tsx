'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

// Interfaz para las propiedades del componente UserMenu
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

// Definición del componente UserMenu
const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter(); // Hook para manejar la navegación

  const loginModal = useLoginModal(); // Hook para manejar el modal de login
  const registerModal = useRegisterModal(); // Hook para manejar el modal de registro
  const rentModal = useRentModal(); // Hook para manejar el modal de rentas

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  // Función para alternar el estado de isOpen
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Función para manejar el clic en el botón de rentar
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen(); // Abre el modal de login si no hay usuario actual
    }

    rentModal.onOpen(); // Abre el modal de rentas si hay usuario actual
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Pon en Ruta Veloz tus eventos!
        </div>
        <div 
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu /> {/* Icono del menú */}
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} /> {/* Muestra el avatar del usuario actual si existe */}
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <> {/* Menú cuando hay un usuario autenticado */}
                <MenuItem 
                  label="Mis eventos" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="Mis favoritos" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="Mis reservaciones" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="Mis propiedades" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Agrega un evento" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Cerrar sesión" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <> {/* Menú cuando no hay usuario autenticado */}
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;

