/**
 * @file Defines the common event names for the application.
 */

/**
 * Defines the event names for events occurring within the codebase.
 */
export const Events = {
    WEBSOCKET: {
        /**
         * Defines the websocket event name for changes in the `ids` table.
         */
        ID: "id_update",

        /**
         * Defines thew websocket event name for changes in the `temperatures` table.
         */
        TEMPERATURE: "temperature_update",
    },
};
