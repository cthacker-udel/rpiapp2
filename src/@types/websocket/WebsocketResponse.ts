/**
 * @file Defines the schema for receiving websocket messages from the remote websocket server.
 */

/**
 * Defines the generic schema for the websocket response.
 * @template Data - The internal datatype of the transmitted data.
 */
export type WebsocketResponse<Data = unknown> = {
    /**
     * Represents the internal data from the websocket response.
     */
    data: Data;

    /**
     * Defines the event name for the data.
     */
    type: string;
};
