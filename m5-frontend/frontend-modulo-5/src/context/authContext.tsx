import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import type { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
  login: (userData: User) => User;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function normalizeUser(userData: User): User {
  const rawUser = userData as User & {
    id?: number;
    userId?: number;
    username?: string;
    appUserName?: string;
  };

  return {
    ...userData,
    appUserId: userData.appUserId ?? rawUser.userId ?? rawUser.id ?? 0,
    appUserName: userData.appUserName ?? rawUser.username ?? "User",
  };
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar sesión guardada al iniciar la app
    const userStr = localStorage.getItem("user");

    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(normalizeUser(userData));
      } catch (error) {
        console.error("Error parsing user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User): User => {
    const normalizedUser = normalizeUser(userData);
    const userWithRole: User = {
      ...normalizedUser,
      role: normalizedUser.isAdmin ? "admin" : "user",
    };

    localStorage.setItem("user", JSON.stringify(userWithRole));
    setUser(userWithRole);

    return userWithRole;
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;

    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return rolesArray.includes(user?.role || "user");
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      userRole: user?.role || null,
      login,
      logout,
      hasRole,
    }),
    [user, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
