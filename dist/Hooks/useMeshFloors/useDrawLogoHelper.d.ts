import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector3, BufferGeometry, Box3, Object3D, Scene } from 'three';
import { IExtMesh } from '../../interfaces';
import { MapObjData, MapRetailer } from '../../interfaces/mapApiTypes';
declare const useDrawLogoHelper: () => {
    drawTextLogoStoreOnMap: (allNonIndexedMapObjects: Record<any, any>[], scene: Scene, textLogoNamePrefix: string, allIndexedMapObjects: Record<string, MapObjData>, allIndexedRetailers: Record<string, MapRetailer>, config: Record<any, any>, myFont: any, floors: Record<any, any>[]) => void;
    addTextOrLogoOnStore: (map_obj: any, scene: Scene, textLogoNamePrefix: string, allIndexedMapObjects: Record<string, MapObjData>, allIndexedRetailers: Record<any, any>, config: Record<any, any>, myFont: any, floors: Record<any, any>[]) => void;
    getMeshGroupBoundingBox: (mesh: Mesh | Array<Mesh>) => Box3;
    layer_text_logo_position_by_id: (object_id: string, newMeshPos: Vector3, mesh_size: Vector3, newMesh: Mesh, allIndexedMapObjects: Record<any, any>) => void;
    getImage: (map_obj: Record<string, any>, retailer?: MapRetailer) => Promise<string>;
    processImage: (imgUrl: string, map_obj: Record<string, any>, afterOnload: (geometry: PlaneGeometry, material: MeshBasicMaterial) => void) => void;
    getImageLogo: (allIndexedMapObjects: Record<string, MapObjData>, allIndexedRetailers: Record<string, any>, map_obj: Record<string, any>, mesh: BufferGeometry, object_id: string, new_object_id: string | null, mesh_center_point: Vector3, mesh_size: Vector3, floors: any, handleAsync: (meshLogo: {
        storeLogo: Object3D;
    }) => void) => void;
    get_store_name_logo_geometry: (geometry: BufferGeometry, object_id: string, floor_index: number, textLogoNamePrefix: string, myFont: any, handleAsync: (meshLogo: any) => void) => {
        textMesh: IExtMesh;
    } | null | false;
};
export default useDrawLogoHelper;
