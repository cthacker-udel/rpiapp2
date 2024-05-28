import type { Temperature } from "../temperature/Temperature";

/**
 * Represents a single entry of a raspberry pi's metadata in the database
 */
export type Id = {
    /** PK */
    id: string;

    /** Id of the pi (used internally) */
    pi_id: string;

    /** The name of the pi (used externally) */
    name: string;

    /** The date when the id was created */
    created_at: Date;

    /** Temperatures associated with the Pi Id */
    temperatures?: Temperature[];
};
