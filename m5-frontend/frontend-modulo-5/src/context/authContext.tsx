import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Definir los roles posibles
export type UserRole = 'user' | 'admin' | 'master';

interface User {
  id: number;
  nombreUsuario: string;
  email: string;
  rol: UserRole;
  fotoPerfil?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
  login: (token: string, userData: User) => Promise<User>;
  mockLogin: (email: string, password: string) => Promise<User>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// MOCK DATA - Para pruebas sin backend
// ============================================
const MOCK_USERS = {
  user: {
    id: 1,
    nombreUsuario: "juan_perez",
    email: "user@example.com",
    rol: "user" as UserRole,
    fotoPerfil: "https://i.pravatar.cc/150?img=1"
  },
  admin: {
    id: 2,
    nombreUsuario: "admin_user",
    email: "admin@example.com",
    rol: "admin" as UserRole,
    fotoPerfil: "https://i.pravatar.cc/150?img=2"
  },
  master: {
    id: 3,
    nombreUsuario: "master_user",
    email: "master@example.com",
    rol: "master" as UserRole,
    fotoPerfil: "https://i.pravatar.cc/150?img=3"
  }
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar sesión guardada al iniciar la app
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string, userData: User): Promise<User> => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  // para probar sin el backend
  const mockLogin = async (email: string, password: string): Promise<User> => {
    setIsLoading(true);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Credenciales de prueba
    if (email === 'user@example.com' && password === '123456') {
      setUser(MOCK_USERS.user);
      localStorage.setItem('mock_user', JSON.stringify(MOCK_USERS.user));
      setIsLoading(false);
      return MOCK_USERS.user;
    }
    
    if (email === 'admin@example.com' && password === '123456') {
      setUser(MOCK_USERS.admin);
      localStorage.setItem('mock_user', JSON.stringify(MOCK_USERS.admin));
      setIsLoading(false);
      return MOCK_USERS.admin;
    }
    
    if (email === 'master@example.com' && password === '123456') {
      setUser(MOCK_USERS.master);
      localStorage.setItem('mock_user', JSON.stringify(MOCK_USERS.master));
      setIsLoading(false);
      return MOCK_USERS.master;
    }
    
    setIsLoading(false);
    throw new Error('Invalid credentials. Try: user@example.com / 123456');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return rolesArray.includes(user.rol);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      userRole: user?.rol || null,
      login,
      mockLogin,
      logout,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}