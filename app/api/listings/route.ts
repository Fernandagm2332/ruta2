// modulo que define una funcion para manejar solicitudes POST relacionadas con la creación de nuevos listados utilizando 

import { NextResponse } from "next/server"; 

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para conectarnos con la base de datos
import getCurrentUser from "@/app/actions/getCurrentUser"; // Importa la función para obtener el usuario actual

// Funcion para manejar solicitudes POST
export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser(); // Obtiene el usuario actual

  if (!currentUser) {
    return NextResponse.error(); // Si no hay usuario actual, retorna un error
  }

  const body = await request.json(); // Obtiene el cuerpo de la solicitud en formato JSON
  const { 
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
   } = body; // Extrae los datos del cuerpo de la solicitud

  // Verifica si hay campos vacíos en el cuerpo de la solicitud
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error(); // Si encuentra un campo vacío, retorna un error
    }
  });

  // Crea un nuevo listado en la base de datos utilizando los datos proporcionados
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10), // Convierte el precio a un entero
      userId: currentUser.id, // Asigna el ID del usuario actual como propietario del listado
    },
  });

  return NextResponse.json(listing); // Retorna la respuesta en formato JSON con los datos del nuevo listado
}

