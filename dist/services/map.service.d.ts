import { AxiosInstance } from "axios";
import { MapConfigProps } from "src/interfaces";
import { MapResponsiveSettings, MapObjData, MapFloor, MapKiosk } from "src/interfaces/mapApiTypes";
export interface MapApiService {
    getMapData: () => Promise<MapObjData[]>;
    getMapFloors: () => Promise<MapFloor[]>;
    getMapKiosks: () => Promise<MapKiosk[]>;
    getMapSettings: () => Promise<{
        apiResponse: any;
        responseConfig: Partial<MapConfigProps>;
    }>;
    getMapResponsiveSettings: () => Promise<MapResponsiveSettings>;
}
declare const createMapApiService: (axiosInstance: AxiosInstance) => MapApiService;
export default createMapApiService;
