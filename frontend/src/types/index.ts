export type Role = 'Admin' | 'Authority' | 'Researcher' | 'Citizen';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  created_at: string;
}

export interface KPIMetricData {
  title: string;
  value: string;
  raw_value: number;
  unit: string;
  status: string;
  trend: 'up' | 'down' | 'stable';
  change_percentage: number;
  last_updated: string;
}

export interface DashboardSummary {
  current_aqi: KPIMetricData;
  pm25: KPIMetricData;
  pm10: KPIMetricData;
  temperature: KPIMetricData;
  humidity: KPIMetricData;
  active_alerts_count: number;
  system_status: string;
  total_sensors: number;
  online_sensors: number;
}

export interface RecentAlert {
  id: number;
  alert_code: string;
  zone_name: string;
  parameter: string;
  current_value: number;
  threshold_value: number;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: string;
}

export interface EnvironmentalStatus {
  category: string;
  status: string;
  health_indicator: 'green' | 'yellow' | 'orange' | 'red';
  latest_reading: string;
  trend_description: string;
}

export interface HealthStatus {
  backend: string;
  database: string;
  ai_service: string;
  iot_gateway: string;
  websocket: string;
  last_sensor_update: string;
  api_response_time_ms: number;
  total_sensors: number;
  online_sensors: number;
  offline_sensors: number;
}
