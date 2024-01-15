import { MutableRefObject } from 'react';
import { MapIt2Response, MapObj, MapObjToSave } from "./mapitApiTypes";
import { IJsonConfig } from "./types";
import 'bootstrap/dist/css/bootstrap.min.css';
export type MapBoxRefFs = {
    refreshData: () => void;
};
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
}
declare function MapBox({ mapitData, config, onSettingsLoading, webApiURI, mediaStorageURI, onSubmit, refObj, deviceType, setCameraControlPosition, onResetData }: IAppProps): import("react/jsx-runtime").JSX.Element | null;
export default MapBox;
