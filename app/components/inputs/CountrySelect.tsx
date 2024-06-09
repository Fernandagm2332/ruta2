'use client';
// Este módulo define un componente de selector de países utilizando React-Select.

// Importamos el componente Select de React-Select
import Select from 'react-select';

// Importamos el hook useCountries para obtener la lista de países
import useCountries from '@/app/hooks/useCountries';

// Tipo de valor para el selector de países
export type CountrySelectValue = {
  flag: string; // Bandera del país
  label: string; // Nombre del país
  latlng: number[]; // Coordenadas geográficas del país
  region: string; // Región del país
  value: string; // Valor del país
}

// Interfaz para las propiedades del componente CountrySelect
interface CountrySelectProps {
  value?: CountrySelectValue; // Valor seleccionado del país
  onChange: (value: CountrySelectValue) => void; // Función de cambio de valor del país
}

// Componente funcional CountrySelect
const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCountries(); // Obtiene la lista de países utilizando el hook useCountries

  return ( 
    <div>
      <Select
        placeholder="Anywhere" // Mensaje de marcador de posición
        isClearable // Permite borrar la selección
        options={getAll()} // Opciones disponibles (lista de países)
        value={value} // Valor seleccionado
        onChange={(value) => onChange(value as CountrySelectValue)} // Maneja el cambio de valor
        formatOptionLabel={(option: any) => ( // Formatea la etiqueta de cada opción
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div> {/* Muestra la bandera del país */}
            <div>
              {option.label}, {/* Muestra el nombre del país */}
              <span className="text-neutral-500 ml-1">
                {option.region} {/* Muestra la región del país */}
              </span>
            </div>
          </div>
        )}
        classNames={{ // Clases CSS personalizadas para el componente Select
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({ // Tema personalizado para el componente Select
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}
 
export default CountrySelect; // Exporta el componente CountrySelect
