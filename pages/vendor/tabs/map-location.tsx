import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: "/assets/imgs/theme/icons/location-red-pin-marker.png",
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapLocation = ({
  position = { lat: 34.6416, lng: 50.8746 },
  address,
  zoom = 13,
}: MapLocationProps) => {
  return (
    <MapContainer
      style={{
        height: "300px",
        borderRadius: "15px",
        boxShadow: "12px 14px 11px -8px rgba(0,0,0,0.4)",
        zIndex: 0,
      }}
      // @ts-ignore
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        // @ts-ignore
        position={position}
      >
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

interface MapLocationProps {
  position: MapLocation;
  address?: string;
  zoom?: number | undefined;
}
export default MapLocation;
