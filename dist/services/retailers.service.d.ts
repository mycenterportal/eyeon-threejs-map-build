import { AxiosInstance } from 'axios';
import { MapRetailer, MapRetailerSingle } from '../interfaces/mapApiTypes';
export interface RetailersService {
    getAllRetailers: () => Promise<{
        retailers: MapRetailer[];
        globalRetailerIds: number[];
    }>;
    getRetailer: (slug: string) => Promise<MapRetailerSingle>;
}
declare const createRetailersService: (axiosInstance: AxiosInstance) => RetailersService;
export default createRetailersService;
