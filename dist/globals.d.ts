/// <reference types="ngraph.graph" />
/// <reference types="ngraph.events" />
import type { Mesh } from "three";
import path from "ngraph.path";
export declare const meshByObjectId: Map<string, Mesh<import("three").BufferGeometry<import("three").NormalBufferAttributes>, import("three").Material | import("three").Material[]>>;
export declare const allMapObjects: string[];
export declare const allNodesFloor: Record<string, number>;
export declare const pathFinderGraph: import("ngraph.graph").Graph<any, any> & import("ngraph.events").EventedType;
export declare const ngraphPath: typeof path;
