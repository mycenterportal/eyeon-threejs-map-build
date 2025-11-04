import { MapConfigProps } from '../interfaces';
import { Color } from 'three';
export declare const hex_to_color: (hex_code: string) => Color;
export declare const getSvgIconHTML: (icon: string) => string | undefined;
export declare const FormatPhoneNumber: (numberStr: string) => string;
export declare const getImageProxyUrl: (imageUrl: string, mapConfig: MapConfigProps) => string;
