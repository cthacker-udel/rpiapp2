/* eslint-disable react/self-closing-comp -- disabled, needed for css */
import "./LdsLoader.css";

import React from "react";

/**
 * https://loading.io/css/
 * LDS Loader
 *
 * @returns Loader
 */
export const LdsLoader = (): JSX.Element => (
    <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
