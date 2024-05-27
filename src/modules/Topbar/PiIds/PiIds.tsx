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
 *
 * @returns
 */
export const PiIds = (): JSX.Element => {
    const [selectedName, setSelectedName] = React.useState<string>();
    const { data: piIds, isLoading, isFetching, status } = useId();

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

    React.useEffect(() => {
        if (document !== undefined) {
            const sessionSelectedName = sessionStorage.getItem(
                sessionStorageKeys.DROPDOWN_SELECTED_PI_NAME,
            );
            if (sessionSelectedName !== null) {
                setSelectedName(sessionSelectedName);
            }
        }
    }, []);

    if (isLoading || isFetching || status !== "success") {
        return (
            <div className="flex justify-center">
                <LdsLoader />
            </div>
        );
    }

    console.log(piIds);

    return (
        <ul className="menu items-center rounded-box gap-3">
            {/* @ts-expect-error -- ignore error for this */}
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
