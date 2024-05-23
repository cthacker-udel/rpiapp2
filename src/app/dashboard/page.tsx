import React from "react";

import type { PageProperties } from "@/@types/next";
import { Dashboard } from "@/modules/Dashboard/Dashboard";

/**
 *
 * @param param0
 * @returns
 */
const Page = ({
    params: _parameters,
    searchParams: _searchParameters,
}: PageProperties): JSX.Element => <Dashboard />;

export default Page;
