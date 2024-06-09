'use client';
// Este módulo define un componente de información del listado utilizado para mostrar detalles del listado, como el usuario, 
//la descripción, los conteos de huéspedes, habitaciones y baños, la categoría y un mapa

// Importa el componente dinámico de Next.js, el tipo de icono de React y el hook useCountries, así como los tipos de datos SafeUser.
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

// Importa el componente Avatar y el componente ListingCategory.
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

// Importa el componente Map dinámicamente para evitar el SSR (Server Side Rendering).
const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

// Interfaz para las propiedades del componente ListingInfo.
interface ListingInfoProps {
  user: SafeUser; // Usuario del listado
  description: string; // Descripción del listado
  guestCount: number; // Conteo de huéspedes
  roomCount: number; // Conteo de habitaciones
  bathroomCount: number; // Conteo de baños
  category: {
    icon: IconType; // Icono de la categoría
    label: string; // Etiqueta de la categoría
    description: string; // Descripción de la categoría
  } | undefined; // Categoría del listado (opcional)
  locationValue: string; // Valor de la ubicación del listado
}

// Componente funcional ListingInfo.
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries(); // Función para obtener país por valor

  const coordinates = getByValue(locationValue)?.latlng; // Coordenadas de la ubicación del listado

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div> {/* Nombre del usuario anfitrión */}
          <Avatar src={user?.image} /> {/* Avatar del usuario anfitrión */}
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} Participantes {/* Conteo de huéspedes */}
          </div>
          <div>
            {roomCount} Etapas {/* Conteo de habitaciones */}
          </div>
          <div>
            {bathroomCount} Categorias {/* Conteo de baños */}
          </div>
        </div>
      </div>
      <hr /> {/* Línea divisoria */}
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr /> {/* Línea divisoria */}
      <div className="
      text-lg font-light text-neutral-500">
        {description} {/* Descripción del listado */}
      </div>
      <hr /> {/* Línea divisoria */}
      <Map center={coordinates} /> {/* Mapa con centro en las coordenadas de la ubicación del listado */}
    </div>
   );
}
 
export default ListingInfo; // Exporta el componente ListingInfo
