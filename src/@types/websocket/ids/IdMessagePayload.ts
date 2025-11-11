/**
 * @file Defines the schema for the websocket "ids" message payload, which propagate updates to the `ids` table within the rpi database.
 */

import type { Id } from "../../api/id/Id";

/**
 * Defines the schema for the `ids` message payload.
 */
export type IdMessagePayload = {
    /**
     * The ids of the raspberry pi devices registered and actively transmitting data.
     */
    ids: Id[];
};
