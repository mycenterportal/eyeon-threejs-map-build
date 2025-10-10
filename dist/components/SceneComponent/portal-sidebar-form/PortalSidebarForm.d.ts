import { MapObjData } from '../../../interfaces/mapApiTypes';
import { MeshFloorsProps } from '../../../interfaces';
interface PortalSidebarFormProps {
    floorIndex: number;
    meshFloors: MeshFloorsProps;
    setData: (index: number, data: MapObjData) => void;
    selectedId: string;
    onSubmit?: (data: MapObjData, refreshData?: () => void) => void;
    onResetData?: (data: MapObjData) => void;
    onChangeData?: (data: MapObjData) => void;
    onNewData?: (data: MapObjData) => void;
    triggerSceneUpdate: Function;
}
declare const PortalSidebarForm: (params: PortalSidebarFormProps) => import("react/jsx-runtime").JSX.Element | null;
export default PortalSidebarForm;
