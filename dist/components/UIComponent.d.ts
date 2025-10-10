import { MouseEventHandler } from 'react';
import { MapAmenity, MapAmenityID } from '../helpers/amenities.helper';
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
declare const UIComponent: (params: UIComponentProps) => import("react/jsx-runtime").JSX.Element;
export default UIComponent;
