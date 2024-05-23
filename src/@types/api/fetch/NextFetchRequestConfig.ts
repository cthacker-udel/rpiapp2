/**
 * Configuration for custom fetch implementation when using NextJS
 */
export type NextFetchRequestConfig = {
    /**
     * Whether to revalidate the fetch every x milliseconds
     */
    revalidate?: number | false;
    /**
     * The tags to attach to the fetch request
     */
    tags?: string[];
};
