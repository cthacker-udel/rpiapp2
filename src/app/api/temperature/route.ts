import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/@lib/prismaClient";
import type { Temperature } from "@/@types/api/temperature/Temperature";

/**
 * Fetches all temperatures from the database
 *
 * @param request - The client request
 * @returns
 */
const getAllTemperatures = async (
    _request: NextRequest,
): Promise<NextResponse<Temperature[]>> => {
    const fetchedTemperatures = await prisma.temperatures.findMany({
        select: {
            celsius: true,
            fahrenheit: true,
            id: false,
            kelvin: true,
            pi_id: false,
            temperature_timestamp: true,
        },
    });

    return NextResponse.json(fetchedTemperatures as Temperature[]);
};

export { getAllTemperatures as GET };
