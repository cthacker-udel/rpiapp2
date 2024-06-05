/* eslint-disable no-mixed-operators -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */
/* eslint-disable require-await -- disabled */

import {
    type UndefinedInitialDataOptions,
    useQuery,
    type UseQueryResult,
} from "@tanstack/react-query";

import type { Id } from "@/@types/api/id/Id";
import type { Temperature } from "@/@types/api/temperature/Temperature";
import { ClientSideApi } from "@/api/client/ClientSideApi";
import { ServerEndpoints } from "@/api/constants/ServerEndpoints";

type UseTemperatureParameters = {
    selectedId?: Id;
};

type UseTemperatureHookParameters = Partial<UndefinedInitialDataOptions> &
    UseTemperatureParameters;

/**
 * Gets all the temperature data from the database with respect to the pi id passed in
 *
 * @param selectedId - The pi id selected by the user
 * @returns The found temperature data belonging to the pi selected
 */
const getAllTemperatureData = async ({
    selectedId,
}: UseTemperatureParameters): Promise<Temperature[]> => {
    try {
        if (selectedId === undefined) {
            return [];
        }

        const response = await ClientSideApi.get<Temperature[]>(
            `${ServerEndpoints.TEMPERATURE.BASE}?pi_id=${encodeURIComponent(selectedId.pi_id)}`,
        );

        return response;
    } catch {
        return [];
    }
};

/**
 * Utility hook fro fetching the temperature data from the database
 *
 * @param _parameters - The hook parameters (use query options) that the user can specify when calling this hook
 * @returns The found temperature data
 */
export const useTemperature = (
    _parameters?: UseTemperatureHookParameters,
): UseQueryResult<Temperature[]> =>
    useQuery<Temperature[], Error, Temperature[], string[]>({
        enabled: _parameters?.selectedId !== undefined,
        placeholderData: [],
        queryFn: async () =>
            getAllTemperatureData({ selectedId: _parameters?.selectedId }),
        queryKey: ["temperature_data", JSON.stringify(_parameters?.selectedId)],
        retry: 3,
        retryDelay: (attempt) =>
            Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30_000),
    });
