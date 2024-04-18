import { IRetailer } from "src/interfaces/mapitApiTypes";
type GetRetailersParams = {
    centerId: number;
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
