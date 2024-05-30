"use client";
import dayjs from "dayjs";
import React from "react";
import {
    Brush,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { Id } from "@/@types/api/id/Id";
import type { SelectedPiEvent } from "@/@types/events/selectedPi/selectedPiEvent";
import { Events } from "@/common/constants/events/Events";
import { sessionStorageKeys } from "@/common/constants/keys/sessionStorageKeys";
import { useTemperature } from "@/hooks/reactquery/temperature/useTemperature";

import { LdsLoader } from "../Loaders/LdsLoader";

/**
 * Displays the graphical representation of the data coming from the selected paver
 *
 * @returns The main page for the project, houses the graph of data, etc
 */
export const Dashboard = (): JSX.Element => {
    /** The selected paver */
    const [selectedId, setSelectedId] = React.useState<Id | undefined>(
        undefined,
    );

    /** Fetches the temperature data of the paver selected */
    const {
        data: temperatureData,
        isLoading,
        isFetching,
        status,
    } = useTemperature({ selectedId });

    /** Used for graph, formats the date (x) labels */
    const formatDate = React.useCallback(
        (date: Date): string => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    /** Formats the tooltip header */
    const tooltipLabelFormatter = React.useCallback(
        (date: Date) => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    /**
     * Processes the event fired from the TopBar component
     *
     * @param event - The event fired from the TopBar component
     */
    const processSelectedIdEvent = React.useCallback((event: Event) => {
        const mappedEvent = event as CustomEvent<SelectedPiEvent>;

        const { detail } = mappedEvent;
        if (detail !== undefined) {
            const { id } = detail;
            setSelectedId(id);
            sessionStorage.setItem(
                sessionStorageKeys.DASHBOARD_SELECTED_PI_ID,
                JSON.stringify(id),
            );
        }
    }, []);

    /**
     * Formats the values displayed in the tooltip
     *
     * @param value - The actual value being displayed
     * @param name - The key (title) of what is going to be displayed
     */
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

    /** Converts a string to degrees */
    const degToString = React.useCallback((value: number) => `${value}°`, []);

    /** Fires when the `processSelectedIdEvent` event is fired */
    React.useEffect(() => {
        if (document !== undefined) {
            document.addEventListener(
                Events.SELECTED_PI,
                processSelectedIdEvent,
            );
            const sessionId = sessionStorage.getItem(
                sessionStorageKeys.DASHBOARD_SELECTED_PI_ID,
            );
            if (sessionId !== null) {
                setSelectedId(JSON.parse(sessionId) as Id);
            }
        }

        return (): void => {
            document.removeEventListener(
                Events.SELECTED_PI,
                processSelectedIdEvent,
            );
        };
    }, [processSelectedIdEvent]);

    /** While the temperatures are loading, displays a loading icon with text */
    if (
        selectedId === undefined &&
        (isLoading || isFetching || status !== "success")
    ) {
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
                <div className="text-xl font-bold flex flex-row justify-center w-full">
                    {selectedId.name}
                </div>
            )}
            {selectedId === undefined && (
                <div className="absolute w-full h-full flex flex-col justify-center items-center text-2xl font-bold z-[2] bg-black bg-opacity-50 pointer-events-none">
                    <article className="prose text-white pointer-events-auto text-center">
                        <h1 className="text-white animate-jackInTheBox">
                            {"How to begin"}
                        </h1>
                        <p className="p-3 lg:p-0 animate-fadeIn animate-delay-1000">
                            {
                                "Click the 'Select Pi' button above, this will show a drawer on the right-hand side of your screen with the available pavers to view data about, click on one of the pavers to begin seeing data about the selected paver."
                            }
                        </p>
                    </article>
                </div>
            )}

            <ResponsiveContainer height="90%" width="90%">
                <LineChart data={temperatureData}>
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
                    <Line
                        dataKey="fahrenheit"
                        stroke="#8884d8"
                        type="monotone"
                    />
                    <Line dataKey="celsius" stroke="#c9264e" type="monotone" />
                    <Line dataKey="kelvin" stroke="#82ca9d" type="monotone" />
                    <Brush
                        dataKey="temperature_timestamp"
                        height={30}
                        stroke="#867835"
                        tickFormatter={formatDate}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
