'use client';

import { useRouter } from "next/navigation"; // Importa el hook useRouter de Next.js para la navegación.

import Button from "./Button"; // Importa el componente Button desde el proyecto.
import Heading from "./Heading"; // Importa el componente Heading desde el proyecto.

interface EmptyStateProps {
  title?: string; // Título opcional para mostrar en el estado vacío.
  subtitle?: string; // Subtítulo opcional para mostrar en el estado vacío.
  showReset?: boolean; // Booleano opcional para mostrar o no el botón de reset.
}

// Define el componente funcional EmptyState que acepta EmptyStateProps.
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No hay coincidencias exactas", // Valor por defecto para el título.
  subtitle = "Intente cambiar o quitar algunos de sus filtros", // Valor por defecto para el subtítulo.
  showReset // Propiedad opcional para mostrar el botón de reset.
}) => {
  const router = useRouter(); // Obtiene la instancia del router para manejar la navegación.

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title} // Pasa el título al componente Heading.
        subtitle={subtitle} // Pasa el subtítulo al componente Heading.
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Eliminar todos los filtros" // Etiqueta del botón.
            onClick={() => router.push('/')} // Navega a la página de inicio al hacer clic.
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState; // Exporta el componente EmptyState como el valor predeterminado del módulo.
