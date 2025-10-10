import { SVGResultPaths } from 'three-stdlib';
import { Color } from 'three';
export declare const useMeshParams: () => {
    getMeshParams: (path: SVGResultPaths, paths: SVGResultPaths[], floor_index: number, nodeCount: number) => {
        mesh_type: "escalator" | "kiosk" | "amenity" | "base" | "route-path" | "overlay" | "store" | "wall" | "outer-wall" | "boundary" | "special-shape" | null;
        layer_color: Color;
        extrude: number;
        z_index: number;
        mesh_visible: boolean;
        mesh_draw: boolean;
        mesh_transparent: boolean;
        line_thickness: number;
        interactiveMesh: boolean;
        path: SVGResultPaths;
        layer_name: any;
    };
};
