import { MapApiService } from './map.service';
import { RetailersService } from './retailers.service';
import { MapConfigProps } from '../interfaces';
export interface ApiServicesProps {
    mapApiService: MapApiService;
    retailersService: RetailersService;
}
declare const createApiServices: (baseApiUrl: string, mapConfig: MapConfigProps) => ApiServicesProps;
export default createApiServices;
