/**
 * Represents the properties associated when overriding the `page.ts` behavior with a component
 *
 * @param params - See https://nextjs.org/docs/app/api-reference/file-conventions/page#params-optional
 * @param searchParams - See https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
 */
export type PageProperties = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string };
};
