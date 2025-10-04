/**
 * @file The QueryProvider, which is a wrapper component that injects the queryClient into all children, allowing for all children to call the entire suite of react-query hooks.
 */

/* eslint-disable tsdoc/syntax -- disabled */
/* eslint-disable react/hook-use-state -- disabled */

"use client";
// eslint-disable-next-line barrel-files/avoid-importing-barrel-files -- disabled, barrel file is in library, not user-made, so cannot essentially re-factor
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type ReactNode } from "react";

/**
 * The properties of the QueryProvider component.
 */
type QueryProviderProperties = {
    /**
     * The element being "wrapped" by the provider.
     */
    readonly children: ReactNode;
};

/**
 * The provider for the Query implementation.
 * @param properties - The properties of the QueryProvider component.
 * @param properties.children - The element being "wrapped" by the provider.
 * @returns The provider with the passed down `queryClient` value.
 */
export const QueryProvider = ({
    children,
}: QueryProviderProperties): React.JSX.Element => {
    const [queryClient, _setQueryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
