/// <reference types="react" />
import { IExtMesh, MapDeviceType, MeshFloorsProps, ZoomData } from "../../interfaces";
import { Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { MapCameraControlsState } from "src/interfaces/mapApiTypes";
interface FloorsMapProps {
    meshFloors: MeshFloorsProps;
    currentFloorIndex: number;
    onPointerEnter?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerLeave?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
    currKioskObj: Mesh | null;
    currKioskFloorIndex: number;
    routeTargetId?: string;
    routeTargetFromId?: string;
    selectedAmenityType: string;
    activeObjectId?: string;
    hoverObjectId?: string;
    handleChangeFloor: (index: number) => void;
    escalatorNodes: string[];
    zoom: ZoomData | null;
    handleCameraLength?: (length: number) => void;
    cameraControlsPosition: MapCameraControlsState;
    handleCameraAndControlsChange?: ({ camera, controls }: MapCameraControlsState) => void;
    isSelectedRetailerSlug: boolean;
    setIsCameraInit: Function;
    handleObjectClick: (object: IExtMesh, targetId: string, softClick?: boolean) => void;
    triggerClick: boolean;
    deviceType: MapDeviceType;
}
export declare const FloorsMap: import("react").ForwardRefExoticComponent<FloorsMapProps & import("react").RefAttributes<unknown>>;
export {};
