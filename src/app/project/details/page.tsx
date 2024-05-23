import type { Metadata } from "next";
import React from "react";

import type { PageProperties } from "@/@types/next";
import { metadataConstants } from "@/common/constants/components/metadataConstants";
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

const metadata: Metadata = {
    ...metadataConstants,
    description: "Details of the Paver Project, FAQ and Contributions",
    title: "Paver Project - Details",
};

export { metadata };

export default Page;
