import Head from 'next/head';
import { ReactNode } from 'react';
import { ThemeToggle } from '../theme/theme-toggle';
import { Phone } from 'lucide-react';
import AuthHeader from '../authHeader';


interface ChildrenProps{
    children: ReactNode
}

export const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <div className=''>
      <AuthHeader/>
      {children}
    </div>
  );
};

export default AuthLayout;