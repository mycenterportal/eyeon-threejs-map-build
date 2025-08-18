import { Dispatch, ReactNode, SetStateAction } from "react";
import { Graph } from "ngraph.graph";
import { type Mesh } from "three";
import path from "ngraph.path";
import { EventedType } from "ngraph.events";
import { MapConfigProps, IExtMesh } from "src/interfaces";
import { MapObjData, MapRetailer, MapAllDataResponse, MapKiosk } from "src/interfaces/mapApiTypes";
import { AppFloor } from "src/interfaces/mapbox";
interface MapBoxContextType {
    apiBaseUrl: string;
    refetchMapData: () => void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    initialFloorsDataIsLoaded: boolean;
    setInitialFloorsDataIsLoaded: Dispatch<SetStateAction<boolean>>;
    mapConfig: MapConfigProps;
    setMapConfig: React.Dispatch<React.SetStateAction<MapConfigProps>>;
    mapApiResponse: MapAllDataResponse;
    setMapApiResponse: React.Dispatch<React.SetStateAction<MapAllDataResponse>>;
    meshByObjectId: Map<string, Mesh>;
    setMeshByObjectId: Dispatch<SetStateAction<Map<string, Mesh>>>;
    allMapObjects: Array<string>;
    setAllMapObjects: Dispatch<SetStateAction<Array<string>>>;
    allIndexedMapObjects: Record<string, MapObjData>;
    setAllIndexedMapObjects: Dispatch<SetStateAction<Record<string, MapObjData>>>;
    allIndexedRetailers: Record<number, MapRetailer>;
    setAllIndexedRetailers: Dispatch<SetStateAction<Record<number, MapRetailer>>>;
    indexedKiosks: Record<number, MapKiosk>;
    setIndexedKiosks: Dispatch<SetStateAction<Record<number, MapKiosk>>>;
    floorsData: AppFloor[];
    setFloorsData: Dispatch<SetStateAction<AppFloor[]>>;
    allNodesFloor: Record<string, number>;
    setAllNodesFloor: Dispatch<SetStateAction<Record<string, number>>>;
    pathFinderGraph: Graph<any, any> & EventedType;
    setPathFinderGraph: Dispatch<SetStateAction<Graph<any, any> & EventedType>>;
    ngraphPath: typeof path;
    setNgraphPath: Dispatch<SetStateAction<typeof path>>;
    meshObject: IExtMesh[];
    setMeshObject: React.Dispatch<React.SetStateAction<IExtMesh[]>>;
    cameraLength: number | undefined;
    setCameraLength: React.Dispatch<React.SetStateAction<number | undefined>>;
}
export interface ProviderInitialData {
    webApiBaseUrl: string;
    config: Partial<MapConfigProps>;
}
interface MapBoxContextProviderProps {
    children: ReactNode;
    initialData: ProviderInitialData;
    mapApiResponseRef?: React.MutableRefObject<MapAllDataResponse | null>;
}
declare const MapBoxContextProvider: ({ children, initialData, mapApiResponseRef }: MapBoxContextProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare function useMapBoxContext(): MapBoxContextType;
export default MapBoxContextProvider;
