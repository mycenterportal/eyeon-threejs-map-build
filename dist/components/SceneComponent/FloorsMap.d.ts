import { IConfig, IMeshParams } from "../../types";
import React, { MouseEventHandler } from "react";
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
    routeTargetId?: string;
    routeTargetFromId?: string;
    amenityTargetType: string;
    activeObjectId?: string;
    hoverObjectId?: string;
    handleChangeFloor: (index: number) => MouseEventHandler<HTMLDivElement>;
    escalatorNodes: string[];
    zoom: IZoomData | null;
    handleCameraLength?: (length: number) => void;
    config: IConfig;
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
export declare const FloorsMap: React.ForwardRefExoticComponent<IFloorsMapProps & React.RefAttributes<unknown>>;
export {};
