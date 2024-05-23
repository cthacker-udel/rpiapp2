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

import type { Id } from "@/@types/api/id/Id";
import type { SelectedPiEvent } from "@/@types/events/selectedPi/selectedPiEvent";
import { Events } from "@/common/constants/events/Events";
import { useTemperature } from "@/hooks/reactquery/temperature/useTemperature";

import { LdsLoader } from "../Loaders/LdsLoader";

/**
 *
 * @returns s
 */
export const Dashboard = (): JSX.Element => {
    const [selectedId, setSelectedId] = React.useState<Id | undefined>(
        undefined,
    );

    const {
        data: temperatureData,
        isLoading,
        isFetching,
        status,
    } = useTemperature({ selectedId });

    const formatDate = React.useCallback(
        (date: Date): string => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    const tooltipLabelFormatter = React.useCallback(
        (date: Date) => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    const processSelectedIdEvent = React.useCallback((event: Event) => {
        const mappedEvent = event as CustomEvent<SelectedPiEvent>;

        const { detail } = mappedEvent;
        if (detail !== undefined) {
            const { id } = detail;
            setSelectedId(id);
        }
    }, []);

    const tooltipValueFormatter = React.useCallback(
        (value: number, name: string) => {
            switch (name) {
                case "kelvin": {
                    return `${value} °K`;
                }
                case "fahrenheit": {
                    return `${value} °F`;
                }
                case "celsius": {
                    return `${value} °C`;
                }
                default: {
                    return `${value}`;
                }
            }
        },
        [],
    );

    const degToString = React.useCallback((value: number) => `${value}°`, []);

    React.useEffect(() => {
        document.addEventListener(Events.SELECTED_PI, processSelectedIdEvent);

        return (): void => {
            document.removeEventListener(
                Events.SELECTED_PI,
                processSelectedIdEvent,
            );
        };
    }, [processSelectedIdEvent]);

    if (isLoading || isFetching || status !== "success") {
        return (
            <div className="flex-grow flex flex-col justify-center items-center gap-3">
                <span className="animate-pulse animate-infinite text-lg">
                    {"Loading Temperatures..."}
                </span>
                <LdsLoader />
            </div>
        );
    }

    return (
        <div className="flex-grow flex flex-col justify-center items-center relative">
            {selectedId !== undefined && (
                <div
                    className="text-xl font-bold flex flex-row justify-center"
                    style={{ width: "1500px" }}
                >
                    {selectedId.name}
                </div>
            )}
            {selectedId === undefined && (
                <div className="absolute w-full h-full flex flex-col justify-center items-center text-2xl font-bold z-10 bg-black bg-opacity-50 pointer-events-none">
                    <article className="prose text-white pointer-events-auto">
                        <h1 className="text-white">{"How to begin"}</h1>
                        <p>
                            {
                                "Click the 'Select Pi' button above, this will show a drawer on the right-hand side of your screen with the available pavers to view data on, click on one of the pavers to begin seeing data"
                            }
                        </p>
                    </article>
                </div>
            )}

            <LineChart data={temperatureData} height={750} width={1500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="temperature_timestamp"
                    tickFormatter={formatDate}
                />
                <YAxis tickFormatter={degToString} />
                <Tooltip
                    formatter={tooltipValueFormatter}
                    labelFormatter={tooltipLabelFormatter}
                />
                <Legend />
                <Line dataKey="fahrenheit" stroke="#8884d8" type="monotone" />
                <Line dataKey="celsius" stroke="#c9264e" type="monotone" />
                <Line dataKey="kelvin" stroke="#82ca9d" type="monotone" />
            </LineChart>
        </div>
    );
};
