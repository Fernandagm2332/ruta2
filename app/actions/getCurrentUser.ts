import { getServerSession } from "next-auth/next"; // Importa la función getServerSession de next-auth

import { authOptions } from "@/pages/api/auth/[...nextauth]"; // Importa las opciones de autenticación de next-auth
import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para interactuar con la base de datos

// Función asincrónica para obtener la sesión del servidor
export async function getSession() {
  return await getServerSession(authOptions);
}

// Función asincrónica por defecto para obtener el usuario actual
export default async function getCurrentUser() {
  try {
    const session = await getSession(); // Obtiene la sesión actual

    // Verifica si la sesión contiene un usuario con email
    if (!session?.user?.email) {
      return null; // Si no hay email, retorna null
    }

    // Busca al usuario en la base de datos utilizando Prisma
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string, // Usa el email de la sesión para buscar al usuario
      }
    });

    // Si no se encuentra el usuario retorna null
    if (!currentUser) {
      return null;
    }

    // Retorna el usuario con las fechas convertidas a ISO string
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(), // Convierte createdAt a ISO string
      updatedAt: currentUser.updatedAt.toISOString(), // Convierte updatedAt a ISO string
      emailVerified: 
        currentUser.emailVerified?.toISOString() || null, // Convierte emailVerified a ISO string si existe, sino null
    };
  } catch (error: any) {
    return null; // En caso de error retorna null
  }
}


