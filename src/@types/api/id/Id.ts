export type Id = {
    /** PK */
    id: number;

    /** Id of the pi (used internally) */
    pi_id: string;

    /** The name of the pi (used externally) */
    name: string;

    /** The date when the id was created */
    created_at: Date;
};
