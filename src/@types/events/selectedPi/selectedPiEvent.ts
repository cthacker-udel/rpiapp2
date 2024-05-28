import type { Id } from "@/@types/api/id/Id";

/**
 * The event type specifier, what to expect in the `detail` field of the custom event
 */
export type SelectedPiEvent = {
    id: Id;
};
