import type { Metadata } from "next";
import React from "react";

import type { PageProperties } from "@/@types/next";
import { metadataConstants } from "@/common/constants/components/metadataConstants";
import { Dashboard } from "@/modules/Dashboard/Dashboard";

/**
 * The /project page
 *
 * @param _parameters - Parameters passed into the page via [] notation in paths
 * @param _searchParameters - Parameters passed into the page via query string (searching)
 * @returns The /project page
 */
const Page = ({
    params: _parameters,
    searchParams: _searchParameters,
}: PageProperties): React.JSX.Element => <Dashboard />;

const metadata: Metadata = {
    ...metadataConstants,
    description:
        "Main project page for Paver Project, displaying temperature data",
    title: "Paver Project - Dashboard",
};

export { metadata };

export default Page;
