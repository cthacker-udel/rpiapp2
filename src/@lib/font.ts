/* eslint-disable new-cap -- disabled */

import {
    Bebas_Neue,
    JetBrains_Mono,
    Poppins,
    Quicksand,
    Source_Code_Pro,
} from "next/font/google";

const jetBrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--jetbrains",
});
const quickSand = Quicksand({ subsets: ["latin"], variable: "--quicksand" });

const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    variable: "--bebas_neue",
    weight: "400",
});

const poppins = Poppins({
    display: "auto",
    subsets: ["latin"],
    variable: "--poppins",
    weight: ["400", "700", "800"],
});

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    variable: "--source_code_pro",
    weight: "400",
});

export { bebasNeue, jetBrains, poppins, quickSand, sourceCodePro };
