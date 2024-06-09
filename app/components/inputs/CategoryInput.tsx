'use client';
// Este módulo define un componente de caja de categoría que muestra un icono y una etiqueta

import { IconType } from "react-icons";

// Interfaz para las propiedades del componente CategoryBox
interface CategoryBoxProps {
  icon: IconType; // Tipo de icono a mostrar
  label: string; // Etiqueta de la categoría
  selected?: boolean; // Indicador opcional de si la categoría está seleccionada
  onClick: (value: string) => void; // Función de clic en la caja de categoría
}

// Componente funcional CategoryBox
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick
}) => {
  return ( 
    <div
      onClick={() => onClick(label)} // Maneja el clic en la caja de categoría y pasa la etiqueta como valor
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'} // Aplica un estilo diferente si la categoría está seleccionada o no
      `}
    >
      <Icon size={30} /> {/* Muestra el icono con un tamaño específico */}
      <div className="font-semibold">
        {label} {/* Muestra la etiqueta de la categoría */}
      </div>
    </div>
   );
}
 
export default CategoryBox; // Exporta el componente CategoryBox

