/// <reference types="react" />
import { IConfig, IExtMesh } from "src/types";
export type TMeshObjectContext = {
    MeshObject: IExtMesh[] | null;
    SetMeshObject: React.Dispatch<React.SetStateAction<IExtMesh[] | null>> | Function;
    cameraLength: number | undefined;
    setCameraLength: React.Dispatch<React.SetStateAction<number | undefined>> | Function;
    config: IConfig | undefined;
    setConfig: React.Dispatch<React.SetStateAction<IConfig | undefined>> | Function;
};
export default function MeshObjectContextProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useMeshObjectContext(): TMeshObjectContext;
