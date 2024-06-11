'use client'
//Aqui creamos un formulario para que los usuarios puedan hacer una reserva
// Importa React y useState
import React, { useState } from 'react';
// Importa el componente Button y el componente Calendar
import Button from "../Button";
import Calendar from "../inputs/Calendar";

// Define las propiedades del componente ListingReservation
interface ListingReservationProps {
  price: number; // Precio del listado
  dateRange: Range; // Rango de fechas seleccionadas
  totalPrice: number; // Precio total de la reserva
  onChangeDate: (value: Range) => void; // Función de cambio de fecha
  onSubmit: (formData: FormData) => void; // Función de envío de formulario
  disabled: boolean; // Estado de deshabilitación del formulario
  disabledDates: Date[]; // Fechas deshabilitadas
  bloodType?: string; // Tipo de sangre (opcional)
  socialSecurityNumber?: string; // Número de seguro social (opcional)
  emergencyPhoneNumber?: string; // Número de teléfono de emergencia (opcional)
  category?: string; // Categoría del listado (opcional)
}

// Define el tipo de datos FormData
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  bloodType: string;
  socialSecurityNumber: string;
  emergencyPhoneNumber: string;
}

// Componente funcional ListingReservation
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  bloodType,
  socialSecurityNumber,
  emergencyPhoneNumber,
  category
}) => {
  // Define estados locales para los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodTypeValue, setBloodType] = useState(bloodType ?? '');
  const [ssn, setSocialSecurityNumber] = useState(socialSecurityNumber ?? '');
  const [emergencyPhone, setEmergencyPhoneNumber] = useState(emergencyPhoneNumber ?? '');

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Crea un objeto FormData con los datos del formulario
    const formData: FormData = {
      name,
      email,
      phoneNumber,
      bloodType: bloodTypeValue,
      socialSecurityNumber: ssn,
      emergencyPhoneNumber: emergencyPhone
    };
    // Llama a la función onSubmit pasando los datos del formulario
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
          {category}
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4">
          <label htmlFor="name" className="inline-block w-28">Nombre:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="border border-black rounded-md p-1" />
        </div>
        <div className="p-4">
          <label htmlFor="email" className="inline-block w-28">Correo electrónico:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border border-black rounded-md p-1" />
        </div>
        <div className="p-4">
          <label htmlFor="phoneNumber" className="inline-block w-28">Teléfono:</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="border border-black rounded-md p-1" />
        </div>
        <div className="p-4">
          <label htmlFor="bloodType" className="inline-block w-28">Tipo de sangre:</label>
          <input type="text" id="bloodType" value={bloodTypeValue} onChange={(e) => setBloodType(e.target.value)} required className="border border-black rounded-md p-1" />
        </div>
        <div className="p-4">
          <label htmlFor="ssn" className="inline-block w-28">Número de seguro médico:</label>
          <input type="text" id="ssn" value={ssn} onChange={(e) => setSocialSecurityNumber(e.target.value)} required className="border border-black rounded-md p-1" />
        </div>
        <div className="p-4">
          <label htmlFor="emergencyPhone" className="inline-block w-28">Teléfono de emergencia:</label>
          <input type="tel" id="emergencyPhone" value={emergencyPhone} onChange={(e) => setEmergencyPhoneNumber(e.target.value)} required className="border border-black rounded-md p-1" />
        </div>
        <hr />
        <div className="p-4">
          <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => 
              onChangeDate(value.selection)}
          />
        </div>
        <hr />
        <div className="p-4">
          <Button
            type="submit"
            disabled={disabled}
            label="Reservar"
          />
        </div>
      </form>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
