import React from "react";

import { Topbar } from "@/modules/Topbar/Topbar";

/**
 * The /project layout, the "wrapper" that encompasses every page rendered under the /project dir
 *
 * @param children - The components that this layout "wraps"
 * @returns The /project layout component
 */
const Layout = ({ children }: React.PropsWithChildren): React.JSX.Element => (
    <div className="flex flex-col w-full h-full">
        <Topbar />
        {children}
    </div>
);

export default Layout;
