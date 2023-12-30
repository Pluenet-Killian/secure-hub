"use client"

import { PropsWithChildren, useMemo } from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

export const QueryProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useMemo(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchOnMount: false,
                    refetchOnReconnect: false,
                    retry: 1,
                    staleTime: 5 * 60 * 1000,
                }
            }
        })
    },  [])
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

