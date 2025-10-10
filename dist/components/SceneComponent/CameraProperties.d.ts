import { Vector3 } from 'three';
interface CameraPropertiesProps {
    far?: number;
    near?: number;
    fov?: number;
    aspectRatio?: number;
    position?: Vector3;
}
export declare const CameraProperties: (props: CameraPropertiesProps) => null;
export {};
