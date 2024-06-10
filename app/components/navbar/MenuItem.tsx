'use client'; // Indica que este archivo se ejecutará en el cliente (navegador)

// Definición de la interfaz TypeScript para las props del componente MenuItem
interface MenuItemProps {
  onClick: () => void; // Función que se ejecuta al hacer clic en el elemento
  label: string; // Etiqueta de texto que se mostrará en el elemento
}

// Definición del componente funcional MenuItem con React y TypeScript
const MenuItem: React.FC<MenuItemProps> = ({
  onClick, // Desestructuración de la prop onClick
  label // Desestructuración de la prop label
}) => {
  // Retorno del componente JSX
  return ( 
    <div 
      // Añade un manejador de eventos onClick que ejecuta la función pasada como prop
      onClick={onClick}
      // Añade clases CSS para el estilo del elemento
      className="
        px-4 // Padding horizontal
        py-3 // Padding vertical
        hover:bg-neutral-100 // Cambia el fondo al pasar el ratón sobre el elemento
        transition // Añade una transición suave a los cambios de estilo
        font-semibold // Aplica una fuente seminegrita
      "
    >
      {label} {/* Muestra la etiqueta de texto pasada como prop */}
    </div>
   );
}

// Exporta el componente MenuItem para que pueda ser utilizado en otras partes de la aplicación
export default MenuItem;
