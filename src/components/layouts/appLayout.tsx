import { ReactNode } from 'react';
import AppHeader from '../appHeader';


interface ChildrenProps{
    children: ReactNode
}

const AppLayout = ({ children }: ChildrenProps) => {
  return (
    <div >
      <AppHeader/>
      {children}
    </div>
  );
};

export default AppLayout;