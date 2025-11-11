/**
 * @file Defines the payload for updates to the temperature table within the rpi database; propagated from the remote websocket instance.
 */

import type { Temperature } from "../../api/temperature/Temperature";

/**
 * The schema for the websocket message payload containing the updated temperature rows.
 */
export type TemperatureMessagePayload = {
    /**
     * Defines the temperatures from the `rpi` database.
     */
    temperatures: Temperature[];
};
