export type MapAmenityID = 'atm' | 'management' | 'playarea' | 'restroom' | 'family-restroom' | 'elevator' | 'escalator' | 'security' | 'dog-poop-station' | 'child-stroller' | 'vending-machine' | 'stairs' | 'charging-station' | 'wheelchair';
export interface MapAmenity {
    name: string;
    type: MapAmenityID;
    svgCode: string;
}
export declare const AllAmenities: MapAmenity[];
