import React, { MutableRefObject } from 'react';
import { MapAmenityID } from './helpers/amenities.helper';
import { MapAllDataResponse, MapCameraControlsState, MapObjData } from './interfaces/mapApiTypes';
import { MapConfigProps } from './interfaces';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';
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
    onSubmit?: (data: MapObjData, refreshData?: () => void) => void;
    mapBoxRefObj?: MutableRefObject<MapBoxRefProps | null> | undefined;
    onResetData?: (data: MapObjData) => void;
    onChangeData?: (data: MapObjData) => void;
    onNewData?: (data: MapObjData) => void;
    mapApiResponseRef?: MutableRefObject<MapAllDataResponse | null> | undefined;
    onChangeCameraControlPosition?: (cameraControlPos: MapCameraControlsState) => void;
    onExtractedAmenities?: (amenityIds: MapAmenityID[]) => void;
    handleClickOnRetailer?: (retailer_id: number) => void;
}
declare const MapBox: React.ForwardRefExoticComponent<AppProps & React.RefAttributes<unknown>>;
export default MapBox;
