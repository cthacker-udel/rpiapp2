import type { Id } from "../id/Id";

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
