import { IMeshParams } from "../../interfaces/types";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh } from "three";
interface IMapProps {
    floorIndex: number;
    currentFloorIndex: number;
    meshFloors: IMeshParams;
    currKioskObj: Mesh | null;
    activeObjectId?: string;
    hoverObjectId?: string;
    routeTube?: Mesh;
    visible: boolean;
    onPointerEnter?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerLeave?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
    handleChangeFloor: (index: number) => void;
}
export declare const Map: (params: IMapProps) => import("react/jsx-runtime").JSX.Element;
export {};
