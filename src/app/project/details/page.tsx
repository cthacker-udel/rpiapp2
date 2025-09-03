import type { Metadata } from "next";
import React from "react";

import type { PageProperties } from "@/@types/next";
import { metadataConstants } from "@/common/constants/components/metadataConstants";
import { Details } from "@/modules/Details/Details";

/**
 * The /project/details page
 *
 * @param _parameters - Parameters passed into the page via [] notation in paths
 * @param _searchParameters - Parameters passed into the page via query string (searching)
 * @returns The /project/details page
 */
const Page = ({
    params: _parameters,
    searchParams: _searchParameters,
}: PageProperties): React.JSX.Element => <Details />;

const metadata: Metadata = {
    ...metadataConstants,
    description: "Details of the Paver Project, FAQ and Contributions",
    title: "Paver Project - Details",
};

export { metadata };

export default Page;
