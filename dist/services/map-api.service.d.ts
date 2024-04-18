import { MapIt2Response } from "../interfaces/mapitApiTypes";
interface useMapIt2DataProps {
    CENTER_ID: number;
    mapitData?: MapIt2Response;
    webApiURI?: string;
}
type Mapit2DataReturn = {
    data: MapIt2Response | null;
    refreshData: () => void;
    removeMissingMapObjects: (objectNames: string[]) => void;
};
/**
 * This is a hook that fetches the mapit2 data from the server by CENTER_ID. or uses the data passed in.
 * @param CENTER_ID
 * @param mapitData
 */
export declare function useMapit2Data({ CENTER_ID, mapitData, webApiURI }: useMapIt2DataProps): Mapit2DataReturn;
export {};
