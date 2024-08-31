import { Color, MeshLambertMaterial } from "three";
import { IMeshValues } from "../../interfaces";
export declare const renderOrders: {
    'route-path': number;
    escalator: number;
    underlay: number;
    overlay: number;
    'building-base': number;
    base: number;
    store: number;
    'big-store': number;
    kiosk: number;
    wall: number;
    'outer-wall': number;
    boundary: number;
    amenity: number;
    'layer-image': number;
    'layer-text': number;
    'route-tube': number;
    'special-shape': number;
};
export type MeshType = keyof typeof renderOrders | null;
declare const useMaterialAndGeometry: () => {
    getRenderOrder: (mesh_type: MeshType) => number;
    getMaterial: (mesh_type: MeshType, layer_name: string, layer_color: Color | string, mesh_transparent: boolean) => MeshLambertMaterial;
    getGeometry: (mesh_type: MeshType, layer_name: string, extrude: number, line_thickness: number, path: any) => any;
    getMaterialAndGeometry: (mesh_type: MeshType, layer_name: string, layer_color: Color | string, mesh_transparent: boolean, mesh_visible: boolean, z_index: number, extrude: number, line_thickness: number, floor_index: number, path: any) => IMeshValues;
};
export default useMaterialAndGeometry;
