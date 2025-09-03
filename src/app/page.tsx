import type { Metadata } from "next";
import React from "react";

import type { PageProperties } from "@/@types/next";
import { metadataConstants } from "@/common/constants/components/metadataConstants";
import { Landing } from "@/modules/Landing/Landing";

/**
 * The landing page, the root page
 *
 * @param _parameters - Parameters passed into the page via [] notation in paths
 * @param _searchParameters - Parameters passed into the page via query string (searching)
 * @returns The Landing page
 */
const Page = ({
    params: _parameters,
    searchParams: _searchParameters,
}: PageProperties): React.JSX.Element => <Landing />;

const metadata: Metadata = {
    ...metadataConstants,
    description:
        "Landing page for the raspberry pi project, which displays all the temperatures of concrete pavers around campus.",
    title: "Paver Project",
};

export { metadata };

export default Page;
