"use client";
import dayjs from "dayjs";
import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useTemperature } from "@/hooks/reactquery/temperature/useTemperature";

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

    const formatDate = React.useCallback(
        (date: Date): string => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    const tooltipFormatter = React.useCallback(
        (date: Date) => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    if (isLoading || isFetching || status !== "success") {
        return <span />;
    }

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
            <LineChart data={temperatureData} height={750} width={1500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="temperature_timestamp"
                    tickFormatter={formatDate}
                />
                <YAxis
                    label={{
                        angle: -90,
                        offset: 0,
                        position: "left",
                        value: "Temperature",
                    }}
                />
                <Tooltip labelFormatter={tooltipFormatter} />
                <Legend />
                <Line dataKey="fahrenheit" stroke="#8884d8" type="monotone" />
                <Line dataKey="celsius" stroke="#c9264e" type="monotone" />
                <Line dataKey="kelvin" stroke="#82ca9d" type="monotone" />
            </LineChart>
        </div>
    );
};
