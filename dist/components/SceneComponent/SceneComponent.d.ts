import React from "react";
import { MapConfig } from "src/interfaces/types";
import { MapIt2Response, MapObj, MapObjToSave } from "../../interfaces/mapitApiTypes";
import { AmenityID } from "src/components/map-box/MapBox";
interface ISceneComponentProps {
    mapitData?: MapIt2Response;
    config: Partial<MapConfig>;
    selectedActiveObjectId: string;
    setSelectedActiveObjectId: React.Dispatch<React.SetStateAction<string>>;
    onMapDataUpdate?: (data: MapObj[]) => void;
    onSettingsLoading?: (settings: MapIt2Response) => void;
    webApiURI?: string;
    mediaStorageURI?: string;
    onSubmit?: (data: MapObjToSave, refreshData?: () => void) => void;
    onResetData?: (data: MapObj) => void;
    deviceType?: string | "";
    setCameraControlPosition?: (cameraControlPos: any) => void;
    onExtractedAmenities?: (amenityIds: AmenityID[]) => void;
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
