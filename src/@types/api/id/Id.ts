import type { Temperature } from "../temperature/Temperature";

export type Id = {
    /** PK */
    id: string;

    /** Id of the pi (used internally) */
    pi_id: string;

    /** The name of the pi (used externally) */
    name: string;

    /** The date when the id was created */
    created_at: Date;

    temperatures?: Temperature[];
};
