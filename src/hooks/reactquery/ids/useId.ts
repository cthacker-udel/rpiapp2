/* eslint-disable require-await -- disabled */
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { Id } from "@/@types/api/id/Id";
import { ClientSideApi } from "@/api/client/ClientSideApi";
import { ServerEndpoints } from "@/api/constants/ServerEndpoints";

/**
 *
 * @returns
 */
const fetchPiIds = async (): Promise<Id[]> => {
    const response = await ClientSideApi.get<Id[]>(
        `${ServerEndpoints.PI.BASE}`,
    );

    return response;
};

/**
 *
 * @returns
 */
const useId = (): UseQueryResult<Id[]> =>
    useQuery({
        queryFn: async () => fetchPiIds(),
        queryKey: ["pi_ids"],
        staleTime: 30_000,
    });

export { useId };
