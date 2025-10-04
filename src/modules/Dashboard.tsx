/**
 * @file Represents the inner dashboard of the application.
 */

/* eslint-disable lodash-f/prefer-lodash-method -- disabled */
/* eslint-disable jsx-a11y/anchor-is-valid -- disabled */
/* eslint-disable barrel-files/avoid-importing-barrel-files -- documentation states decoupled components. */

"use client";
import dayjs from "dayjs";
import { isEmpty, isNullish } from "radashi";
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

import type { Id } from "../@types/api/id/Id";
import { parseJson } from "../common/helpers/api/parseJson";
import { stringifyJson } from "../common/helpers/api/stringifyJson";
import { useId } from "../hooks/reactquery/ids/useId";
import { useTemperature } from "../hooks/reactquery/temperature/useTemperature";

/**
 * Displays the graphical representation of the data coming from the selected paver.
 * @returns The main page for the project, houses the graph of data, etc.
 */
export const Dashboard = (): React.JSX.Element => {
    /** The selected paver. */
    const [selectedId, setSelectedId] = React.useState<Id | undefined>(
        undefined,
    );

    const {
        data: piIds,
        isFetching: isFetchingPiIds,
        isLoading: isLoadingPiIds,
        status: piIdsStatus,
    } = useId();

    /** Fetches the temperature data of the paver selected. */
    const {
        data: temperatureData,
        isFetching,
        isLoading,
        status,
    } = useTemperature({ selectedId });

    /** Used for graph, formats the date (x) labels. */
    const formatDate = React.useCallback(
        (date: Date): string => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    /** Formats the tooltip header. */
    const tooltipLabelFormatter = React.useCallback(
        (date: Date) => dayjs(date).format("MM/DD/YYYY hh:mm"),
        [],
    );

    /**
     * Processes the event fired from the TopBar component.
     * @param event - The event fired from the TopBar component.
     */
    const processSelectedIdEvent = React.useCallback(
        (event: React.ChangeEvent) => {
            const { target } = event;
            if (!isNullish(target)) {
                const { value: selectedPiId } = target as HTMLInputElement;
                const parsedValue = parseJson<Id>(selectedPiId);

                if (!isNullish(parsedValue)) {
                    setSelectedId(parsedValue);
                }
            }
        },
        [],
    );

    /**
     * Formats the values displayed in the tooltip.
     * @param value - The displayed value.
     * @param name - The designation of the value type.
     */
    const tooltipValueFormatter = React.useCallback(
        (value: number, name: string) => {
            switch (name) {
                case "celsius": {
                    return `${value} °C`;
                }
                case "fahrenheit": {
                    return `${value} °F`;
                }
                case "kelvin": {
                    return `${value} °K`;
                }
                default: {
                    return `${value}`;
                }
            }
        },
        [],
    );

    /** Converts a string to degrees. */
    const degToString = React.useCallback((value: number) => `${value}°`, []);

    const pendingTemperatureData =
        isLoading || isFetching || status !== "success";
    const pendingPiIds =
        isLoadingPiIds || isFetchingPiIds || piIdsStatus !== "success";

    /** While the temperatures are loading, displays a loading icon with text. */
    if (isEmpty(selectedId) && pendingTemperatureData && pendingPiIds) {
        return (
            <div className="flex flex-col flex-grow justify-center items-center gap-3">
                <span className="text-lg animate-infinite animate-pulse">
                    {"Loading Temperatures..."}
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="bg-base-100 shadow-sm navbar">
                <div className="avatar">
                    <div className="rounded w-24">
                        <img
                            alt="University of Delaware Logo"
                            src="/udlogo.png"
                        />
                    </div>
                </div>
                <a className="!text-black text-xl pointer-events-none btn btn-ghost">
                    {"Dr. Head's Raspberry Pi Project"}
                </a>
            </div>
            <div className="flex flex-col items-center w-full grow">
                <select
                    className="w-1/2 select"
                    defaultValue={"Select a Pi Id"}
                    onChange={processSelectedIdEvent}
                >
                    <option disabled>{"Select a Pi Id"}</option>
                    {piIds?.map((eachPiId) => (
                        <option
                            id={eachPiId.id.toString()}
                            key={`rpi_select_${eachPiId.id.toString()}`}
                            value={stringifyJson(eachPiId)}
                        >
                            {eachPiId.pi_id?.toString()}
                        </option>
                    ))}
                </select>

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
                        <Line
                            dataKey="celsius"
                            stroke="#c9264e"
                            type="monotone"
                        />
                        <Line
                            dataKey="kelvin"
                            stroke="#82ca9d"
                            type="monotone"
                        />
                        <Brush
                            dataKey="temperature_timestamp"
                            height={30}
                            stroke="#867835"
                            tickFormatter={formatDate}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
