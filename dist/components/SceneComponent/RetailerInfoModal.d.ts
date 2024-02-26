import { IRetailer, MapObj } from "src/mapitApiTypes";
type RetailerInfoModalProps = {
    amenity: string;
    show: boolean;
    onHide: () => void;
    centerId: string;
    retailers?: IRetailer[];
    mapObjs?: MapObj[];
    mapObjectName?: string;
    webApiURI: string;
    onClick?: (id: string, amenityType?: string) => void;
    kioskId: string;
};
declare const RetailerInfoModal: (props: RetailerInfoModalProps) => import("react/jsx-runtime").JSX.Element;
export default RetailerInfoModal;
