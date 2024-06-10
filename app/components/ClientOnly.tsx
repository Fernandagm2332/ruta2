'use client';

import React, { useState, useEffect } from 'react'; // Importa React y los hooks useState y useEffect.

interface ClientOnlyProps {
  children: React.ReactNode; // Define la propiedad children que representa los elementos secundarios que el componente envolverá.
}

// Define el componente funcional ClientOnly que acepta ClientOnlyProps.
const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false); // Estado para rastrear si el componente se ha montado en el cliente.

  // useEffect para establecer el estado hasMounted a true después de que el componente se haya montado.
  useEffect(() => {
      setHasMounted(true);
  }, []) // El array vacío asegura que el efecto solo se ejecute una vez, después del primer renderizado.

  // Si el componente aún no se ha montado, retorna null y no renderiza nada.
  if (!hasMounted) return null;

  // Una vez montado, renderiza los children.
  return (
    <>
      {children}
    </>
  );
};

export default ClientOnly; // Exporta el componente ClientOnly como el valor predeterminado del módulo.

