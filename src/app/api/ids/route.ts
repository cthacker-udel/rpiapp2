import "server-only";

import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/@lib/prismaClient";
import type { Id } from "@/@types/api/id/Id";
import { xorString } from "@/common/helpers/components/xorString";

/**
 * Fetches all temperatures from the database
 *
 * @param request - The client request
 * @returns All the ids of the Pis available
 */
const getAllPiIds = async (
    _request: NextRequest,
): Promise<NextResponse<Id[]>> => {
    const fetchedPiIds = await prisma.ids.findMany();

    const mappedPiIds = fetchedPiIds.map((eachPiId) => ({
        ...eachPiId,
        id: eachPiId.id.toString(),
        pi_id: xorString(eachPiId.pi_id ?? "", process.env.ID_XOR_KEY ?? ""),
    }));

    return NextResponse.json(mappedPiIds as Id[]);
};

export { getAllPiIds as GET };
