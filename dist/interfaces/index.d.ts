import type { Color, Material, Mesh, MeshLambertMaterial, ShapeGeometry } from "three";
import { Graph } from "ngraph.graph";
import type { Vector3 } from "three";
import { MapResponsiveSettings } from "./mapApiTypes";
export type MapMode = 'view' | 'edit';
export type MapRole = 'PORTAL' | 'DISPLAY_APP' | 'WP_SITE' | 'PORTAL_KIOSK' | 'PORTAL_RESPONSIVE' | 'DEMO';
export type MapRenderMode = '2D' | '3D';
export type MapDeviceType = 'display_app' | 'desktop' | 'tablet' | 'mobile';
export interface MapConfigProps {
    CENTER_ID: number;
    KIOSK_ID: number;
    ROLE: MapRole;
    DEVICE: MapDeviceType;
    STYLE: MapRenderMode;
    STATS: boolean;
    DEBUG: boolean;
    CAMERA_CONTROLS_STATES: MapResponsiveSettings;
    DEFAULT_CONTROLS_TARGET: null;
    ORIGINAL_CAMERA_POSITION: null;
    BASE_COLOR: Color;
    OVERLAY_OPACITY: number;
    DEFAULT_CAMERA_POSITION: null;
    BOUNDARY_THICKNESS: number;
    SELECTED_RETAILER_SLUG?: string;
    STORE_TEXT_COLOR: Color;
    STORE_HEIGHT: number;
    WALL_THICKNESS: number;
    DEFAULT_SELECTED_STORE: string | null;
    BOUNDARY_COLOR: Color;
    CAMERA: {
        minDistance: number;
        maxDistance: number;
        animSpeed: number;
        far?: number;
        fov?: number;
    };
    WALL_COLOR: Color;
    OVERLAY_COLOR: Color;
    ACCENT_COLOR: Color;
    STORE_DEFAULT_COLOR: Color;
    MAP_BACKGROUND_COLOR: Color;
    KIOSK_SIZE: number;
    ZOOM_STEP: number;
    SELECTED_ZOOM_LIMIT: number;
}
export interface IMeshValues {
    mesh: IExtMesh;
    geometry: ShapeGeometry;
    material: Material;
    object_id: string;
    mesh_type: string | null;
    floor_index: number;
    visible: boolean;
    renderOrder: number;
    route_node_id?: string | null;
}
export interface MeshFloorsProps {
    meshParams: IMeshValues[][];
    textParams: {
        textMesh: IExtMesh;
    }[][];
    storeLogos: {
        storeLogo: IExtMesh;
    }[][];
    drawText?: Function;
    pathFinderGraph: Graph<any, any>;
    escalator_nodes: string[];
    allSvgObjectIds: Set<string>;
}
export interface IExtMeshLambertMaterial extends MeshLambertMaterial {
    colorDefault?: Color;
    active?: boolean;
}
export interface IExtMesh extends Mesh {
    object_id?: string | null;
    mesh_type?: string | null;
    floor_index?: number;
    route_node_id?: string | null;
    escalator_id?: string | null;
    goToFloor?: {
        index: number;
        direction: string;
    };
}
export interface IExtShapeGeometry extends ShapeGeometry {
    faces: Vector3[];
}
export interface ExIntersection extends THREE.Intersection {
    eventObject: THREE.Object3D | IExtMesh;
}
export interface ZoomData {
    direction: 'in' | 'out';
}
