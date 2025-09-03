/* eslint-disable sonarjs/mouse-events-a11y -- disabled */
/* eslint-disable sonarjs/anchor-is-valid -- disabled */
/* eslint-disable jsx-a11y/click-events-have-key-events -- disabled */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- disabled */
/* eslint-disable jsx-a11y/anchor-is-valid -- disabled */

import React from "react";

import type { Id } from "@/@types/api/id/Id";
import type { SelectedPiEvent } from "@/@types/events/selectedPi/selectedPiEvent";
import { Events } from "@/common/constants/events/Events";
import { sessionStorageKeys } from "@/common/constants/keys/sessionStorageKeys";
import { emitEvent } from "@/common/helpers/components/emitEvent";
import { useId } from "@/hooks/reactquery/ids/useId";
import { LdsLoader } from "@/modules/Loaders/LdsLoader";

/**
 * The dropdown list of Paver Names to select
 *
 * @returns The dropdown of the paver names to select
 */
export const PiIds = (): JSX.Element => {
    /** The name of the selected pi, purely for recognizing what pi is "currently selected" */
    const [selectedName, setSelectedName] = React.useState<string>();

    /** Fetches the data of the Raspberry Pis (Pavers) */
    const { data: piIds, isLoading, isFetching, status } = useId();

    /**
     * Emits the "chosen pi" event, which signifies that the user clicked on a Paver (pi)
     *
     * @id - The id (json data of the pi selected)
     */
    const emitChosenPi = React.useCallback(
        (id: Id) => (): void => {
            emitEvent<SelectedPiEvent>(Events.SELECTED_PI, { id });
            setSelectedName(id.name);
            sessionStorage.setItem(
                sessionStorageKeys.DROPDOWN_SELECTED_PI_NAME,
                id.name,
            );
        },
        [],
    );

    /**
     * Fires on mount, checks the session storage if the user has already selected a Paver, then assigns
     * the selected paver to the one already selecteds
     */
    React.useEffect(() => {
        if ((document as Document | undefined) !== undefined) {
            const sessionSelectedName = sessionStorage.getItem(
                sessionStorageKeys.DROPDOWN_SELECTED_PI_NAME,
            );
            if (sessionSelectedName !== null) {
                setSelectedName(sessionSelectedName);
            }
        }
    }, []);

    /** If the data is still loading, display loader */
    if (isLoading || isFetching || status !== "success") {
        return (
            <div className="flex justify-center">
                <LdsLoader />
            </div>
        );
    }

    return (
        <ul className="menu items-center rounded-box gap-3">
            {piIds.length === 0 && (
                <div className="text-sm">{"No Pavers Available"}</div>
            )}
            {piIds.map((eachId) => (
                <li
                    className="border rounded-btn flex items-center w-full"
                    key={eachId.id}
                    onClick={emitChosenPi(eachId)}
                >
                    <a
                        className={`${
                            selectedName === eachId.name
                                ? "bg-gray-400 pointer-events-none font-bold"
                                : ""
                        } w-full flex justify-center text-wrap`}
                    >
                        {eachId.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};
