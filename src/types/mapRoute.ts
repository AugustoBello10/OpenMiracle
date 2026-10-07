export interface MapRouteWaypoint {
  x: number;
  y: number;
  z: number; // floor
  id: string;
  path?: {x: number, y: number}[]; // Orthogonal path from previous waypoint
}

export interface MapRoute {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  waypoints: MapRouteWaypoint[];
}
