export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    retailersApi: import("@reduxjs/toolkit/query").CombinedState<{
        getRetailers: import("@reduxjs/toolkit/query").QueryDefinition<{
            baseQuery: string;
            center_id: number;
            limit: number;
            page?: number | undefined;
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
            count: number;
            items: import("./interfaces/mapitApiTypes").IRetailer[];
        }, "retailersApi">;
    }, never, "retailersApi">;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        retailersApi: import("@reduxjs/toolkit/query").CombinedState<{
            getRetailers: import("@reduxjs/toolkit/query").QueryDefinition<{
                baseQuery: string;
                center_id: number;
                limit: number;
                page?: number | undefined;
            }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
                count: number;
                items: import("./interfaces/mapitApiTypes").IRetailer[];
            }, "retailersApi">;
        }, never, "retailersApi">;
    }, undefined, import("redux").UnknownAction>;
}, {}>, import("redux").StoreEnhancer<{}, {}>]>>;
