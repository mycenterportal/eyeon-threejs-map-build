import { MapObjData } from '../../../interfaces/mapApiTypes';
import { MeshFloorsProps } from '../../../interfaces';
interface PortalSidebarFormProps {
    floorIndex: number;
    meshFloors: MeshFloorsProps;
    setData: (index: number, data: MapObjData) => void;
    selectedId: string;
    onObjectSaveData?: (data: MapObjData, refreshData?: () => void) => void;
    onObjectResetData?: (data: MapObjData) => void;
    onObjectChangeData?: (data: MapObjData) => void;
    onObjectNewData?: (data: MapObjData) => void;
    triggerSceneUpdate: Function;
}
declare const PortalSidebarForm: (params: PortalSidebarFormProps) => import("react/jsx-runtime").JSX.Element | null;
export default PortalSidebarForm;
