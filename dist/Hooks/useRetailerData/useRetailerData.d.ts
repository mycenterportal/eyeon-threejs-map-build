import { IRetailer } from "src/mapitApiTypes";
type RetailerDataProps = {
    centerId: string;
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
