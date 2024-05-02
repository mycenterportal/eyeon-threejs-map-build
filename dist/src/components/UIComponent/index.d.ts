import { IAmenitiesInteractiveList, IFloorSelectorProps, TRoles } from "src/types";
import { MouseEventHandler } from "react";
import { MapObj } from "src/mapitApiTypes";
import { AmenityID } from "src/MapBox";
import "./../../../public/icomoon/style.css";
declare const UIComponent: ({ floors, accentColor, selectedFloorIndex, handleFloorChange, amenitiesList, zoomIn, zoomOut, reset, clearRoute, handleAmenityClick, role, mapObjs, onExtractedAmenities, }: IFloorSelectorProps & {
    amenitiesList: IAmenitiesInteractiveList[];
    zoomIn?: MouseEventHandler<HTMLDivElement> | undefined;
    zoomOut?: MouseEventHandler<HTMLDivElement> | undefined;
    reset?: ((fullReset?: boolean) => void) | undefined;
    clearRoute?: MouseEventHandler<HTMLDivElement> | undefined;
    handleAmenityClick: (type: string) => void;
    role?: TRoles | undefined;
    mapObjs?: MapObj[] | undefined;
    onExtractedAmenities?: ((amenityIds: AmenityID[]) => void) | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export default UIComponent;
