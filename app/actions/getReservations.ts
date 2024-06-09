// modulo que define una funcion para obtener reservas basadas en varios parametros de busqueda 

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para conectaar con la base de datos

// Interfaz para los parametros de búsqueda de reservas
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params; // extrae los parametros de búsqueda

    const query: any = {}; // objeto para construir la consulta
        
    // agrega el listingId a la consulta si esta presente
    if (listingId) {
      query.listingId = listingId;
    }

    // agrega el userId a la consulta si esta presente
    if (userId) {
      query.userId = userId;
    }

    // Agrega el authorId a la consulta si esta presente
    if (authorId) {
      query.listing = { userId: authorId };
    }

    // Busca las reservas en la base de datos
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true, // Incluye los detalles del listado asociado a la reserva
      },
      orderBy: {
        createdAt: 'desc', // Ordena los resultados por fecha de creación descendente
      }
    });

    // Mapea las reservas para convertir las fechas a ISO string
    const safeReservations = reservations.map(
      (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(), // Convierte createdAt a ISO string
        startDate: reservation.startDate.toISOString(), // Convierte startDate a ISO string
        endDate: reservation.endDate.toISOString(), // Convierte endDate a ISO string
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(), // Convierte createdAt del listado a ISO string
        },
      })
    );

    return safeReservations; // Retorna las reservas seguras
  } catch (error: any) {
    throw new Error(error); // Lanza un error en caso de que ocurra alguno
  }
}

