import { Mesh } from 'three';
export declare const meshByObjectId: Map<string, Mesh<import('three').BufferGeometry<import('three').NormalBufferAttributes, import('three').BufferGeometryEventMap>, import('three').Material | import('three').Material[], import('three').Object3DEventMap>>;
export declare const allMapObjects: string[];
export declare const allNodesFloor: Record<string, number>;
export declare const pathFinderGraph: import('ngraph.graph').Graph<any, any> & import('ngraph.events').EventedType;
export declare const ngraphPath: {
    aStar: typeof import('ngraph.path').aStar;
    aGreedy: typeof import('ngraph.path').aGreedy;
    nba: typeof import('ngraph.path').nba;
};
