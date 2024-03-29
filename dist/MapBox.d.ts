import { MutableRefObject } from 'react';
import { MapIt2Response, MapObj, MapObjToSave } from "./mapitApiTypes";
import { IJsonConfig } from "./types";
import 'bootstrap/dist/css/bootstrap.min.css';
export type MapBoxRefFs = {
    refreshData: () => void;
    createRouteToAmenity: (amenityId: AmenityID) => void;
};
export type AmenityID = 'atm' | 'management' | 'playarea' | 'restroom' | 'family-restroom' | 'elevator' | 'security' | 'dog-poop-station';
export interface IAppProps {
    mapitData?: unknown;
    config: Partial<IJsonConfig>;
    stats?: boolean;
    onSettingsLoading?: (settings: MapIt2Response) => void;
    webApiURI?: string;
    mediaStorageURI?: string;
    onSubmit?: (data: MapObjToSave, refreshData?: () => void) => void;
    refObj?: MutableRefObject<MapBoxRefFs | null> | undefined;
    onResetData?: (data: MapObj) => void;
    deviceType?: string | "";
    setCameraControlPosition?: (cameraControlPos: any) => void;
    onExtractedAmenities?: (amenityIds: AmenityID[]) => void;
}
declare function MapBox({ mapitData, config, onSettingsLoading, webApiURI, mediaStorageURI, onSubmit, refObj, deviceType, setCameraControlPosition, onResetData, onExtractedAmenities }: IAppProps): import("react/jsx-runtime").JSX.Element | null;
export default MapBox;
