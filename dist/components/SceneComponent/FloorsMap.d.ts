import { IConfig, IMeshParams } from "../../types";
import React from "react";
import { Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { IZoomData } from "./SceneComponent";
interface IFloorsMapProps {
    meshFloors: IMeshParams;
    currentFloorIndex: number;
    onPointerEnter?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerLeave?: (e: ThreeEvent<PointerEvent>) => void;
    onPointerMove?: (e: ThreeEvent<PointerEvent>) => void;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
    onCameraMove?: (e: any) => void;
    currKioskObj: Mesh;
    currKioskFloorIndex: number;
    routeTargetId?: string;
    routeTargetFromId?: string;
    amenityTargetType: string;
    activeObjectId?: string;
    hoverObjectId?: string;
    handleChangeFloor: (index: number) => void;
    escalatorNodes: string[];
    zoom: IZoomData | null;
    handleCameraLength?: (length: number) => void;
    config: IConfig;
    cameraPos?: {
        x: number;
        y: number;
        z: number;
    } | undefined | null;
    controlPos?: {
        x: number;
        y: number;
        z: number;
    } | undefined | null;
    handleCameraAndControlsChange?: (camPos: {
        x: number;
        y: number;
        z: number;
    }, ctrlTarget: {
        x: number;
        y: number;
        z: number;
    }) => void;
}
export declare const FloorsMap: React.ForwardRefExoticComponent<IFloorsMapProps & React.RefAttributes<unknown>>;
export {};
