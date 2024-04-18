import { MapObj, MapObjToSave } from "src/interfaces/mapitApiTypes";
import { IConfig, IMeshParamsTmp } from "src/interfaces/types";
interface IMapboxForm {
    floorIndex: number;
    meshFloors: IMeshParamsTmp;
    config: IConfig;
    data: any;
    setData: (index: number, data: MapObj) => void;
    selectedId: string;
    centerId: number;
    onSubmit?: (data: MapObjToSave, refreshData?: () => void) => void;
    apiURI?: string;
    onResetData?: (data: MapObj) => void;
    triggerSceneUpdate: Function;
}
export declare const getDefaultMapOjbValues: (centerId: number) => MapObj;
declare const MapboxForm: (params: IMapboxForm) => import("react/jsx-runtime").JSX.Element | null;
export default MapboxForm;
