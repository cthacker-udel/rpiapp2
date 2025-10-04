/**
 * @file Represents the `Id` of the raspberry pi stored in the database.
 */

import type { Temperature } from "../temperature/Temperature";

/**
 * Represents a single entry of a raspberry pi's metadata in the database.
 */
export type Id = {
    /** The creation date of the id. */
    created_at: Date;

    /** PK. */
    id: bigint;

    /** The name of the pi (used externally). */
    name: string | null;

    /** Id of the pi (used internally). */
    pi_id: string | null;

    /** Temperatures associated with the Pi Id. */
    temperatures?: Temperature[];
};
