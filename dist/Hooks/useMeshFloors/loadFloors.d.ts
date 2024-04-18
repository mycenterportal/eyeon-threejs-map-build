import { SVGResult } from "three-stdlib";
import { IConfig, IFloorData, IMeshValues } from "src/interfaces/types";
import { IRetailer, MapObj } from "src/interfaces/mapitApiTypes";
import { Graph } from "ngraph.graph";
import { EventedType } from "ngraph.events";
import { MapRole } from "src/constants/globals";
export declare function loadFloors(allIndexedMapObjects: Record<string, MapObj>, allIndexedRetailers: Record<string, IRetailer>, allMapObjects: string[], allNodesFloor: Record<string, number>, pathFinderGraph: Graph<any, any> & EventedType, floors: IFloorData[], config: IConfig, results: SVGResult[], role?: MapRole): {
    GeometriesAndMaterials: IMeshValues[][];
    graph: Graph<any, any> & EventedType;
    escalator_nodes: string[];
};
