/* eslint-disable node/no-unpublished-import -- disabled */
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import {
    bebasNeue,
    jetBrains,
    poppins,
    quickSand,
    sourceCodePro,
} from "@/@lib/font";
import { ThemeProvider } from "@/@lib/themeProviderClient";
import { QueryProvider } from "@/providers/query/QueryProvider";

/**
 * The root layout, the "wrapper" that encompasses every page rendered in the project
 *
 * @param children - The components that this layout "wraps"
 * @returns The root layout component
 */
const RootLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element => (
    <html lang="en">
        <body
            className={`${jetBrains.variable} ${quickSand.variable} ${bebasNeue.variable} ${jetBrains.variable} ${poppins.className} ${poppins.variable} ${sourceCodePro.variable} relative h-screen w-screen`}
        >
            <ThemeProvider>
                <QueryProvider>{children}</QueryProvider>
            </ThemeProvider>
        </body>
    </html>
);

export default RootLayout;
