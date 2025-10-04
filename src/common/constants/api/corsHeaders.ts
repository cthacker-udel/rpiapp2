/**
 * @file Represent common CORS headers to apply to all requests, can be fine tuned here to apply to all requests.
 */

const corsHeaders = {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin": "*",
};

const corsHeadersIncludeCredentials = {
    ...corsHeaders,
    "Access-Control-Allow-Credentials": true,
};

export { corsHeaders, corsHeadersIncludeCredentials };
