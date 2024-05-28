import "server-only";

/* eslint-disable require-await -- disabled  */
/* eslint-disable @typescript-eslint/require-await -- disabled */
import { type NextRequest, NextResponse } from "next/server";

/**
 * Returns the status of the api, 200 if it is online
 *
 * @param _request - The client request
 * @returns The status of the API
 */
const healthCheck = async (
    _request: NextRequest,
): Promise<NextResponse<string>> =>
    NextResponse.json("Looks fine!", { status: 200 });

export { healthCheck as GET };
