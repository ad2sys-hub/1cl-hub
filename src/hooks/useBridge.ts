import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useBridge = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncToSovereign = async (table: string, data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Insert into Supabase (Public Index/Cache)
      const { error: supabaseError } = await supabase
        .from(table)
        .insert([data]);

      if (supabaseError) throw supabaseError;

      // 2. Trigger Sovereign Bridge Handshake
      // The bridge edge function is called automatically via Supabase Webhooks
      // But we can also trigger it manually for critical syncs
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke('mongodb-bridge', {
        body: { 
          table, 
          record: data,
          type: 'MANUAL_SYNC_TRIGGER'
        }
      });

      if (edgeError) {
        console.warn("Sovereign Sync Warning (Retry Queue Active):", edgeError);
      }

      return edgeData;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Sovereign Bridge Error:", err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { syncToSovereign, loading, error };
};
