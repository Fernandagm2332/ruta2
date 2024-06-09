// Este mdulo define una función para manejar solicitudes POST relacionadas con la creación de nuevas reservas para los listados 

import { NextResponse } from "next/server"; 

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para conectarnos con la base de datos
import getCurrentUser from "@/app/actions/getCurrentUser"; // Importa la función para obtener el usuario actual

// Función para manejar solicitudes POST
export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser(); // Obtiene el usuario actual

  if (!currentUser) {
    return NextResponse.error(); // Si no hay usuario actual, retorna un error
  }

  const body = await request.json(); // Obtiene el cuerpo de la solicitud en formato JSON
  const { 
    listingId,
    startDate,
    endDate,
    totalPrice
   } = body; // Extrae los datos del cuerpo de la solicitud

   // Verifica si alguno de los campos necesarios está vacío
   if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error(); // Si hay algún campo vacío, retorna un error
  }

  // Actualiza el listado en la base de datos para crear una nueva reserva asociada
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId, // Busca el listado por su ID
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id, // Asigna el ID del usuario actual como propietario de la reserva
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation); // Retorna la respuesta en formato JSON con los datos del listado y la reserva creada
}
