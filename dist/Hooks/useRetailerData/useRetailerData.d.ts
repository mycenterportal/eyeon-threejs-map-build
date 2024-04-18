import { IRetailer } from "src/interfaces/mapitApiTypes";
type RetailerDataProps = {
    centerId: number;
    slug: string;
    webApiURI: string;
};
export type RetailerData = {
    data: IRetailer | null;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
};
declare const useRetailerData: (props: RetailerDataProps) => RetailerData;
export default useRetailerData;
