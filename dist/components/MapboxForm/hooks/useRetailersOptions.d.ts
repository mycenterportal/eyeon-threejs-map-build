export type RetailerOption = {
    value: number;
    label: string;
    isDisabled?: boolean;
    isFixed?: boolean;
};
type UseRetailersOptions = (centerId: number, apiURI: string) => {
    isLoading: boolean;
    loadOptions: (inputValue: string, callback: (options: RetailerOption[]) => void) => void;
    retailers: RetailerOption[];
};
declare const useRetailersOptions: UseRetailersOptions;
export default useRetailersOptions;
