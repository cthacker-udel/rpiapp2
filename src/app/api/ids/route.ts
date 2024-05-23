import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/@lib/prismaClient";
import type { Id } from "@/@types/api/id/Id";

/**
 * Fetches all temperatures from the database
 *
 * @param request - The client request
 * @returns
 */
const getAllPiIds = async (
    _request: NextRequest,
): Promise<NextResponse<Id[]>> => {
    const fetchedPiIds = await prisma.ids.findMany();

    return NextResponse.json(fetchedPiIds as Id[]);
};

export { getAllPiIds as GET };
