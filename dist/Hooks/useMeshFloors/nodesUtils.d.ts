import { AppFloor } from '../../interfaces/mapbox';
import { Vector2 } from 'three';
export declare function next_node_name(node_count: number): string;
export declare function get_node_name(vertex: Vector2, floor_index: number, floors: AppFloor[], node_count: number): [string, boolean];
