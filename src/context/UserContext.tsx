import React, { ReactNode, createContext, use, useContext, useState } from 'react';
import {} from 'js-cookie'
import api from '@/lib/axios';

export interface User {
    id: string,
    username: string
    email: string
}

interface UserContextType {
  user: User | null;
  login: (id: string) => void;
  logout: () => void;
}

interface ChildrenProps{
    children: ReactNode
}

const UserContext = createContext<UserContextType >({} as UserContextType);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }:ChildrenProps) => {
  const [user, setUser] = useState<User | null>(() => {
      if (typeof window !== 'undefined') {
          const userJSON = localStorage.getItem('user')
          if (userJSON !== null) {
              try {
                  const user = JSON.parse(userJSON)
                  return user
              } catch (error) {
                  console.log(error)
              }
          }
      }
      return null
  })

  const login = async(id: string ) => {
    const response = await api.get(`/user/${id}`)
    const user = response.data

    localStorage.setItem('user', JSON.stringify(user))
    setUser(response.data)
    
  };

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};