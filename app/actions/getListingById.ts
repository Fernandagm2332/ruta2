//modulo en el que definimos una función para obtener un listado específico por su ID, incluyendo detalles del usuario asociad

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para interactuar con la base de datos

// Interfaz para los parámetros de la función
interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    const { listingId } = params; // Extrae el ID del listado de los parametros

    // Busca el listado en la base de datos
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId, // Utiliza el ID del listado para buscarlo
      },
      include: {
        user: true, 
      },
    });

    // Si no se encuentra el listado retorna null
    if (!listing) {
      return null;
    }

    // Retorna el listado con las fechas convertidas a strings y detalles del usuario
    return {
      ...listing,
      createdAt: listing.createdAt.toString(), // Convierte createdAt a string
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(), // Convierte createdAt del usuario a string
        updatedAt: listing.user.updatedAt.toString(), // Convierte updatedAt del usuario a string
        emailVerified: 
          listing.user.emailVerified?.toString() || null, // Convierte emailVerified del usuario a string si existe, sino null
      }
    };
  } catch (error: any) {
    throw new Error(error); // Lanza un error en caso de que ocurra alguno
  }
}

