'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Importa los iconos de corazón de react-icons.

import { SafeUser } from "@/app/types"; // Importa el tipo SafeUser desde el proyecto.

import ClientOnly from "./ClientOnly"; // Importa el componente ClientOnly.
import useFavorite from "../hooks/useFavorite"; // Importa el hook personalizado useFavorite.

interface HeartButtonProps {
  listingId: string; // ID del listado al que se va a asociar el botón de corazón.
  currentUser?: SafeUser | null; // Información del usuario actual, opcional.
}

// Define el componente HeartButton, que acepta HeartButtonProps
const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
  currentUser
}) => {
  // Utiliza el hook useFavorite para determinar si el listado ha sido marcado como favorito y para manejar el cambio de estado de favorito.
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite} // Llama a toggleFavorite cuando se hace clic en el botón
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      {/* Icono de corazón vacío que se muestra detrás del corazón lleno */}
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      {/* Icono de corazón lleno que cambia de color dependiendo si está marcado como favorito */}
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}
 
export default HeartButton;
