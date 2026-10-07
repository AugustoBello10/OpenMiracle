import React from 'react';
import { Polyline, CircleMarker, Rectangle } from 'react-leaflet';
import { MapRoute } from '../types/mapRoute';

export default function MapRoutesLayer({ routes, currentFloor }: { routes: MapRoute[], currentFloor: number }) {
  return (
    <>
      {routes.filter(r => r.visible).map(route => {
        // Draw the stored orthogonal paths directly!
        return (
          <React.Fragment key={route.id}>
            {route.waypoints.filter(wp => wp.z === currentFloor).map((wp, idx) => {
               if (wp.path && wp.path.length > 0) {
                   // Leaflet expects [lat, lng], our coords are [ -y, x ]
                   const positions = wp.path.map(p => [-p.y, p.x] as [number, number]);
                   return (
                       <Polyline 
                         key={`${wp.id}-path`}
                         positions={positions}
                         color={route.color}
                         weight={4}
                         opacity={0.8}
                         // No dashArray so it fills the line continuously
                       />
                   );
               }
               return null;
            })}
            
            {/* Draw nodes */}
            {route.waypoints.filter(wp => wp.z === currentFloor).map((wp, idx) => (
              <CircleMarker
                key={wp.id}
                center={[-wp.y, wp.x]}
                radius={3}
                pathOptions={{
                  color: route.color,
                  fillColor: '#fff',
                  fillOpacity: 1,
                  weight: 2
                }}
              />
            ))}
          </React.Fragment>
        );
      })}
    </>
  );
}
