import "server-only";

/* eslint-disable require-await -- disabled  */
/* eslint-disable @typescript-eslint/require-await -- disabled */
import { type NextRequest, NextResponse } from "next/server";

/**
 *
 * @param _request
 * @returns
 */
const healthCheck = async (
    _request: NextRequest,
): Promise<NextResponse<string>> =>
    NextResponse.json("Looks fine!", { status: 200 });

export { healthCheck as GET };
