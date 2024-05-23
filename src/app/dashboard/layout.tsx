import { Topbar } from "@/modules/Topbar/Topbar";
import React from "react";

/**
 *
 * @param param0
 * @returns
 */
const Layout = ({ children }: React.PropsWithChildren): JSX.Element => (
    <div className="h-full w-full flex flex-col">
        <Topbar />
        {children}
    </div>
);

export default Layout;
