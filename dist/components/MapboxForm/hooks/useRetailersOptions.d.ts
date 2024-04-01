export type RetailerOption = {
    value: number;
    label: string;
    isDisabled?: boolean;
    isFixed?: boolean;
};
type UseRetailersOptions = (centerId: string, apiURI: string) => {
    isLoading: boolean;
    loadOptions: (inputValue: string, callback: (options: any[]) => void) => void;
    retailers: RetailerOption[];
    nextPage: () => void;
};
declare const useRetailersOptions: UseRetailersOptions;
export default useRetailersOptions;
