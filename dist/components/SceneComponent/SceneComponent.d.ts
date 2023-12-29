import React from "react";
import { IJsonConfig } from "src/types";
import { MapIt2Response, MapObj, MapObjToSave } from "../../mapitApiTypes";
interface ISceneComponentProps {
    mapitData?: MapIt2Response;
    config: Partial<IJsonConfig>;
    selectedActiveObjectId: string;
    setSelectedActiveObjectId: React.Dispatch<React.SetStateAction<string>>;
    onMapDataUpdate?: (data: MapObj[]) => void;
    onSettingsLoading?: (settings: MapIt2Response) => void;
    webApiURI?: string;
    mediaStorageURI?: string;
    onSubmit?: (data: MapObjToSave, refreshData?: () => void) => void;
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
export interface IZoomData {
    direction: 'in' | 'out';
}
export type TFormMapObjData = {
    index: number;
    data: MapObj;
};
declare const SceneComponent: React.ForwardRefExoticComponent<ISceneComponentProps & React.RefAttributes<unknown>>;
export default SceneComponent;
