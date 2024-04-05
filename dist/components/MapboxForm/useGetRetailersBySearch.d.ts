type GetRetailersParams = {
    centerId: string | number;
    apiURI?: string;
};
export type Data = {
    isError: boolean;
    error: string | null;
    items: any[];
    count: number;
};
declare const useGetRetailersBySearch: (params: GetRetailersParams) => (search: string, page?: number, limit?: number) => Promise<{
    items: any;
    count: any;
    isError: boolean;
    error: string | null;
} | {
    isError: boolean;
    error: any;
    items: never[];
    count: number;
}>;
export default useGetRetailersBySearch;
