import { AxiosInstance } from "axios";
import { MapRetailer, MapRetailerSingle } from "src/interfaces/mapApiTypes";
export interface RetailersService {
    getAllRetailers: () => Promise<MapRetailer[]>;
    getRetailer: (slug: string) => Promise<MapRetailerSingle>;
}
declare const createRetailersService: (axiosInstance: AxiosInstance) => RetailersService;
export default createRetailersService;