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
