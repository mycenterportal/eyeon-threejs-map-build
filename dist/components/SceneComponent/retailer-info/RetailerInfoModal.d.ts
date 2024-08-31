type RetailerInfoModalProps = {
    amenity: string;
    show: boolean;
    onHide: () => void;
    mapObjectName?: string;
    onClickMapObj: (id: string, amenityType?: string) => void;
    kioskId: number;
    allSvgObjectIds: Set<string>;
};
declare const RetailerInfoModal: ({ amenity, show, onHide, mapObjectName, onClickMapObj, kioskId, allSvgObjectIds }: RetailerInfoModalProps) => import("react/jsx-runtime").JSX.Element;
export default RetailerInfoModal;
