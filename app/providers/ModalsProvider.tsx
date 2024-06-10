'use client';

import LoginModal from "../components/modals/LoginModal"; // Importa el componente LoginModal desde la carpeta de componentes.
import RegisterModal from "../components/modals/RegisterModal"; // Importa el componente RegisterModal desde la carpeta de componentes.
import RentModal from "../components/modals/RentModal"; // Importa el componente RentModal desde la carpeta de componentes.
import SearchModal from "../components/modals/SearchModal"; // Importa el componente SearchModal desde la carpeta de componentes.

// Define el componente funcional ModalsProvider
const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />     {/* Renderiza el modal de inicio de sesión */}
      <RegisterModal />  {/* Renderiza el modal de registro */}
      <SearchModal />    {/* Renderiza el modal de búsqueda */}
      <RentModal />      {/* Renderiza el modal de alquiler */}
    </>
  );
}

export default ModalsProvider; // Exporta el componente ModalsProvider como el valor predeterminado del módulo.
