import { Graph, Node } from "ngraph.graph";
import { PathFinder } from "ngraph.path";
import { IExtMesh } from "src/interfaces";
import { AppFloor } from "src/interfaces/mapbox";
import { CanvasTexture, Mesh, Raycaster, Scene } from "three";
declare const useRouteHelper: () => {
    delete_route_path: (floors: AppFloor[]) => void;
    create_route: (allNodesFloor: Record<string, number>, from_mesh_object_id: string, to_mesh_object_id: string, scene: Scene, floors: AppFloor[], escalator_nodes: string[], pathFinderGraph: Graph, style: string) => {
        routePaths: Mesh[];
        fromFloor?: number | undefined;
    };
    create_route_paths: (from_mesh_object_id: string, to_mesh_object_id: string, scene: Scene, allNodesFloor: Record<string, number>, escalator_nodes: any[], floors: AppFloor[], pathFinderGraph: Graph, style: string, routeCallback?: null) => any[];
    create_route_path: (routeNodes: Node<any>[], floor_index: number, floors: AppFloor[], style?: string) => IExtMesh;
    get_route_nodes: (from_node_name: string, to_node_name: string, aStarPathFinder: PathFinder<any>) => false | Node<any>[];
    get_nodes_distance: (from_node_name: string, to_node_name: string, aStarPathFinder: PathFinder<any>, pathFinderGraph: Graph) => number | false;
    get_route_texture: (distance: number, floor_index: number, floors: AppFloor[]) => CanvasTexture | undefined;
    linkFloorEscalators: () => void;
    make_amenity_route: (kiosk_obj_name: string, amenity_type: string, scene: Scene, escalator_nodes: string[], style: string) => {
        routePaths: Mesh[];
        fromFloor?: number;
    };
    assign_route_nodes_to_stores: (floor_index: number, escalator_nodes: string[], find_store_node_raycaster: Raycaster) => Map<any, any>;
};
export default useRouteHelper;
