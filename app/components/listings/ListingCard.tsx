'use client';
// Este módulo define un componente de tarjeta de listado utilizado para mostrar detalles de listados.

// Importa los módulos necesarios de Next.js y React
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

// Importa el hook useCountries y los tipos de datos SafeListing, SafeReservation y SafeUser
import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

// Importa los componentes HeartButton y Button
import HeartButton from "../HeartButton";
import Button from "../Button";

// Interfaz para las propiedades del componente ListingCard
interface ListingCardProps {
  data: SafeListing; // Datos del listado seguro
  reservation?: SafeReservation; // Reserva segura (opcional)
  onAction?: (id: string) => void; // Función de acción (opcional)
  disabled?: boolean; // Indicador opcional de si el componente está deshabilitado
  actionLabel?: string; // Etiqueta de acción (opcional)
  actionId?: string; // Identificador de acción (opcional)
  currentUser?: SafeUser | null; // Usuario actual (opcional)
};

// Componente funcional ListingCard
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter(); // Router de Next.js
  const { getByValue } = useCountries(); // Función para obtener país por valor

  const location = getByValue(data.locationValue); // Ubicación del listado

  // Manejador de cancelación de acción
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  // Precio del listado (considera si hay una reserva)
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  // Fecha de reserva (si está disponible)
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">Carrera</div>
          )}
        </div>
        {onAction && actionLabel && ( // Muestra el botón de acción si están definidos
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard; // Exporta el componente ListingCard

