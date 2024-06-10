'use client'; // Indica que este archivo se ejecutará en el cliente (navegador)

// Importaciones
import { useSearchParams } from 'next/navigation'; // Hook de Next.js para obtener los parámetros de búsqueda de la URL
import { useMemo } from 'react'; // Hook de React para memorizar valores calculados
import { BiSearch } from 'react-icons/bi'; // Icono de búsqueda de react-icons
import { differenceInDays } from 'date-fns'; // Función para calcular la diferencia en días entre dos fechas

import useSearchModal from '@/app/hooks/useSearchModal'; // Hook personalizado para controlar el estado del modal de búsqueda
import useCountries from '@/app/hooks/useCountries'; // Hook personalizado para obtener información sobre países

// Definición del componente funcional Search
const Search = () => {
  const searchModal = useSearchModal(); // Inicializa el hook para controlar el modal de búsqueda
  const params = useSearchParams(); // Obtiene los parámetros de búsqueda de la URL
  const { getByValue } = useCountries(); // Desestructura la función getByValue del hook useCountries

  // Obtiene los valores de los parámetros de búsqueda
  const locationValue = params?.get('locationValue'); 
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  // Memoiza el valor de la etiqueta de ubicación
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere';
  }, [locationValue, getByValue]);

  // Memoiza el valor de la etiqueta de duración
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  // Memoiza el valor de la etiqueta de invitados
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return 'Add Guests';
  }, [guestCount]);

  // Retorno del componente JSX
  return ( 
    <div
      onClick={searchModal.onOpen} // Abre el modal de búsqueda al hacer clic en el contenedor
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel} {/* Muestra la etiqueta de ubicación */}
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel} {/* Muestra la etiqueta de duración */}
        </div>
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div> {/* Muestra la etiqueta de invitados */}
          <div 
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} /> {/* Icono de búsqueda */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporta el componente Search para que pueda ser utilizado en otras partes de la aplicación
export default Search;

