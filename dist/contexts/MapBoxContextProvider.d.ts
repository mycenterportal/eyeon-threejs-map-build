import { Dispatch, ReactNode, SetStateAction } from "react";
import { Graph } from "ngraph.graph";
import { IRetailer, MapObj } from "src/mapitApiTypes";
import type { Mesh } from "three";
import path from "ngraph.path";
import { EventedType } from "ngraph.events";
import { IFloorData } from "src/types";
type MapBoxContextType = {
    meshByObjectId: Map<string, Mesh>;
    setMeshByObjectId: Dispatch<SetStateAction<Map<string, Mesh>>> | Function;
    allMapObjects: Array<string>;
    setAllMapObjects: Dispatch<SetStateAction<Array<string>>> | Function;
    allIndexedMapObjects: Record<string, MapObj>;
    setAllIndexedMapObjects: Dispatch<SetStateAction<Record<string, MapObj>>> | Function;
    allIndexedRetailers: Record<string, IRetailer>;
    setAllIndexedRetailers: Dispatch<SetStateAction<Record<string, IRetailer>>> | Function;
    allNodesFloor: Record<string, number>;
    setAllNodesFloor: Dispatch<SetStateAction<Record<string, number>>> | Function;
    pathFinderGraph: Graph<any, any> & EventedType;
    setPathFinderGraph: Dispatch<SetStateAction<Graph<any, any> & EventedType>> | Function;
    ngraphPath: typeof path;
    setNgraphPath: Dispatch<SetStateAction<typeof path>> | Function;
    floorsData: IFloorData[];
};
declare const MapBoxContextProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare function useMapBoxContext(): MapBoxContextType;
export default MapBoxContextProvider;
