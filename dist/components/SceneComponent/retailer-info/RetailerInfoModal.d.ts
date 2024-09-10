type RetailerInfoModalProps = {
    show: boolean;
    onHide: () => void;
    amenity: string;
    selectedAmenityMapObjName: string;
    mapObjectName?: string;
    onClickMapObj: (id: string, amenityType?: string) => void;
    allSvgObjectIds: Set<string>;
};
declare const RetailerInfoModal: ({ show, onHide, amenity, selectedAmenityMapObjName, mapObjectName, onClickMapObj, allSvgObjectIds }: RetailerInfoModalProps) => import("react/jsx-runtime").JSX.Element;
export default RetailerInfoModal;
