'use client';
// Este módulo define un componente de contador que permite aumentar y reducir un valor numérico.

// Importa el hook useCallback de React para optimizar el rendimiento
import { useCallback } from "react";

// Importa los iconos de React Icons
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// Interfaz para las propiedades del componente Counter
interface CounterProps {
  title: string; // Título del contador
  subtitle: string; // Subtítulo del contador
  value: number; // Valor actual del contador
  onChange: (value: number) => void; // Función de cambio de valor del contador
}

// Componente funcional Counter
const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  // Función para aumentar el valor del contador
  const onAdd = useCallback(() => {
    onChange(value + 1); // Incrementa el valor y llama a la función de cambio de valor
  }, [onChange, value]);

  // Función para reducir el valor del contador
  const onReduce = useCallback(() => {
    if (value === 1) {
      return; // Si el valor es 1, no se puede reducir más
    }

    onChange(value - 1); // Reduce el valor y llama a la función de cambio de valor
  }, [onChange, value]);

  return ( 
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div> {/* Muestra el título del contador */}
        <div className="font-light text-gray-600">
          {subtitle} {/* Muestra el subtítulo del contador */}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce} // Maneja el clic en el botón de reducir
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus /> {/* Icono para reducir */}
        </div>
        <div 
          className="
            font-light 
            text-xl 
            text-neutral-600
          "
        >
            {value} {/* Muestra el valor actual del contador */}
          </div>
        <div
          onClick={onAdd} // Maneja el clic en el botón de aumentar
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus /> {/* Icono para aumentar */}
        </div>
      </div>
    </div>
   );
}
 
export default Counter; // Exporta el componente Counter
