import { default as React } from 'react';
import { MapAmenityID } from '../../helpers/amenities.helper';
import { MapCameraControlsState, MapObjData, MapResponsiveSettings } from '../../interfaces/mapApiTypes';
interface SceneComponentProps {
    selectedActiveObjectId: string;
    setSelectedActiveObjectId: React.Dispatch<React.SetStateAction<string>>;
    onMapDataUpdate?: (data: MapObjData[]) => void;
    onObjectSaveData?: (data: MapObjData, refreshData?: () => void) => void;
    onObjectResetData?: (data: MapObjData) => void;
    onObjectChangeData?: (data: MapObjData) => void;
    onObjectNewData?: (data: MapObjData) => void;
    onChangeCameraControlPosition?: (mapResponsiveSetings: MapResponsiveSettings, cameraControlPos: MapCameraControlsState, floorId: number | null) => void;
    onExtractedAmenities?: (amenityIds: MapAmenityID[]) => void;
    handleClickOnRetailer?: (retailer_id: number) => void;
}
export type TFormMapObjData = {
    index: number;
    data: MapObjData;
};
declare const SceneComponent: React.ForwardRefExoticComponent<SceneComponentProps & React.RefAttributes<unknown>>;
export default SceneComponent;
