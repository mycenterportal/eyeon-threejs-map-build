import { MapApiService } from './map.service';
import { RetailersService } from './retailers.service';
export interface ApiServicesProps {
    mapApiService: MapApiService;
    retailersService: RetailersService;
}
declare const createApiServices: (baseApiUrl: string, center_id: number) => ApiServicesProps;
export default createApiServices;
