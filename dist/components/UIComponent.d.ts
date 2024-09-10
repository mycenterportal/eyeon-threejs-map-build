import { MouseEventHandler } from "react";
import { MapAmenity, MapAmenityID } from "src/helpers/amenities.helper";
export interface UIComponentProps {
    selectedFloorIndex: number;
    handleFloorChange: (floorIndex: number) => void;
    amenitiesList: MapAmenity[];
    zoomIn?: MouseEventHandler<HTMLDivElement>;
    zoomOut?: MouseEventHandler<HTMLDivElement>;
    reset?: (fullReset?: boolean) => void;
    clearRoute?: MouseEventHandler<HTMLDivElement>;
    handleAmenityClick: (type: string, map_obj_name?: string) => void;
    onExtractedAmenities?: (amenityIds: MapAmenityID[]) => void;
}
declare const UIComponent: ({ selectedFloorIndex, handleFloorChange, amenitiesList, zoomIn, zoomOut, reset, clearRoute, handleAmenityClick, onExtractedAmenities, }: UIComponentProps) => import("react/jsx-runtime").JSX.Element;
export default UIComponent;
