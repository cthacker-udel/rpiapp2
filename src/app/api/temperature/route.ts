import "server-only";

import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/@lib/prismaClient";
import type { Temperature } from "@/@types/api/temperature/Temperature";
import { xorString } from "@/common/helpers/components/xorString";

/**
 * Fetches all temperatures from the database
 *
 * @param request - The client request
 * @returns The found temperatures pertaining to the pi specified
 */
const getAllTemperatures = async (
    request: NextRequest,
): Promise<NextResponse<Temperature[]>> => {
    try {
        const pi_id = request.nextUrl.searchParams.get("pi_id");

        if (pi_id === null) {
            return NextResponse.json([]);
        }

        const truePiId = xorString(pi_id, process.env.ID_XOR_KEY ?? "");

        /** Check if Pi Id belongs in the database */
        await prisma.ids.findUniqueOrThrow({
            where: { pi_id: truePiId },
        });

        const fetchedTemperatures = await prisma.temperatures.findMany({
            select: {
                celsius: true,
                fahrenheit: true,
                id: false,
                kelvin: true,
                pi_id: false,
                temperature_timestamp: true,
            },
            where: {
                pi_id: truePiId,
            },
        });

        return NextResponse.json(fetchedTemperatures as Temperature[]);
    } catch (error) {
        if (isDynamicServerError(error)) {
            throw error;
        }

        return NextResponse.json([] as Temperature[]);
    }
};

export { getAllTemperatures as GET };
