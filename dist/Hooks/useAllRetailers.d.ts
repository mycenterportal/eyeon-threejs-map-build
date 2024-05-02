import { IRetailer } from "src/mapitApiTypes";
declare const useAllRetailers: (baseUrl: string, center_id: string, limit: number) => {
    retailers: {
        count: number;
        items: IRetailer[];
    };
    getAll: () => Promise<{
        count: number;
        items: IRetailer[];
    }>;
};
export default useAllRetailers;
