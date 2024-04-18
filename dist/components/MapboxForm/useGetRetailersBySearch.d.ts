import { IRetailer } from "src/mapitApiTypes";
type GetRetailersParams = {
    centerId: string | number;
    apiURI?: string;
};
export type Data = {
    isError: boolean;
    error: string | null;
    items: IRetailer[];
    count: number;
};
declare const useGetRetailersBySearch: (params: GetRetailersParams) => (search: string, limit?: number) => Promise<Data>;
export default useGetRetailersBySearch;
