"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  favoriteTutors?: string[];
  sessions: Array<{
    id: string;
    studentName?: string;
    teacherName?: string;
    date: string;
    time: string;
    duration: number;
    subject: string;
    status: 'scheduled' | 'completed' | 'cancelled';
  }>;
  // ... other user properties
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
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