'use client';
// Este módulo define un componente de carga de imagenes utilizando Next-Cloudinary.

// Importamos el componente CldUploadWidget de Next-Cloudinary
import { CldUploadWidget } from "next-cloudinary";

// Importamos el componente Image de Next.js
import Image from "next/image";

// Importamos el hook useCallback de React para optimizar el rendimiento
import { useCallback } from "react";

// Importamos el icono TbPhotoPlus de react-icons/tb
import { TbPhotoPlus } from 'react-icons/tb'

// Declaramos la variable global cloudinary
declare global {
  var cloudinary: any;
}

// Configuración de la subida de imágenes
const uploadPreset = "pgc9ehd5";

// Interfaz para las propiedades del componente ImageUpload
interface ImageUploadProps {
  onChange: (value: string) => void; // Función de cambio de valor de la imagen
  value: string; // Valor de la imagen
}

// Componente funcional ImageUpload
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  // Función para manejar la subida de la imagen
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url); // Actualiza el valor de la imagen con la URL segura de la imagen subida
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset="vcopeibb" // Preset de carga de Cloudinary
      options={{
        maxFiles: 1 // Número máximo de archivos permitidos para la carga
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()} // Abre el widget de carga al hacer clic
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50} // Tamaño del icono
            />
            <div className="font-semibold text-lg">
                Haz clic para subir
            </div>
            {value && (
              <div className="
              absolute inset-0 w-full h-full">
                <Image
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} // Fuente de la imagen
                  alt="House" // Texto alternativo de la imagen
                />
              </div>
            )}
          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ImageUpload; // Exporta el componente ImageUpload
