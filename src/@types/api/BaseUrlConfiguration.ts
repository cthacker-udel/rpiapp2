/**
 * @file Defines the schema for the configuration passed into `getBaseUrl`.
 */
/**
 * The configuration to supply to the method.
 */
export type BaseUrlConfiguration =
    | undefined
    | {
          /**
           * The internal api url.
           */
          internalApiUrl?: string;

          /**
           * Signifies that the call to `getBaseUrl` is coming from a server-side callee.
           */
          serverSide: boolean;

          /**
           * The version of the api to call.
           */
          version?: number;
      };
