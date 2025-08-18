import { MapFloor } from "./mapApiTypes";
import { Group, Texture, Vector3 } from "three";
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
