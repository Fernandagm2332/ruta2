'use client';
// Este módulo define un componente de cabecera de listado o listingHead, utilizado para mostrar el título, la ubicación y la imagen del listado.

// Importa el componente Image de Next.js y el hook useCountries y los tipos de datos SafeUser
import Image from "next/image";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

// Importa el componente Heading y el componente HeartButton
import Heading from "../Heading";
import HeartButton from "../HeartButton";

// Interfaz para las propiedades del componente ListingHead
interface ListingHeadProps {
  title: string; // Título del listado
  locationValue: string; // Valor de la ubicación del listado
  imageSrc: string; // Fuente de la imagen del listado
  id: string; // Identificador del listado
  currentUser?: SafeUser | null; // Usuario actual (opcional)
}

// Componente funcional ListingHead
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries(); // Función para obtener país por valor

  const location = getByValue(locationValue); // Ubicación del listado

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`} // Subtítulo con la región y la etiqueta de ubicación
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead; // Exporta el componente ListingHead
