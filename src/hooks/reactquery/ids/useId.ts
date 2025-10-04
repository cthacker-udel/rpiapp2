/**
 * @file Utility hook for fetching all available raspberry pi ids from the public facing API.
 */

/* eslint-disable tsdoc/syntax -- disabled */
/* eslint-disable barrel-files/avoid-importing-barrel-files -- disabled */
/* eslint-disable no-mixed-operators -- disabled */
/* eslint-disable require-await -- disabled */
import {
    type QueryObserverResult,
    useQuery,
    type UseQueryResult,
} from "@tanstack/react-query";
import { isNullish } from "radashi";

import type { ApiResponse } from "../../../@types/api/ApiResponse";
import type { Id } from "../../../@types/api/id/Id";
import { ClientSideApi } from "../../../common/api/ClientSideApi";

type CallbackType = () => QueryObserverResult<Id[]>;

/**
 * Fetches the Raspberry Pi ids from the database.
 * @returns - The found raspberry pi ids.
 * @example
 * ```ts
 * ```
 */
const fetchPiIds = async (): Promise<Id[]> => {
    try {
        const allPiIds =
            await ClientSideApi.get<ApiResponse<{ ids: Id[] }>>("pi_ids");

        const { data: piIds } = allPiIds;

        if (isNullish(piIds)) {
            return [];
        }

        const { ids } = piIds;

        return ids;
    } catch {
        return [];
    }
};

/**
 * Utility hook for fetching ids of all Raspberry Pis present in the database.
 * @returns - The ids of the all the raspberry pis.
 * @example
 * ```ts
 * ```
 */
const useId: CallbackType = (): UseQueryResult<Id[]> =>
    useQuery<Id[], Error, Id[], string[]>({
        /**
         * Query function to fetch the ids of the existing raspberry pis.
         * @returns The found raspberry pi `ids`.
         * @example
         * ```ts
         * ```
         */
        queryFn: async () => fetchPiIds(),
        queryKey: ["pi_ids"],
        retry: 3,
        /**
         * Calculates the delay for the x-th fetch request.
         * @param attempt - The fetch attempt #.
         * @returns The calculated fetch delay to apply based on the fetch attempt #.
         * @example
         * ```ts
         * ```
         */
        retryDelay: (attempt) =>
            Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30_000),
        staleTime: 30_000,
    });

export { useId };
