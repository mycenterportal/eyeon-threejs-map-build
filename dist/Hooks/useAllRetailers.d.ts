import { IRetailer } from "src/mapitApiTypes";
declare const useAllRetailers: (baseUrl: string, center_id: string, limit: number) => {
    retailers: IRetailer[];
    getAllRetailers: () => Promise<IRetailer[]>;
};
export default useAllRetailers;
