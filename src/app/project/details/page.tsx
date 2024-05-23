import React from "react";

import type { PageProperties } from "@/@types/next";
import { Details } from "@/modules/Details/Details";

/**
 *
 * @param param0
 * @returns
 */
const Page = ({
    params: _parameters,
    searchParams: _searchParameters,
}: PageProperties): JSX.Element => <Details />;

export default Page;
