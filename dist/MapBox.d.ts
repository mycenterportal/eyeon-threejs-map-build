import { default as React } from 'react';
import { MapAmenityID } from './helpers/amenities.helper';
import { MapAllDataResponse, MapCameraControlsState, MapObjData, MapResponsiveSettings } from './interfaces/mapApiTypes';
import { MapConfigProps } from './interfaces';
export type MapBoxRefProps = {
    refreshData: () => void;
    createRouteToAmenity: (amenityId: MapAmenityID) => void;
    createRouteToStore: (retailerId: number) => void;
    getInitialDistance: () => number;
    resetMap: () => void;
    refreshState: () => void;
    setMapConfig: React.Dispatch<React.SetStateAction<MapConfigProps>>;
    refetchMapData: () => void;
};
export interface AppProps {
    config: Partial<MapConfigProps>;
    webApiURI: string;
    cachedMapApiResponse?: MapAllDataResponse | null;
    onNewMapApiResponse?: (mapApiResponse: MapAllDataResponse) => void;
    mapBoxRefObj?: React.RefObject<MapBoxRefProps> | undefined;
    onObjectSaveData?: (data: MapObjData, refreshData?: () => void) => void;
    onObjectResetData?: (data: MapObjData) => void;
    onObjectChangeData?: (data: MapObjData) => void;
    onObjectNewData?: (data: MapObjData) => void;
    mapApiResponseRef?: React.RefObject<MapAllDataResponse | null> | null;
    onChangeCameraControlPosition?: (mapResponsiveSetings: MapResponsiveSettings, cameraControlPos: MapCameraControlsState, floorId: number | null) => void;
    onExtractedAmenities?: (amenityIds: MapAmenityID[]) => void;
    handleClickOnRetailer?: (retailer_id: number) => void;
}
declare const MapBox: (params: AppProps) => import("react/jsx-runtime").JSX.Element;
export default MapBox;
