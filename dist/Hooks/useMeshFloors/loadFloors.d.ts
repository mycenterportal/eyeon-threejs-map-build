import { SVGResult } from "three-stdlib";
import { IConfig, IFloorData, IMeshValues, TRoles } from "src/types";
import { IRetailer, MapObj } from "src/mapitApiTypes";
import { Graph } from "ngraph.graph";
import { EventedType } from "ngraph.events";
export declare function loadFloors(allIndexedMapObjects: Record<string, MapObj>, allIndexedRetailers: Record<string, IRetailer>, allMapObjects: string[], allNodesFloor: Record<string, number>, pathFinderGraph: Graph<any, any> & EventedType, floors: IFloorData[], config: IConfig, results: SVGResult[], role?: TRoles): {
    GeometriesAndMaterials: IMeshValues[][];
    graph: Graph<any, any> & EventedType;
    escalator_nodes: string[];
};
