"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.polyline(positions).getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
}

export default function RoutingMap({ start, end, label }) {
  const [routePoints, setRoutePoints] = useState([]);

  useEffect(() => {
    async function getRoute() {
      if (!start || !end || (start[0] === 0 && end[0] === 0)) return;
      
      try {
        const startParam = `${start[1]},${start[0]}`;
        const endParam = `${end[1]},${end[0]}`;
        
        const res = await fetch(`/api/route-map?start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`);        const data = await res.json();
        
        if (data.features && data.features.length > 0) {
          const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
          setRoutePoints(coords);
          console.log(`Rute ke ${label} berhasil dimuat.`);
        } else {
          console.warn(`Rute tidak ditemukan untuk ${label}. Periksa apakah koordinat di jalan raya.`);
          setRoutePoints([]);
        }
      } catch (err) {
        console.error("Gagal fetch rute:", err);
      }
    }
    getRoute();
  }, [start, end, label]);

  return (
    <MapContainer center={start} zoom={14} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <Marker position={start}><Popup>Ayasa House (Main)</Popup></Marker>
      <Marker position={end}><Popup>{label}</Popup></Marker>
      
      {routePoints.length > 0 && (
        <>
          <Polyline 
            positions={routePoints} 
            pathOptions={{ color: 'red', weight: 6, opacity: 0.8 }} 
          />
          <FitBounds positions={routePoints} />
        </>
      )}
    </MapContainer>
  );
}