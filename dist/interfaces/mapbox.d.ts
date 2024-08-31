import { MapAmenity } from "src/helpers/amenities.helper";
import { MapFloor, MapKiosk, MapRetailer } from "./mapApiTypes";
import { Group, Texture, Vector3 } from "three";
export interface AppDataProps {
    RETAILERS: Record<number, MapRetailer>;
    KIOSKS: Record<number, MapKiosk>;
    FLOORS: AppFloor[];
    AMENITIES: MapAmenity[];
}
export type AppRoutePoint = {
    name: string;
    node: Vector3;
};
export interface AppFloor extends MapFloor {
    objsGroup: Group;
    interactiveObjs: any[];
    escalatorsObjs: any[];
    escalatorsNodes: Record<any, any>;
    escalatorMeshes?: any[];
    route_points?: AppRoutePoint[];
    route_tube?: any;
    route_texture?: Texture | null | undefined;
    routeMeshes?: any[];
    route_active?: boolean;
}
