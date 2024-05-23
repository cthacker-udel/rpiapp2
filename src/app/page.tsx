import type { Metadata } from "next";
import React from "react";

import type { PageProperties } from "@/@types/next";
import { metadataConstants } from "@/common/constants/components/metadataConstants";
import { Landing } from "@/modules/Landing/Landing";

/**
 *
 * @param param0
 * @returns
 */
const Page = ({
    params: _parameters,
    searchParams: _searchParameters,
}: PageProperties): JSX.Element => <Landing />;

const metadata: Metadata = {
    ...metadataConstants,
    description:
        "Landing page for the raspberry pi project, which displays all the temperatures of concrete pavers around campus.",
    title: "Paver Project",
};

export { metadata };

export default Page;
