const API_BASE = '/api/v1/readings';

export interface AirQualityTelemetry {
  current_aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  o3: number;
  trend: Array<{ time: string; AQI: number; PM25: number; PM10: number }>;
  zone_pollution: Array<{ zone_code: string; zone_name: string; aqi: number; pm25: number; pm10: number; status: string }>;
}

export interface WeatherTelemetry {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  pressure: number;
  rainfall: number;
  correlation_insight: string;
  trend: Array<{ time: string; Temp: number; Humidity: number; WindSpeed: number }>;
}

export interface WaterQualityTelemetry {
  ph: number;
  turbidity: number;
  dissolved_oxygen: number;
  conductivity: number;
  tds: number;
  status: string;
  overall_score: number;
  assessment: string;
}

export interface NoiseTelemetry {
  current_db: number;
  avg_db: number;
  max_db: number;
  min_db: number;
  trend: Array<{ time: string; dB: number; Threshold: number }>;
  hotspots: Array<{ zone: string; type: string; db: number; status: string }>;
}

export interface SmartWasteTelemetry {
  total_bins: number;
  full_bins: number;
  overflow_risk: number;
  collection_required: number;
  bins: Array<{ id: string; location: string; fill_level: number; status: string; prediction: string; last_collection: string }>;
}

export const readingsService = {
  async getAirQuality(): Promise<AirQualityTelemetry> {
    const res = await fetch(`${API_BASE}/air-quality`);
    if (!res.ok) throw new Error('Failed to fetch air quality data');
    return res.json();
  },

  async getWeather(): Promise<WeatherTelemetry> {
    const res = await fetch(`${API_BASE}/weather`);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    return res.json();
  },

  async getWaterQuality(): Promise<WaterQualityTelemetry> {
    const res = await fetch(`${API_BASE}/water-quality`);
    if (!res.ok) throw new Error('Failed to fetch water quality data');
    return res.json();
  },

  async getNoise(): Promise<NoiseTelemetry> {
    const res = await fetch(`${API_BASE}/noise`);
    if (!res.ok) throw new Error('Failed to fetch noise data');
    return res.json();
  },

  async getSmartWaste(): Promise<SmartWasteTelemetry> {
    const res = await fetch(`${API_BASE}/smart-waste`);
    if (!res.ok) throw new Error('Failed to fetch smart waste data');
    return res.json();
  },
};
