'use client';

import L from 'leaflet'; // Importa la biblioteca Leaflet para mapas interactivos.
import { MapContainer, Marker, TileLayer } from 'react-leaflet'; // Importa componentes específicos de react-leaflet para crear y gestionar mapas.
import 'leaflet/dist/leaflet.css'; // Importa los estilos CSS necesarios para Leaflet.
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'; // Importa el icono de marcador de alta resolución.
import markerIcon from 'leaflet/dist/images/marker-icon.png'; // Importa el icono de marcador estándar.
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; // Importa la sombra del icono del marcador.

// Configura los iconos de Leaflet para que utilicen los archivos importados.
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

// Interfaz para las propiedades del componente Map
interface MapProps {
  center?: number[]; // Coordenadas opcionales para centrar el mapa
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // URL de los tiles de OpenStreetMap
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; // Atribución requerida por OpenStreetMap

// Definición del componente Map
const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer 
      center={center as L.LatLngExpression || [51, -0.09]} // Centra el mapa en las coordenadas proporcionadas o en [51, -0.09] por defecto
      zoom={center ? 4 : 2} // Define el nivel de zoom dependiendo de si se proporcionaron coordenadas
      scrollWheelZoom={false} // Desactiva el zoom con la rueda del ratón
      className="h-[35vh] rounded-lg" // Aplica clases de Tailwind CSS para la altura y el borde del mapa
    >
      <TileLayer
        url={url} // URL de los tiles de OpenStreetMap
        attribution={attribution} // Atribución de OpenStreetMap
      />
      {center && (
        <Marker position={center as L.LatLngExpression} /> // Si se proporcionan coordenadas, añade un marcador en esa posición
      )}
    </MapContainer>
  );
}

export default Map;
