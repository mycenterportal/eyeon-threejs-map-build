import { MapAmenityID } from "src/helpers/amenities.helper";
import { PortalMapSettingsProps } from "./portal";
export interface MapRetailer {
    id: number;
    index?: number;
    retail_name: string;
    slug: string;
    location: string;
    retailer_phone: string;
    retailer_description: string;
    logo: string;
    map_obj_name: string;
}
export interface MapRetailerSingle extends MapRetailer {
    opening_hours: Record<string, {
        startTime: string;
        endTime: string;
        isClosed: boolean;
    }>;
}
export interface MapObjData {
    id?: number;
    center_id?: number;
    retailer_id: number | null;
    kiosk_id: number | null;
    map_obj_name: string;
    obj_type: 'retailer' | 'special' | 'custom';
    layer_type: 'retail_name' | 'retail_logo' | 'retail_text' | 'kiosk' | 'amenity' | 'custom_image' | 'custom_text';
    value: MapAmenityID | string;
    custom_text: string | null;
    custom_image: string | null;
    bg_color: string | null;
    transparent: boolean;
    text_color: string | null;
    size: number;
    rotate: number;
    offset_x: number;
    offset_y: number;
    lock_size: boolean;
}
export interface MapFloor {
    id: number;
    name: string;
    svgUrl: string;
}
export interface MapKiosk {
    id: number;
    name: string;
    map_obj_name?: string;
}
export interface MapVectorPoint {
    x: number;
    y: number;
    z: number;
}
export type MapCameraControlsState = {
    camera: MapVectorPoint;
    controls: MapVectorPoint;
};
export interface MapResponsiveSettings {
    display_app: MapCameraControlsState;
    desktop: MapCameraControlsState;
    tablet: MapCameraControlsState;
    mobile: MapCameraControlsState;
}
export type MapAllDataResponse = {
    retailers: MapRetailer[];
    map_objs: MapObjData[];
    floors: MapFloor[];
    kiosks: MapKiosk[];
    mapSettings: PortalMapSettingsProps;
};
