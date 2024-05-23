/**
 * Fetches and constructs the base url from the given environment
 */
export const getBaseUrl = (): string => {
    const currentNodeEnvironment = process.env.NODE_ENV;
    let prefix = "";

    prefix = currentNodeEnvironment === "production" ? "https://" : "http://";

    let url = process.env.NEXT_PUBLIC_VERCEL_CUSTOM_URL;

    if (currentNodeEnvironment === "production" && url === undefined) {
        url = process.env.NEXT_PUBLIC_PROD_API_URL ?? "";
    } else if (url === undefined) {
        url = process.env.NEXT_PUBLIC_DEV_API_URL ?? "";
    }

    return `${prefix}${url}/api/`;
};
