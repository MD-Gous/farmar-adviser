'use client';

import { useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  village?: string;
  district?: string;
  state?: string;
  preferredLanguage?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('farmerUser');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    const mockUser: AuthUser = {
      id: '1',
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      village: 'Dharwad',
      district: 'Dharwad',
      state: 'Karnataka',
      preferredLanguage: 'en'
    };
    setUser(mockUser);
    localStorage.setItem('farmerUser', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (data: Partial<AuthUser> & { password: string }): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000));
    const newUser: AuthUser = {
      id: Date.now().toString(),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone,
      village: data.village,
      district: data.district,
      state: data.state,
      preferredLanguage: data.preferredLanguage || 'en'
    };
    setUser(newUser);
    localStorage.setItem('farmerUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmerUser');
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('farmerUser', JSON.stringify(updated));
    }
  };

  return { user, loading, login, signup, logout, updateUser };
};
