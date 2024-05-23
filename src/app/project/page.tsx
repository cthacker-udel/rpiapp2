import type { Metadata } from "next";
import React from "react";

import type { PageProperties } from "@/@types/next";
import { metadataConstants } from "@/common/constants/components/metadataConstants";
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

const metadata: Metadata = {
    ...metadataConstants,
    description:
        "Main project page for Paver Project, displaying temperature data",
    title: "Paver Project - Dashboard",
};

export { metadata };

export default Page;
