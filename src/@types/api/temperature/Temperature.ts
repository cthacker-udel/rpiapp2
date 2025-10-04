/**
 * @file Represents a temperature reading from the raspberry pi.
 */

import type { Id } from "../id/Id";

/**
 * Represents a singular temperature datum in the database.
 */
export type Temperature = {
    /** Celsius reading. */
    celsius: number;

    /** Fahrenheit number. */
    fahrenheit: number;

    /** PK. */
    id: bigint;

    ids?: Id[];

    /** Kelvin number. */
    kelvin: number;

    /** Id denoting the pi (used internally). */
    pi_id: string;

    /** Temperature timestamp (the date of recording). */
    temperature_timestamp: Date;
};
