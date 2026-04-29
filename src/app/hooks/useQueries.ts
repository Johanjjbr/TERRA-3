import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Hook para obtener clientes
export function useClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setClients(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { clients, loading, error, refetch: fetchClients };
}

// Hook para obtener conexiones de un cliente
export function useClientConnections(clientId: number | null) {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) {
      setConnections([]);
      setLoading(false);
      return;
    }

    fetchConnections();
  }, [clientId]);

  const fetchConnections = async () => {
    if (!clientId) return;

    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('client_connections')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (err) throw err;
      setConnections(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { connections, loading, error, refetch: fetchConnections };
}

// Hook para obtener métricas de equipos en tiempo real
export function useEquipmentMetrics(connectionId: number | null) {
  const [metrics, setMetrics] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connectionId) {
      setMetrics(null);
      setLoading(false);
      return;
    }

    fetchMetrics();

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel(`metrics:${connectionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'equipment_metrics',
          filter: `connection_id=eq.${connectionId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMetrics(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [connectionId]);

  const fetchMetrics = async () => {
    if (!connectionId) return;

    try {
      setLoading(true);
      // Obtener la métrica más reciente
      const { data, error: err } = await supabase
        .from('equipment_metrics')
        .select('*')
        .eq('connection_id', connectionId)
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      if (err && err.code !== 'PGRST116') throw err; // PGRST116 = no rows
      setMetrics(data || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, error, refetch: fetchMetrics };
}

// Hook para obtener alertas activas
export function useAlerts(connectionId: number | null = null) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();

    // Suscribirse a cambios en tiempo real
    const query = supabase
      .channel('alerts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alerts'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAlerts((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setAlerts((prev) =>
              prev.map((alert) => (alert.id === payload.new.id ? payload.new : alert))
            );
          }
        }
      )
      .subscribe();

    return () => {
      query.unsubscribe();
    };
  }, [connectionId]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('alerts')
        .select('*')
        .eq('resolved', false)
        .order('created_at', { ascending: false });

      if (connectionId) {
        query = query.eq('connection_id', connectionId);
      }

      const { data, error: err } = await query;

      if (err) throw err;
      setAlerts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { alerts, loading, error, refetch: fetchAlerts };
}

// Hook para obtener credenciales API
export function useAPIConnections() {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('api_connections')
        .select('id, platform, name, host, port, enabled, created_at')
        .eq('enabled', true)
        .order('created_at', { ascending: false });

      if (err) throw err;
      setConnections(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { connections, loading, error, refetch: fetchConnections };
}
