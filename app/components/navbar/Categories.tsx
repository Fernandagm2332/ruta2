'use client';

// Importación de hooks de navegación de Next.js
import { usePathname, useSearchParams } from 'next/navigation';

// Importación de íconos de react-icons
import { TbBike, TbMountain, TbRoad } from 'react-icons/tb';
import { GiCheckeredFlag, GiEscalator } from 'react-icons/gi';
import { FaMountainCity, FaRoad } from 'react-icons/fa6';
import { RxLetterCaseCapitalize } from 'react-icons/rx';

// Importación de componentes personalizados
import CategoryBox from "../CategoryBox";
import Container from '../Container';

// Definición del array de categorías con su etiqueta, ícono y descripción
export const categories = [
  {
    label: 'Carretera',
    icon: TbRoad,
    description: 'Esta ruta es diseñada especificamente para carreras de ruta, ideal para ciclistas que buscan velocidad y resistencia.!',
  },
  {
    label: 'Montaña',
    icon: TbMountain,
    description: 'Senderos y caminos sin pavimetar, atravesando bosques, colinas y montañas.!',
  },
  {
    label: 'Pista o Velódromo',
    icon: GiCheckeredFlag,
    description: 'Circuito cerrado especialmemte diseñado para carrera de velocidad en bicicletas de pista!',
  },
  {
    label: 'BMX',
    icon: RxLetterCaseCapitalize,
    description: 'Diseñado para pistas cortas con obstaculos, saltos y cuervas cerradas.!',
  },
  {
    label: 'Ciclismo Urbano',
    icon: TbBike,
    description: 'Recorridos en entornos urbanos, ya sea para desplazamientos diarios, paseos o turismo.',
  },
  {
    label: 'Ciclismo híbrido',
    icon: FaMountainCity,
    description: 'Combina elementos de carretera y montaña',
  },
  {
    label: 'Ciclismo de trial',
    icon: GiEscalator,
    description: 'Se realiza en obstaculos y terrenos dificiles!',
  },
];

// Definición del componente Categories
const Categories = () => {
  // Obtención de parámetros de búsqueda y ruta actual
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/'; // Verificación si es la página principal

  // Si no es la página principal, no se renderiza nada
  if (!isMainPage) {
    return null;
  }

  // Renderización del contenedor y las categorías
  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label} // Marca la categoría seleccionada
          />
        ))}
      </div>
    </Container>
  );
}

// Exportación del componente Categories
export default Categories;
