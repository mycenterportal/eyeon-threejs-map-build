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
    cameraPos?: {
        x: number;
        y: number;
        z: number;
    } | undefined;
    controlPos?: {
        x: number;
        y: number;
        z: number;
    } | undefined;
    handleCameraAndControlsChange?: (camPos: {
        x: number;
        y: number;
        z: number;
    }, ctrlTarget: {
        x: number;
        y: number;
        z: number;
    }) => void;
    isResponsive?: boolean;
}
declare function MapBox({ mapitData, config, onSettingsLoading, webApiURI, mediaStorageURI, onSubmit, refObj, cameraPos, controlPos, handleCameraAndControlsChange, isResponsive, onResetData }: IAppProps): import("react/jsx-runtime").JSX.Element | null;
export default MapBox;
