import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Graph } from 'ngraph.graph';
import { Mesh } from 'three';
import { default as path } from 'ngraph.path';
import { EventedType } from 'ngraph.events';
import { MapConfigProps, IExtMesh } from '../interfaces';
import { MapObjData, MapRetailer, MapAllDataResponse, MapKiosk } from '../interfaces/mapApiTypes';
import { AppFloor } from '../interfaces/mapbox';
import { ApiServicesProps } from '../services/index.service';
export interface MapBoxContextType {
    refetchMapData: () => void;
    apiServices: ApiServicesProps;
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
    meshObject: {
        svgShapeMeshObject: IExtMesh;
        textImageMeshObject: IExtMesh;
    } | null;
    setMeshObject: React.Dispatch<React.SetStateAction<{
        svgShapeMeshObject: IExtMesh;
        textImageMeshObject: IExtMesh;
    } | null>>;
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
    mapApiResponseRef?: React.RefObject<MapAllDataResponse | null> | null;
    cachedMapApiResponse?: MapAllDataResponse | null;
    onNewMapApiResponse?: (mapApiResponse: MapAllDataResponse) => void;
}
declare const MapBoxContextProvider: ({ children, initialData, mapApiResponseRef, cachedMapApiResponse, onNewMapApiResponse }: MapBoxContextProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare function useMapBoxContext(): MapBoxContextType;
export default MapBoxContextProvider;
