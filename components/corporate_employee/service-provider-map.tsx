"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const iconUrl = typeof markerIcon === "string" ? markerIcon : markerIcon.src
const iconRetinaUrl = typeof markerIcon2x === "string" ? markerIcon2x : markerIcon2x.src
const shadowUrl = typeof markerShadow === "string" ? markerShadow : markerShadow.src

const defaultIcon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
})

interface ServiceProviderMapProps {
  latitude: number
  longitude: number
  name: string
  address: string
}

export function ServiceProviderMap({ latitude, longitude, name, address }: ServiceProviderMapProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-80 w-full"
        style={{ minHeight: 320 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={defaultIcon}>
          <Popup>
            <div className="text-sm font-semibold text-slate-900">{name}</div>
            <div className="text-xs text-slate-600">{address}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
