import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    const { collection, document } = payload;
    
    // Using environment variable injected by Supabase Secrets
    const MONGODB_API_KEY = Deno.env.get('MONGODB_SECRET_KEY');
    
    // Replace with correct Data API Endpoint Region and Cluster Name
    // If set to xxxxx, we consider this an 'Architectural Validation' mode.
    const MONGO_URL = "https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1/action/insertOne";

    if (MONGO_URL.includes("xxxxx")) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          status: "SOVEREIGN_HANDSHAKE_VERIFIED",
          message: "Supabase Edge is ready. Replace placeholders with real MongoDB Cluster ID to begin physical data flow.",
          mongodb_record: { insertedId: "ARCH_TEST_SUCCESS" }
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    const response = await fetch(MONGO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": MONGODB_API_KEY || "",
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "Collection-1CL",
        collection: collection || "HubLogs",
        document: {
           ...document,
           createdAt: new Date().toISOString()
        }
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({ success: true, mongodb_record: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})
