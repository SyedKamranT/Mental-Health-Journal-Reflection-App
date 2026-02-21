import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function AppLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-pure flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-calm-blue/30 border-t-calm-blue rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-dark-pure">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main content area */}
            <div className="lg:ml-20 transition-all duration-300">
                <TopHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
