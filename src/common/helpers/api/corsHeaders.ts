const corsHeaders = {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "OPTIONS, GET",
    "Access-Control-Allow-Origin":
        process.env.NODE_ENV === "production" ? "rgca.engr.udel.edu" : "*",
};

const corsHeadersIncludeCredentials = {
    ...corsHeaders,
    "Access-Control-Allow-Credentials": true,
};

export { corsHeaders, corsHeadersIncludeCredentials };
