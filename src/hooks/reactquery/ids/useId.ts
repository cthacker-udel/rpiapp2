/* eslint-disable no-mixed-operators -- disabled */
/* eslint-disable require-await -- disabled */
import {
    type QueryObserverResult,
    useQuery,
    type UseQueryResult,
} from "@tanstack/react-query";

import type { Id } from "@/@types/api/id/Id";
import { ClientSideApi } from "@/api/client/ClientSideApi";
import { ServerEndpoints } from "@/api/constants/ServerEndpoints";

type CallbackType = () => QueryObserverResult<Id[]>;

/**
 * Fetches the Raspberry Pi ids from the database
 *
 * @returns - The found raspberry pi ids
 */
const fetchPiIds = async (): Promise<Id[]> => {
    try {
        const response = await ClientSideApi.get<Id[]>(
            `${ServerEndpoints.PI.BASE}`,
        );

        return response;
    } catch {
        return [];
    }
};

/**
 * Utility hook for fetching ids of all Raspberry Pis present in the database
 *
 * @returns - The ids of the all the raspberry pis
 */
const useId: CallbackType = (): UseQueryResult<Id[]> =>
    useQuery<Id[], Error, Id[], string[]>({
        queryFn: async () => fetchPiIds(),
        queryKey: ["pi_ids"],
        retry: 3,
        retryDelay: (attempt) =>
            Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30_000),
        staleTime: 30_000,
    });

export { useId };
