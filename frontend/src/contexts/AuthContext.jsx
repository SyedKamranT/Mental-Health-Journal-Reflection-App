import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('reflekt_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('reflekt_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock authentication — replace with real API call when auth endpoints exist
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockUser = {
            id: 'test-user-id',
            name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            email,
            avatar: null,
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem('reflekt_user', JSON.stringify(mockUser));
        localStorage.setItem('auth_token', 'mock-jwt-token');
        setUser(mockUser);
        return mockUser;
    };

    const register = async (name, email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockUser = {
            id: 'test-user-id',
            name,
            email,
            avatar: null,
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem('reflekt_user', JSON.stringify(mockUser));
        localStorage.setItem('auth_token', 'mock-jwt-token');
        setUser(mockUser);
        return mockUser;
    };

    const logout = () => {
        localStorage.removeItem('reflekt_user');
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
