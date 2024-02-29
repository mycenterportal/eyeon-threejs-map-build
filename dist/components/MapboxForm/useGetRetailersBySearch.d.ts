type GetRetailersParams = {
    centerId: string | number;
    apiURI?: string;
    limit?: number;
    page?: number;
};
declare const useGetRetailersBySearch: (params: GetRetailersParams) => (search: string) => Promise<{
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
