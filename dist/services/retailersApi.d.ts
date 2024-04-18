import { IRetailer } from './../interfaces/mapitApiTypes';
export declare const retailersApi: import("@reduxjs/toolkit/query/react").Api<import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, {
    getRetailers: import("@reduxjs/toolkit/query/react").QueryDefinition<{
        baseQuery: string;
        center_id: number;
        limit: number;
        page?: number | undefined;
    }, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, {
        count: number;
        items: IRetailer[];
    }, "retailersApi">;
}, "retailersApi", never, typeof import("@reduxjs/toolkit/query/react").coreModuleName | typeof import("@reduxjs/toolkit/query/react").reactHooksModuleName>;
export declare const useGetRetailersQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<{
    baseQuery: string;
    center_id: number;
    limit: number;
    page?: number | undefined;
}, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, {
    count: number;
    items: IRetailer[];
}, "retailersApi">>, useLazyGetRetailersQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseLazyQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<{
    baseQuery: string;
    center_id: number;
    limit: number;
    page?: number | undefined;
}, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, {
    count: number;
    items: IRetailer[];
}, "retailersApi">>;
