// Modulo en el que definimos funciones para manejar solicitudes POST y DELETE relacionadas con los listados favoritos del usuario

import { NextResponse } from "next/server"; 

import getCurrentUser from "@/app/actions/getCurrentUser"; // Importa la función para obtener el usuario actual
import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para interactuar con la base de datos

// Interfaz para los parámetros de la solicitud
interface IParams {
  listingId?: string;
}


export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser(); // Obtiene el usuario actual

  if (!currentUser) {
    return NextResponse.error(); // Si no hay usuario actual, retorna un error
  }

  const { listingId } = params; // Extrae el ID del listado de los parámetros

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID'); // Lanza un error si el ID del listado no es válido
  }

  // Copia los IDs de los favoritos actuales del usuario y agrega el nuevo listado
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  // Actualiza el usuario en la base de datos con los nuevos favoritos
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user); // Retorna la respuesta en formato JSON con los datos del usuario actualizado
}


export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser(); // Obtiene el usuario actual

  if (!currentUser) {
    return NextResponse.error(); // Si no hay usuario actual, retorna un error
  }

  const { listingId } = params; // Extrae el ID del listado de los parámetros

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID'); // Lanza un error si el ID del listado no es válido
  }

  // Copia los IDs de los favoritos actuales del usuario y elimina el listado especificado
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Actualiza el usuario en la base de datos con los favoritos actualizados
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user); // Retorna la respuesta en formato JSON con los datos del usuario actualizado
}
