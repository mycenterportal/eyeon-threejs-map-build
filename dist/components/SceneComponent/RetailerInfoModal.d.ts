import { IRetailer, MapObj } from "src/interfaces/mapitApiTypes";
type RetailerInfoModalProps = {
    amenity: string;
    show: boolean;
    onHide: () => void;
    centerId: number;
    kioskId: number;
    retailers?: IRetailer[];
    mapObjs?: MapObj[];
    mapObjectName?: string;
    webApiURI: string;
    onClick?: (id: string, amenityType?: string) => void;
};
declare const RetailerInfoModal: (props: RetailerInfoModalProps) => import("react/jsx-runtime").JSX.Element;
export default RetailerInfoModal;
