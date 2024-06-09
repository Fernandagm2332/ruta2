// Este módulo define un componente de selector de fechas utilizando la librería React-Date-Range.
'use client';
// Importa los componentes necesarios de React-Date-Range
import { 
  DateRange, 
  Range, 
  RangeKeyDict
} from 'react-date-range';

// Importa los estilos predeterminados de React-Date-Range
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Interfaz para las propiedades del componente DatePicker
interface DatePickerProps {
  value: Range, // Valor del rango de fechas seleccionado
  onChange: (value: RangeKeyDict) => void; // Función de cambio de valor del rango de fechas
  disabledDates?: Date[]; // Fechas deshabilitadas
}

// Componente funcional DatePicker
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return ( 
    <DateRange
      rangeColors={['#262626']} // Color del rango de fechas seleccionado
      ranges={[value]} // Rangos de fechas seleccionados
      date={new Date()} // Fecha actual
      onChange={onChange} // Función de cambio de valor del rango de fechas
      direction="vertical" // Dirección del selector de fechas (vertical)
      showDateDisplay={false} // Oculta la visualización de la fecha seleccionada
      minDate={new Date()} // Fecha mínima seleccionable (actual)
      disabledDates={disabledDates} // Fechas deshabilitadas
    />
   );
}
 
export default DatePicker; // Exporta el componente DatePicker
