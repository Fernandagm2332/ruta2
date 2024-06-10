'use client';

import qs from 'query-string'; // Importa la biblioteca query-string para manejar las URLs y las query strings.
import { useRouter, useSearchParams } from "next/navigation"; // Importa hooks de Next.js para la navegación y manejo de parámetros de búsqueda.
import { useCallback } from "react"; // Importa el hook useCallback de React para memoizar funciones.
import { IconType } from "react-icons"; // Importa el tipo IconType de react-icons para definir el tipo de icono que se usará en el componente.

// Interfaz para las propiedades del componente CategoryBox
interface CategoryBoxProps {
  icon: IconType; // Tipo de icono a mostrar.
  label: string; // Etiqueta de la categoría.
  selected?: boolean; // Indica si la categoría está seleccionada (opcional).
}

// Definición del componente CategoryBox
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter(); // Hook para manejar la navegación.
  const params = useSearchParams(); // Hook para obtener los parámetros de búsqueda actuales.

  // Función que maneja el clic en la caja de categoría
  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    // Si hay parámetros de búsqueda actuales, los parsea a un objeto
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // Actualiza la query con la categoría seleccionada
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };

    // Si la categoría seleccionada ya está en los parámetros, la elimina
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // Construye la nueva URL con los parámetros actualizados
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    // Navega a la nueva URL
    router.push(url);
  }, [label, router, params]);

  return ( 
    <div
      onClick={handleClick} // Llama a handleClick cuando se hace clic en la caja
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'} // Estilo condicional para la frontera inferior
        ${selected ? 'text-neutral-800' : 'text-neutral-500'} // Estilo condicional para el color del texto
      `}
    >
      <Icon size={26} /> {/* Muestra el icono con un tamaño de 26 */}
      <div className="font-medium text-sm">
        {label} {/* Muestra la etiqueta de la categoría */}
      </div>
    </div>
  );
}
 
export default CategoryBox;

