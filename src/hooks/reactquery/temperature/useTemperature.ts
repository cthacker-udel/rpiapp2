/**
 * @file Utility hook for fetching the respective temperature data from the public API.
 */

/* eslint-disable tsdoc/syntax -- disabled */
/* eslint-disable barrel-files/avoid-importing-barrel-files -- disabled */
/* eslint-disable no-mixed-operators -- disabled */
/* eslint-disable require-await -- disabled */

import {
    type UndefinedInitialDataOptions,
    useQuery,
    type UseQueryResult,
} from "@tanstack/react-query";
import { isNullish } from "radashi";

import type { ApiResponse } from "../../../@types/api/ApiResponse";
import type { Id } from "../../../@types/api/id/Id";
import type { Temperature } from "../../../@types/api/temperature/Temperature";
import { ClientSideApi } from "../../../common/api/ClientSideApi";

type UseTemperatureHookParameters = Partial<UndefinedInitialDataOptions> &
    UseTemperatureParameters;

type UseTemperatureParameters = {
    selectedId?: Id;
};

/**
 * Gets all the temperature data from the database belonging to the pi_id passed into the hook.
 * @param properties - The properties passed to the invocation of `getAllTemperatureData`.
 * @param properties.selectedId - The id of the selected raspberry pi.
 * @returns The found temperature data belonging to the pi selected.
 * @example
 * ```ts
 * ```
 */
const getAllTemperatureData = async ({
    selectedId,
}: UseTemperatureParameters): Promise<Temperature[]> => {
    try {
        if (selectedId === undefined) {
            return [];
        }

        const temperatureDataResponse = await ClientSideApi.get<
            ApiResponse<{ temperatures: Temperature[] }>
        >("temperature_data", {
            pi_id: encodeURIComponent(selectedId.pi_id ?? ""),
        });

        const { data: foundTemperatureData } = temperatureDataResponse;

        if (isNullish(foundTemperatureData)) {
            return [];
        }

        const { temperatures: parsedTemperatureData } = foundTemperatureData;

        return parsedTemperatureData;
    } catch {
        return [];
    }
};

/**
 * Utility hook fro fetching the temperature data from the database.
 * @param _parameters - The hook parameters (use query options) that the user can specify when calling this hook.
 * @returns The found temperature data.
 * @example
 * ```ts
 * ```
 */
export const useTemperature = (
    _parameters?: UseTemperatureHookParameters,
): UseQueryResult<Temperature[]> =>
    useQuery<Temperature[], Error, Temperature[], string[]>({
        enabled: _parameters?.selectedId !== undefined,
        placeholderData: [],
        /**
         * Asynchronous fetching operation for the respective raspberry pi.
         * @returns The found temperature data for the selected raspberry pi.
         * @example
         * ```ts
         * ```
         */
        queryFn: async () =>
            getAllTemperatureData({ selectedId: _parameters?.selectedId }),
        queryKey: ["temperature_data", JSON.stringify(_parameters?.selectedId)],
        retry: 3,
        /**
         * Calculates the delay to apply to the x-th fetch attempt.
         * @param attempt - The attempt # used for calculating the delay.
         * @returns The calculated delay for the fetch attempt.
         * @example
         * ```ts
         * ```
         */
        retryDelay: (attempt) =>
            Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30_000),
    });
