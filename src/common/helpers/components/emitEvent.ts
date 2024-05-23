"use client";

/**
 * Dispatches an event throughout the "DOM"
 *
 * @param eventName - The name of the event to dispatch
 * @param detailPayload - The payload for the `detail` param of the custom event
 */
export const emitEvent = <T>(eventName: string, detailPayload?: T): void => {
    const event = new CustomEvent<T>(eventName, {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: detailPayload,
    });

    if (document !== undefined) {
        const didDispatch = document.dispatchEvent(event);
        if (!didDispatch) {
            throw new Error(`Error dispatching the event ${eventName}`);
        }
    }
};
