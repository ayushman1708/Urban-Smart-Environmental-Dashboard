const API_BASE = '/api/v1/simulator';

export interface SimulatorPayload {
  zone_code: string;
  anomaly_type: 'pollution_spike' | 'sensor_failure' | 'waste_overflow' | 'reset_baseline';
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  noise_db: number;
  ph: number;
  waste_fill_percent: number;
}

export interface SimulatorResponse {
  status: string;
  anomaly_type: string;
  zone_code: string;
  location_name: string;
  new_reading: Record<string, any>;
  alert_created: string | null;
  message: string;
}

export const simulatorService = {
  async triggerSimulation(payload: Partial<SimulatorPayload>): Promise<SimulatorResponse> {
    const res = await fetch(`${API_BASE}/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Simulation trigger failed');
    return res.json();
  },
};
