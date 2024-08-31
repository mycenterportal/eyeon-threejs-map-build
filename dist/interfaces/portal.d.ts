import { MapRenderMode } from ".";
export interface PortalMapSettingsProps {
    MAP_STYLE: MapRenderMode;
    MAP_BACKGROUND_COLOR: string;
    ACCENT_COLOR: string;
    STORE_DEFAULT_COLOR: string;
    STORE_TEXT_COLOR: string;
    STORE_HEIGHT: number;
    WALL_COLOR: string;
    BOUNDARY_COLOR: string;
    BASE_COLOR: string;
    OVERLAY_COLOR: string;
    WALL_THICKNESS: number;
    BOUNDARY_THICKNESS: number;
    OVERLAY_OPACITY: number;
    KIOSK_SIZE: number;
    ZOOM_STEP: number;
    SELECTED_ZOOM_LIMIT: number;
    CAMERA_MAX_DISTANCE: number;
    CAMERA_MIN_DISTANCE: number;
}
