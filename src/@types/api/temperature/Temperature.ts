import type { Id } from "../id/Id";

/**
 * Represents a singular temperature datum in the database
 */
export type Temperature = {
    /** PK */
    id: string;

    /** Celsius reading */
    celsius: number;

    /** Fahrenheit number */
    fahrenheit: number;

    /** Kelvin number */
    kelvin: number;

    /** Temperature timestamp (when the data was read) */
    temperature_timestamp: Date;

    /** Id denoting the pi (used internally) */
    pi_id: string;

    ids?: Id[];
};
