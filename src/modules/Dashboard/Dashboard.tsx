"use client";
import { useTemperature } from "@/hooks/reactquery/temperature/useTemperature";
import React from "react";

/**
 *
 * @returns s
 */
export const Dashboard = (): JSX.Element => {
    const {
        data: temperatureData,
        isLoading,
        isFetching,
        status,
    } = useTemperature();

    if (isLoading || isFetching || status !== "success") {
        return <span />;
    }

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
            {"Hello"}
        </div>
    );
};
