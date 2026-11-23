import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Sidebar } from '../common/Sidebar';
import { User } from '../../types';

interface AppLayoutProps {
  user: User | null;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  user,
  currentRoute,
  onNavigate,
  onLogout,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Sticky Header */}
      <Header
        user={user}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          isOpen={sidebarOpen}
        />

        {/* Main Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-950 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};
