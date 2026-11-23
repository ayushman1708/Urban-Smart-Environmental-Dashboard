import React, { useState, useEffect } from 'react';
import { User } from './types';
import { authService } from './services/auth';
import { setTheme, getStoredTheme } from './utils/theme';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { SystemHealthPage } from './pages/SystemHealthPage';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { PlaceholderModulePage } from './pages/PlaceholderModulePage';

import { AirQualityPage } from './pages/AirQualityPage';
import { WeatherPage } from './pages/WeatherPage';
import { WaterQualityPage } from './pages/WaterQualityPage';
import { NoisePage } from './pages/NoisePage';
import { SmartWastePage } from './pages/SmartWastePage';
import { SimulatorPage } from './pages/SimulatorPage';

export function App() {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [currentRoute, setCurrentRoute] = useState<string>('landing');

  // Initialize theme on mount
  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentRoute('overview');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentRoute('landing');
  };

  // Render standalone view if on Landing, Login, or Register
  if (currentRoute === 'landing') {
    return (
      <LandingPage
        onOpenDashboard={() => setCurrentRoute(user ? 'overview' : 'login')}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentRoute === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigateRegister={() => setCurrentRoute('register')}
      />
    );
  }

  if (currentRoute === 'register') {
    return (
      <RegisterPage
        onRegisterSuccess={() => setCurrentRoute('login')}
        onNavigateLogin={() => setCurrentRoute('login')}
      />
    );
  }

  // Render Main Application Shell with Navigation Layout
  return (
    <AppLayout
      user={user}
      currentRoute={currentRoute}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {currentRoute === 'overview' && (
        <OverviewDashboard onNavigate={handleNavigate} />
      )}

      {currentRoute === 'health' && <SystemHealthPage />}

      {currentRoute === 'profile' && <ProfilePage user={user} />}

      {currentRoute === 'air-quality' && <AirQualityPage />}

      {currentRoute === 'weather' && <WeatherPage />}

      {currentRoute === 'water-quality' && <WaterQualityPage />}

      {currentRoute === 'noise' && <NoisePage />}

      {currentRoute === 'smart-waste' && <SmartWastePage />}

      {currentRoute === 'simulator' && <SimulatorPage onNavigate={handleNavigate} />}

      {currentRoute === 'reports' && (
        <PlaceholderModulePage
          title="Automated Environmental Report Generator"
          description="Executive PDF/HTML summary report compiler containing AQI stats, worst performing zones, and AI decision recommendations."
          phaseTag="Phase 5 Module"
          onNavigate={handleNavigate}
        />
      )}
    </AppLayout>
  );
}

export default App;
