'use client';


import {User} from "@prisma/client";
import  Container  from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC <NavbarProps> =({
  currentUser
}) => {
  console.log({currentUser});
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py=4
          border-b-[1px]
        "
      >
        <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div> 
      <Categories/> 
    </div>
  );
}

export default Navbar;'use client'; // Indica que este archivo se ejecutará en el cliente (navegador)

// Importaciones
import { User } from "@prisma/client"; // Importa la interfaz User del cliente Prisma
import Container from "../Container"; // Importa el componente Container
import Logo from "./Logo"; // Importa el componente Logo
import Search from "./Search"; // Importa el componente Search
import UserMenu from "./UserMenu"; // Importa el componente UserMenu
import { SafeUser } from "@/app/types"; // Importa la interfaz SafeUser de los tipos de la aplicación
import Categories from "./Categories"; // Importa el componente Categories

// Definición de la interfaz TypeScript para las props del componente Navbar
interface NavbarProps {
  currentUser?: SafeUser | null; // Propiedad opcional currentUser de tipo SafeUser o null
}

// Definición del componente funcional Navbar con React y TypeScript
const Navbar: React.FC<NavbarProps> = ({
  currentUser // Desestructuración de la prop currentUser
}) => {
  console.log({currentUser}); // Registro en consola del usuario actual

  // Retorno del componente JSX
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py=4
          border-b-[1px]
        "
      >
        <Container>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo /> {/* Componente del logo */}
            <Search /> {/* Componente de búsqueda */}
            <UserMenu currentUser={currentUser} /> {/* Componente del menú de usuario con el usuario actual como prop */}
          </div>
        </Container>
      </div> 
      <Categories /> {/* Componente de categorías */}
    </div>
  );
}

// Exporta el componente Navbar para que pueda ser utilizado en otras partes de la aplicación
export default Navbar;

