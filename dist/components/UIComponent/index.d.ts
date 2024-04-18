import { IAmenitiesInteractiveList, IFloorSelectorProps } from "src/interfaces/types";
import { MouseEventHandler } from "react";
import { MapObj } from "src/interfaces/mapitApiTypes";
import { AmenityID } from "src/components/map-box/MapBox";
import { MapRole } from "src/constants/globals";
declare const UIComponent: ({ floors, accentColor, selectedFloorIndex, handleFloorChange, amenitiesList, zoomIn, zoomOut, reset, clearRoute, handleAmenityClick, role, mapObjs, onExtractedAmenities, }: IFloorSelectorProps & {
    amenitiesList: IAmenitiesInteractiveList[];
    zoomIn?: MouseEventHandler<HTMLDivElement> | undefined;
    zoomOut?: MouseEventHandler<HTMLDivElement> | undefined;
    reset?: ((fullReset?: boolean) => void) | undefined;
    clearRoute?: MouseEventHandler<HTMLDivElement> | undefined;
    handleAmenityClick: (type: string) => void;
    role?: MapRole | undefined;
    mapObjs?: MapObj[] | undefined;
    onExtractedAmenities?: ((amenityIds: AmenityID[]) => void) | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export default UIComponent;
