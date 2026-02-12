import { ReactNode } from 'react';
import Navbar from './Navbar';
import MedicineChatBot from './chatbot/MedicineChatBot';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #163A2C 0%, #1B4433 35%, #0F2A21 70%, #0B2019 100%)'
      }}
    >
      <Navbar />
      {children}
      <MedicineChatBot />
    </div>
  );
};

export default AppLayout;
