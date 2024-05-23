/* eslint-disable require-await -- disabled */

import {
    type UndefinedInitialDataOptions,
    useQuery,
    type UseQueryResult,
} from "@tanstack/react-query";

import type { Temperature } from "@/@types/api/temperature/Temperature";
import { ClientSideApi } from "@/api/client/ClientSideApi";
import { ServerEndpoints } from "@/api/constants/ServerEndpoints";

type UseTemperatureHookParameters = Partial<UndefinedInitialDataOptions>;

/**
 *
 * @returns
 */
const getAllTemperatureData = async (): Promise<Temperature[]> => {
    const response = await ClientSideApi.get<Temperature[]>(
        `${ServerEndpoints.TEMPERATURE.BASE}`,
    );

    return response;
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
        queryFn: async () => getAllTemperatureData(),
        queryKey: ["temperature_data"],
    });
