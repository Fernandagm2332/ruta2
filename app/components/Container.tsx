'use client';

interface ContainerProps {
  children: React.ReactNode; // Define la propiedad children que representa los elementos secundarios que el componente envolverá.
}

// Define el componente funcional Container que acepta ContainerProps.
const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
      "
    >
      {children}
    </div>
  );
}
 
export default Container; // Exporta el componente Container como el valor predeterminado del módulo.
