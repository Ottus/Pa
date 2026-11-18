import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

/**
 * @notice Parcelo Interactive Leaflet Map Component
 * @dev Leaflet + OpenStreetMap dark-themed tiles with attribution.
 * Handles pickup/dropoff markers, route polyline, and coordinate picking.
 */
export function MapView({
  center = [6.5244, 3.3792], // Default Lagos, Nigeria
  zoom = 12,
  pickupCoords = null, // [lat, lng]
  dropoffCoords = null, // [lat, lng]
  onLocationSelect = null,
  height = '320px',
  className = '',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default Leaflet icon paths in Vite/Webpack
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Initialize Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
        attributionControl: true,
      });

      // CartoDB Dark Matter Tiles (matches Parcelo dark theme) with OpenStreetMap attribution
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
          subdomains: 'abcd',
        }
      ).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Handle map clicks for location selection
      if (onLocationSelect) {
        map.on('click', (e) => {
          onLocationSelect([e.latlng.lat, e.latlng.lng]);
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers and bounds when coordinates change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const bounds = [];

    // Pickup Marker (Teal Pin)
    if (pickupCoords && pickupCoords[0] && pickupCoords[1]) {
      const pickupIcon = L.divIcon({
        className: 'custom-pin-pickup',
        html: `
          <div style="background-color: #14B8A6; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #0F172A; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
            <div style="width: 8px; height: 8px; background-color: #0F172A; border-radius: 50%;"></div>
          </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      const m = L.marker(pickupCoords, { icon: pickupIcon })
        .addTo(layer)
        .bindPopup('<b>Pickup Location</b>');
      bounds.push(pickupCoords);
    }

    // Dropoff Marker (Purple Pin)
    if (dropoffCoords && dropoffCoords[0] && dropoffCoords[1]) {
      const dropoffIcon = L.divIcon({
        className: 'custom-pin-dropoff',
        html: `
          <div style="background-color: #8B5CF6; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #0F172A; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
            <div style="width: 8px; height: 8px; background-color: #0F172A; border-radius: 50%;"></div>
          </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      const m = L.marker(dropoffCoords, { icon: dropoffIcon })
        .addTo(layer)
        .bindPopup('<b>Drop-off Location</b>');
      bounds.push(dropoffCoords);
    }

    // Connect with straight line if both exist
    if (bounds.length === 2) {
      L.polyline(bounds, {
        color: '#14B8A6',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.8,
      }).addTo(layer);

      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    }
  }, [pickupCoords, dropoffCoords]);

  return (
    <div
      className={`relative w-full rounded-card overflow-hidden border border-[#334155] z-0 ${className}`}
      style={{ height }}
    >
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
