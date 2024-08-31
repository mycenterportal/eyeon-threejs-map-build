import React, { MutableRefObject } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapAmenityID } from './helpers/amenities.helper';
import { MapCameraControlsState, MapObjData } from './interfaces/mapApiTypes';
import { MapConfigProps } from './interfaces';
import './styles/global.scss';
export type MapBoxRefProps = {
    refreshData: () => void;
    createRouteToAmenity: (amenityId: MapAmenityID) => void;
    createRouteToStore: (retailerSlug: string) => void;
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
    onChangeCameraControlPosition?: (cameraControlPos: MapCameraControlsState) => void;
    onExtractedAmenities?: (amenityIds: MapAmenityID[]) => void;
    handleClickOnRetailer?: (slug: string) => void;
}
declare const MapBox: React.ForwardRefExoticComponent<AppProps & React.RefAttributes<unknown>>;
export default MapBox;
