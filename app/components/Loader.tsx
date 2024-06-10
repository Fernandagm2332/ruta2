'use client';

import { PuffLoader } from "react-spinners"; // Importa el componente PuffLoader de la biblioteca react-spinners para mostrar una animación de carga.

const Loader = () => {
  return ( 
    <div
      className="
        h-[70vh]
        flex 
        flex-col 
        justify-center 
        items-center 
      "
    >
      <PuffLoader
        size={100} // Tamaño del loader en píxeles.
        color="red" // Color del loader.
      />
    </div>
  );
}
 
export default Loader;
