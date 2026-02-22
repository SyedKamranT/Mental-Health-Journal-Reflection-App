/**
 * ProtectedRoute — Redirects unauthenticated users to /login.
 * Shows a loading spinner while auth state is resolving.
 */

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 border-2 border-[#8AA2C8] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
