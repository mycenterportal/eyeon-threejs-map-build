import { IRetailer } from "./../interfaces/mapitApiTypes";
declare const useAllRetailers: (baseUrl: string, center_id: number, limit: number) => {
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
