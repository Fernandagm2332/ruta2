'use client'; // Indica que este archivo se ejecutará en el cliente (navegador)

// Importación del componente Image de Next.js para optimización de imágenes
import Image from "next/image";
// Importación del hook useRouter de Next.js para la navegación
import { useRouter } from "next/navigation";

// Definición del componente funcional Logo
const Logo = () => {
  // Inicializa el router para la navegación programática
  const router = useRouter();

  // Retorno del componente JSX
  return ( 
    <Image
      // Agrega un manejador de eventos para redirigir a la página principal al hacer clic en la imagen
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
    />
   );
}

// Exporta el componente Logo para que pueda ser utilizado en otras partes de la aplicación
export default Logo;
