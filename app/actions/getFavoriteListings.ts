// modulo es para definir una función para obtener los listados favoritos del usuario 

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para interactuar con la base de datos
import getCurrentUser from "./getCurrentUser"; // Importa la función para obtener el usuario actual

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser(); // Obtiene el usuario actual

    // Si no hay un usuario actual retorna un arreglo vacio
    if (!currentUser) {
      return [];
    }

    // Busca los listados favoritos del usuario en la base de datos
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])], // Utiliza los ID de los favoritos del usuario
        },
      },
    });

    // Mapea los listados favoritos para convertir las fechas a strings
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(), // Convierte createdAt a string
    }));

    return safeFavorites; // Retorna los listados favoritos
  } catch (error: any) {
    throw new Error(error); // Lanza un error en caso de que ocurra alguno
  }
}

