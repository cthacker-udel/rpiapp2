/* eslint-disable jsx-a11y/click-events-have-key-events -- disabled */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- disabled */
/* eslint-disable jsx-a11y/anchor-is-valid -- disabled */
import React from "react";

import type { Id } from "@/@types/api/id/Id";
import type { SelectedPiEvent } from "@/@types/events/selectedPi/selectedPiEvent";
import { Events } from "@/common/constants/events/Events";
import { emitEvent } from "@/common/helpers/components/emitEvent";
import { useId } from "@/hooks/reactquery/ids/useId";

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
        },
        [],
    );

    if (isLoading || isFetching || status !== "success") {
        return <span />;
    }

    return (
        <ul className="menu rounded-box">
            {piIds.map((eachId) => (
                <li key={eachId.id} onClick={emitChosenPi(eachId)}>
                    <a
                        className={
                            selectedName === eachId.name
                                ? "bg-gray-400 pointer-events-none font-bold"
                                : ""
                        }
                    >
                        {eachId.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};
