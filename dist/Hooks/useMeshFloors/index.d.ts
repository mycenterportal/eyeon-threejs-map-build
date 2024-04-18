import { MapConfig, IMeshParamsTmp } from "../../interfaces/types";
import { MapIt2Response } from "../../interfaces/mapitApiTypes";
import { MapRole } from "src/constants/globals";
export declare const textLogoNamePrefix = "custom-layer-";
declare const useMeshFloors: (data: MapIt2Response | null, jsonConfig?: Partial<MapConfig>, role?: MapRole, mediaStorageURI?: string) => IMeshParamsTmp;
export default useMeshFloors;
