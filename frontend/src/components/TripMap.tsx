import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import type { TripRoutePoint } from "../types/trip";
import L from "leaflet";

type Props = {
  points: TripRoutePoint[];
};

const stopIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [25, 25],
});

const idleIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  iconSize: [25, 25],
});

export const TripMap = ({ points }: Props) => {
  if (!points.length) return null;

  const positions: [number, number][] = points.map((p) => [
    p.latitude,
    p.longitude,
  ]);

  // Detect stoppage (speed = 0)
  const stoppages = points.filter((p) => p.speed === 0);

  // Detect idling (ignition ON but speed 0)
  const idling = points.filter(
    (p) => p.speed === 0 && p.ignition === "on"
  );

  return (
    <MapContainer
      center={positions[0]}
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Route */}
      <Polyline positions={positions} />

      {/* Stoppage markers */}
      {stoppages.map((p, i) => (
        <Marker
          key={`stop-${i}`}
          position={[p.latitude, p.longitude]}
          icon={stopIcon}
        >
          <Popup>Stopped</Popup>
        </Marker>
      ))}

      {/* Idling markers */}
      {idling.map((p, i) => (
        <Marker
          key={`idle-${i}`}
          position={[p.latitude, p.longitude]}
          icon={idleIcon}
        >
          <Popup>Idling</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};