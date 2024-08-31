import React from "react";
import { MapAmenityID } from "src/helpers/amenities.helper";
import { MapObjData } from "src/interfaces/mapApiTypes";
interface SceneComponentProps {
    selectedActiveObjectId: string;
    setSelectedActiveObjectId: React.Dispatch<React.SetStateAction<string>>;
    onMapDataUpdate?: (data: MapObjData[]) => void;
    onSubmit?: (data: MapObjData, refreshData?: () => void) => void;
    onResetData?: (data: MapObjData) => void;
    onChangeData?: (data: MapObjData) => void;
    onNewData?: (data: MapObjData) => void;
    onChangeCameraControlPosition?: (cameraControlPos: any) => void;
    onExtractedAmenities?: (amenityIds: MapAmenityID[]) => void;
    handleClickOnRetailer?: (slug: string) => void;
}
export type TFormMapObjData = {
    index: number;
    data: MapObjData;
};
declare const SceneComponent: React.ForwardRefExoticComponent<SceneComponentProps & React.RefAttributes<unknown>>;
export default SceneComponent;
