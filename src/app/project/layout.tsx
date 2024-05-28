import React from "react";

import { Topbar } from "@/modules/Topbar/Topbar";

/**
 * The /project layout, the "wrapper" that encompasses every page rendered under the /project dir
 *
 * @param children - The components that this layout "wraps"
 * @returns The /project layout component
 */
const Layout = ({ children }: React.PropsWithChildren): JSX.Element => (
    <div className="h-full w-full flex flex-col">
        <Topbar />
        {children}
    </div>
);

export default Layout;
