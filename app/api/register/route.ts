// Este modulo es para definir una función para manejar solicitudes POST relacionadas con el registro de nuevos usuarios 

import { NextResponse } from "next/server"; 
import bcrypt from "bcrypt"; // Importa bcrypt para el hashing de contraseñas

import prisma from "@/app/libs/prismadb"; // Importa la instancia de Prisma para interactuar con la base de datos

// Función asincrónica para manejar solicitudes POST
export async function POST(
  request: Request,
) {
  const body = await request.json(); // Obtiene el cuerpo de la solicitud en formato JSON
  const { 
    email,
    name,
    password,
   } = body; // Extrae los datos del cuerpo de la solicitud

   const hashedPassword = await bcrypt.hash(password, 12); // Genera un hash para la contraseña proporcionada

   // Crea un nuevo usuario en la base de datos utilizando los datos proporcionados y la contraseña hasheada
   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user); // Retorna la respuesta en formato JSON con los datos del nuevo usuario
}

