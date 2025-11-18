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
import type { Temperature } from "../@types/api/temperature/Temperature";
import type { IdMessagePayload } from "../@types/websocket/ids/IdMessagePayload";
import type { TemperatureMessagePayload } from "../@types/websocket/temperature/TemperatureMessagePayload";
import type { WebsocketResponse } from "../@types/websocket/WebsocketResponse";
import { Events } from "../common/constants/Events";
import { parseJson } from "../common/helpers/api/parseJson";
import { stringifyJson } from "../common/helpers/api/stringifyJson";

/**
 * Displays the graphical representation of the data coming from the selected paver.
 * @returns The main page for the project, houses the graph of data, etc.
 */
export const Dashboard = (): React.JSX.Element => {
    /**
     * Defines the reference to the current websocket reference.
     */
    const websocketReference = React.useRef<undefined | WebSocket>(undefined);

    /** The selected paver. */
    const [selectedId, setSelectedId] = React.useState<Id | undefined>(
        undefined,
    );

    /**
     * The ids of the raspberry pi devices emitting temperature data to the remote database.
     */
    const [piIds, setPiIds] = React.useState<Id[]>();

    /**
     * The temperature data emitted from the remote raspberry pi devices.
     */
    const [temperatureData, setTemperatureData] =
        React.useState<Temperature[]>();

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

    /**
     * Callback function for handling websocket messages.
     * @param messageEvent - The event sent from the websocket server.
     */
    const onWebsocketMessage = React.useCallback(
        (messageEvent: MessageEvent) => {
            const { data } = messageEvent;
            console.log("processed websocket message", data, messageEvent);
            if (!isEmpty(data)) {
                const parsedData = parseJson<WebsocketResponse>(data);
                if (!isNullish(parsedData)) {
                    const { data: eventData, event } = parsedData;
                    if (event === Events.WEBSOCKET.ID) {
                        setPiIds(eventData as Id[]);
                    } else if (event === Events.WEBSOCKET.TEMPERATURE) {
                        setTemperatureData(eventData as Temperature[]);
                    }
                }
            }
        },
        [],
    );

    /**
     * Handler for mount event, which initializes the websocket instance to connect to the remote websocket url.
     */
    React.useEffect(() => {
        if (!isNullish(document)) {
            const websocketUrl = import.meta.env.VITE_PUBLIC_WEBSOCKET_URL;
            if (!isEmpty(websocketUrl)) {
                websocketReference.current = new WebSocket(websocketUrl);
            }
        }
    }, []);

    /**
     * Handler for attaching the event listeners for the initialized websocket instance.
     */
    React.useEffect(() => {
        if (!isNullish(websocketReference.current)) {
            websocketReference.current.addEventListener(
                "message",
                onWebsocketMessage,
            );
        }

        return (): void => {
            if (!isNullish(document)) {
                websocketReference.current?.removeEventListener(
                    "message",
                    onWebsocketMessage,
                );
            }
        };
    }, [onWebsocketMessage]);

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

                {isEmpty(selectedId) ? (
                    <div className="flex flex-col flex-grow justify-center items-center gap-3">
                        <span className="text-2xl animate-infinite animate-pulse">
                            {
                                "Please select an ID of the raspberry pi device to display the temperature."
                            }
                        </span>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};
