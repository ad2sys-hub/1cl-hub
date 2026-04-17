import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { MongoClient } from "npm:mongodb@5.1.0"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // SECURITY: Validate Shared Secret if present in environment
    const SOVEREIGN_TOKEN = Deno.env.get('SOVEREIGN_SYNC_TOKEN');
    const incomingToken = req.headers.get('x-sovereign-token');

    if (SOVEREIGN_TOKEN && incomingToken !== SOVEREIGN_TOKEN) {
       return new Response(
         JSON.stringify({ error: "UNAUTHORIZED_SOVEREIGN_HANDSHAKE" }),
         { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
    }

    const payload = await req.json();
    
    // Support both manual sync (legacy) and Supabase Webhooks
    // Webhook format: { type, table, record, schema, old_record }
    const isWebhook = !!payload.table && !!payload.record;
    
    const table = isWebhook ? payload.table : (payload.collection || "AdminSync");
    const record = isWebhook ? payload.record : payload.document;
    const eventType = isWebhook ? payload.type : "MANUAL_SYNC";

    // Map Supabase Tables to MongoDB Collections
    const collectionMapping: Record<string, string> = {
      "partnership_inquiries": "Partnerships",
      "audit_logs": "HubLogs",
      "profiles": "Identities",
      "AdminSync": "AdminOperations"
    };

    const targetCollection = collectionMapping[table] || table;
    
    // Using environment variable injected by Supabase Secrets
    const CONNECTION_STRING = Deno.env.get('MONGODB_CONNECTION_STRING');

    if (!CONNECTION_STRING) {
      throw new Error("MONGODB_CONNECTION_STRING not set in environment");
    }

    const client = new MongoClient(CONNECTION_STRING);
    await client.connect();
    
    // Default database
    const dbName = "Collection-1CL";
    const db = client.db(dbName);
    const collection = db.collection(targetCollection);

    const result = await collection.insertOne({
       ...record,
       _sync_meta: {
          source: "supabase_webhook",
          event_type: eventType,
          synced_at: new Date().toISOString()
       }
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, mongodb_record: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  }
})
