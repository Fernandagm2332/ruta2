'use client';
// Este módulo define un componente de vista de categoría utilizado para mostrar iconos, etiquetas y descripciones de categorías

// Importa el tipo de icono de React
import { IconType } from "react-icons";

// Interfaz para las propiedades del componente CategoryView
interface CategoryViewProps {
  icon: IconType; // Icono de la categoría
  label: string; // Etiqueta de la categoría
  description: string; // Descripción de la categoría
}

// Componente funcional CategoryView
const CategoryView: React.FC<CategoryViewProps> = ({ 
  icon: Icon,
  label,
  description
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" /> {/* Icono con tamaño específico */}
        <div className="flex flex-col">
            <div 
              className="text-lg font-semibold" // Etiqueta de categoría con fuente más gruesa
            >
              {label}
            </div>
            <div 
              className="text-neutral-500 font-light" // Descripción de categoría con fuente más ligera
            >
              {description}
            </div>
        </div>
      </div>
    </div>
   );
}
 
export default ListingCategory; // Exporta el componente CategoryView
