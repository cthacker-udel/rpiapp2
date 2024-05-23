import "./globals.css";

import Script from "next/script";
import React from "react";
import "tailwindcss/tailwind.css";

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
 *
 * @param param0
 * @returns
 */
const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element => (
    <html lang="en">
        <head>
            <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" />
        </head>
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
