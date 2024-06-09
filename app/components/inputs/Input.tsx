'use client';
// Este módulo define un componente de entrada de texto utilizado en formularios.

// Importa los tipos y el hook de react-hook-form para manejar formularios
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

// Importa el icono BiDollar de react-icons/bi
import { BiDollar } from "react-icons/bi";

// Interfaz para las propiedades del componente Input
interface InputProps {
  id: string; // Identificador del campo de entrada
  label: string; // Etiqueta del campo de entrada
  type?: string; // Tipo de entrada (por defecto es texto)
  disabled?: boolean; // Indicador opcional de si el campo está deshabilitado
  formatPrice?: boolean; // Indicador opcional de si el campo debe formatear el precio
  required?: boolean; // Indicador opcional de si el campo es obligatorio
  register: UseFormRegister<FieldValues>; // Función de registro del campo de entrada en react-hook-form
  errors: FieldErrors; // Errores del campo de entrada
}

// Componente funcional Input
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && ( // Muestra el icono BiDollar si se requiere formatear el precio
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })} // Registra el campo de entrada en react-hook-form
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} // Aplica estilos de error si hay errores
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'} // Aplica estilos de foco si hay errores
        `}
      />
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'} // Aplica estilos de error si hay errores
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default Input; // Exporta el componente Input
