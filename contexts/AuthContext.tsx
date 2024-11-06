import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await axios.post('http://192.168.1.102:5000/api/auth/login', { email, password });
    setUser(response.data.user);
  };

  const signup = async (data: any) => {
    await axios.post('http://192.168.1.102:5000/api/auth/register', data);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
