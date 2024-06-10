
//Este archivo configura el diseño raíz de la aplicación, incluyendo la importación de estilos globales, 
//componentes modales para registro, inicio de sesión, alquiler y búsqueda, así como el proveedor de tostadas para notificaciones
//También establece la fuente global y obtiene el usuario actual para pasarlo a la barra de navegación
import {Nunito} from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";



export const metadata= {
  title: "Vuelta Veloz",
  description: "Vuelta  veloz!",
}

const font = Nunito({
  subsets : ["latin"]
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className= {font.className}>
        <ClientOnly> 
          <ToasterProvider />
          <SearchModal/>
          <RentModal/> 
          <LoginModal/> 
          <RegisterModal/>
          <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
        </body>
    </html>
  )
}
