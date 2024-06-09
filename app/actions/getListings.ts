// modulo para definir una función para obtener listados basados en varios parametros de busqueda 

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para conectar con la base de datos

// Interfaz para los parametros de busqueda de listados
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params; // Extrae los parámetros de la busqueda

    let query: any = {}; // Objeto para construir la consulta

    // Agrega el userId a la consulta si esta presente
    if (userId) {
      query.userId = userId;
    }

    // Agrega la categoría a la consulta si está presente
    if (category) {
      query.category = category;
    }

    // Agrega el número de habitaciones mínimo a la consulta si está presente
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount 
      };
    }

    // Agrega el número de huéspedes mínimo a la consulta si está presente
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount // gte: mayor o igual que
      };
    }

    // Agrega el número de baños mínimo a la consulta si está presente
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount // gte: mayor o igual que
      };
    }

    // Agrega la ubicación a la consulta si está presente
    if (locationValue) {
      query.locationValue = locationValue;
    }

    // Agrega las fechas de inicio y fin a la consulta para evitar reservas que coincidan
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate }, // La reserva termina después de la fecha de inicio
                startDate: { lte: startDate } // La reserva comienza antes de la fecha de inicio
              },
              {
                startDate: { lte: endDate }, // La reserva comienza antes de la fecha de fin
                endDate: { gte: endDate } // La reserva termina después de la fecha de fin
              }
            ]
          }
        }
      };
    }

    // Busca los listados en la base de datos utilizando la consulta construida
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc' // Ordena los resultados por fecha de creación descendente
      }
    });

    // Mapea los listados para convertir las fechas a ISO string
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(), // Convierte createdAt a ISO string
    }));

    return safeListings; // Retorna los listados seguros
  } catch (error: any) {
    throw new Error(error); // Lanza un error en caso de que ocurra alguno
  }
}
