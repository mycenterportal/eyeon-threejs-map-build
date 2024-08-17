import { IRetailer } from 'src/mapitApiTypes';
export declare const retailersApi: import("@reduxjs/toolkit/query").Api<import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, {
    getRetailers: import("@reduxjs/toolkit/query").QueryDefinition<{
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
        count: number;
        items: IRetailer[];
    }, "retailersApi">;
}, "retailersApi", never, typeof import("@reduxjs/toolkit/query").coreModuleName | typeof import("@reduxjs/toolkit/query/react").reactHooksModuleName>;
export declare const useGetRetailersQuery: <R extends Record<string, any> = ({
    error?: undefined;
    data?: undefined;
    fulfilledTimeStamp?: undefined;
    originalArgs?: undefined;
    requestId?: undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus.uninitialized;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isLoading: false;
    isFetching: false;
    isSuccess: false;
    isError: false;
    isUninitialized: true;
} | {
    error?: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError | undefined;
    fulfilledTimeStamp?: number | undefined;
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isUninitialized: false;
    isSuccess: false;
    isError: false;
    isLoading: true;
    isFetching: boolean;
    data: undefined;
} | {
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isUninitialized: false;
    isLoading: false;
    isError: false;
    isSuccess: true;
    isFetching: true;
    error: undefined;
    data: {
        count: number;
        items: IRetailer[];
    };
    fulfilledTimeStamp: number;
} | {
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    isUninitialized: false;
    isLoading: false;
    isError: false;
    isSuccess: true;
    isFetching: false;
    error: undefined;
    data: {
        count: number;
        items: IRetailer[];
    };
    fulfilledTimeStamp: number;
    currentData: {
        count: number;
        items: IRetailer[];
    };
} | {
    data?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    fulfilledTimeStamp?: number | undefined;
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isUninitialized: false;
    isLoading: false;
    isFetching: false;
    isSuccess: false;
    isError: true;
    error: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError;
}) & {
    status: import("@reduxjs/toolkit/query").QueryStatus;
}>(arg: {
    baseQuery: string;
    center_id: string;
    limit: number;
    page?: number | undefined;
} | typeof import("@reduxjs/toolkit/query").skipToken, options?: (import("@reduxjs/toolkit/query").SubscriptionOptions & {
    skip?: boolean | undefined;
    refetchOnMountOrArgChange?: number | boolean | undefined;
} & {
    skip?: boolean | undefined;
    selectFromResult?: ((state: ({
        error?: undefined;
        data?: undefined;
        fulfilledTimeStamp?: undefined;
        originalArgs?: undefined;
        requestId?: undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus.uninitialized;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isLoading: false;
        isFetching: false;
        isSuccess: false;
        isError: false;
        isUninitialized: true;
    } | {
        error?: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError | undefined;
        fulfilledTimeStamp?: number | undefined;
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isUninitialized: false;
        isSuccess: false;
        isError: false;
        isLoading: true;
        isFetching: boolean;
        data: undefined;
    } | {
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isUninitialized: false;
        isLoading: false;
        isError: false;
        isSuccess: true;
        isFetching: true;
        error: undefined;
        data: {
            count: number;
            items: IRetailer[];
        };
        fulfilledTimeStamp: number;
    } | {
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        isUninitialized: false;
        isLoading: false;
        isError: false;
        isSuccess: true;
        isFetching: false;
        error: undefined;
        data: {
            count: number;
            items: IRetailer[];
        };
        fulfilledTimeStamp: number;
        currentData: {
            count: number;
            items: IRetailer[];
        };
    } | {
        data?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        fulfilledTimeStamp?: number | undefined;
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isUninitialized: false;
        isLoading: false;
        isFetching: false;
        isSuccess: false;
        isError: true;
        error: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError;
    }) & {
        status: import("@reduxjs/toolkit/query").QueryStatus;
    }) => R) | undefined;
}) | undefined) => [R][R extends any ? 0 : never] & {
    refetch: () => import("@reduxjs/toolkit/query").QueryActionCreatorResult<import("@reduxjs/toolkit/query").QueryDefinition<{
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
        count: number;
        items: IRetailer[];
    }, "retailersApi">>;
}, useLazyGetRetailersQuery: <R extends Record<string, any> = ({
    error?: undefined;
    data?: undefined;
    fulfilledTimeStamp?: undefined;
    originalArgs?: undefined;
    requestId?: undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus.uninitialized;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isLoading: false;
    isFetching: false;
    isSuccess: false;
    isError: false;
    isUninitialized: true;
} | {
    error?: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError | undefined;
    fulfilledTimeStamp?: number | undefined;
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isUninitialized: false;
    isSuccess: false;
    isError: false;
    isLoading: true;
    isFetching: boolean;
    data: undefined;
} | {
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isUninitialized: false;
    isLoading: false;
    isError: false;
    isSuccess: true;
    isFetching: true;
    error: undefined;
    data: {
        count: number;
        items: IRetailer[];
    };
    fulfilledTimeStamp: number;
} | {
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    isUninitialized: false;
    isLoading: false;
    isError: false;
    isSuccess: true;
    isFetching: false;
    error: undefined;
    data: {
        count: number;
        items: IRetailer[];
    };
    fulfilledTimeStamp: number;
    currentData: {
        count: number;
        items: IRetailer[];
    };
} | {
    data?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    fulfilledTimeStamp?: number | undefined;
    originalArgs?: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    } | undefined;
    requestId?: string | undefined;
    endpointName?: string | undefined;
    startedTimeStamp?: number | undefined;
    status: import("@reduxjs/toolkit/query").QueryStatus;
    currentData?: {
        count: number;
        items: IRetailer[];
    } | undefined;
    isUninitialized: false;
    isLoading: false;
    isFetching: false;
    isSuccess: false;
    isError: true;
    error: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError;
}) & {
    status: import("@reduxjs/toolkit/query").QueryStatus;
}>(options?: (import("@reduxjs/toolkit/query").SubscriptionOptions & Omit<{
    skip?: boolean | undefined;
    selectFromResult?: ((state: ({
        error?: undefined;
        data?: undefined;
        fulfilledTimeStamp?: undefined;
        originalArgs?: undefined;
        requestId?: undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus.uninitialized;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isLoading: false;
        isFetching: false;
        isSuccess: false;
        isError: false;
        isUninitialized: true;
    } | {
        error?: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError | undefined;
        fulfilledTimeStamp?: number | undefined;
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isUninitialized: false;
        isSuccess: false;
        isError: false;
        isLoading: true;
        isFetching: boolean;
        data: undefined;
    } | {
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isUninitialized: false;
        isLoading: false;
        isError: false;
        isSuccess: true;
        isFetching: true;
        error: undefined;
        data: {
            count: number;
            items: IRetailer[];
        };
        fulfilledTimeStamp: number;
    } | {
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        isUninitialized: false;
        isLoading: false;
        isError: false;
        isSuccess: true;
        isFetching: false;
        error: undefined;
        data: {
            count: number;
            items: IRetailer[];
        };
        fulfilledTimeStamp: number;
        currentData: {
            count: number;
            items: IRetailer[];
        };
    } | {
        data?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        fulfilledTimeStamp?: number | undefined;
        originalArgs?: {
            baseQuery: string;
            center_id: string;
            limit: number;
            page?: number | undefined;
        } | undefined;
        requestId?: string | undefined;
        endpointName?: string | undefined;
        startedTimeStamp?: number | undefined;
        status: import("@reduxjs/toolkit/query").QueryStatus;
        currentData?: {
            count: number;
            items: IRetailer[];
        } | undefined;
        isUninitialized: false;
        isLoading: false;
        isFetching: false;
        isSuccess: false;
        isError: true;
        error: import("@reduxjs/toolkit/query").FetchBaseQueryError | import("@reduxjs/toolkit").SerializedError;
    }) & {
        status: import("@reduxjs/toolkit/query").QueryStatus;
    }) => R) | undefined;
}, "skip">) | undefined) => [(arg: {
    baseQuery: string;
    center_id: string;
    limit: number;
    page?: number | undefined;
}, preferCacheValue?: boolean | undefined) => import("@reduxjs/toolkit/query").QueryActionCreatorResult<import("@reduxjs/toolkit/query").QueryDefinition<{
    baseQuery: string;
    center_id: string;
    limit: number;
    page?: number | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
    count: number;
    items: IRetailer[];
}, "retailersApi">>, [R][R extends any ? 0 : never], {
    lastArg: {
        baseQuery: string;
        center_id: string;
        limit: number;
        page?: number | undefined;
    };
}];
