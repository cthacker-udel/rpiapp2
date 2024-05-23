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
 *
 * @returns
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
 *
 * @param _params
 * @returns
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
    });
