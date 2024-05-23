export type Temperature = {
    /** PK */
    id: number;

    /** Celsius reading */
    celsius: number;

    /** Fahrenheit number */
    fahrenheit: number;

    /** Kelvin number */
    kelvin: number;

    /** Temperature timestamp (when the data was read) */
    temperature_timestamp: number;

    /** Id denoting the pi (used internally) */
    pi_id: string;
};
