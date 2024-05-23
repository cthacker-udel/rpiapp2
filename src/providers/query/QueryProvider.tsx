/* eslint-disable react/hook-use-state -- disabled */

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type ReactNode } from "react";

/**
 * The properties of the QueryProvider component
 */
type QueryProviderProperties = {
    /**
     * The element being "wrapped" by the provider
     */
    readonly children: ReactNode;
};

/**
 * The provider for the Query implementation
 *
 * @param children - The element being "wrapped" by the provider
 * @returns The provider with the passed down `queryClient` value
 */
export const QueryProvider = ({
    children,
}: QueryProviderProperties): JSX.Element => {
    const [queryClient] = React.useState(
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
