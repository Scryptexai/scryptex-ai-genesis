// index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import DashboardMockup from './DashboardMock/DashboardMock';
import './styles.css' // You would need to create this file with your Tailwind imports

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-950 flex items-center justify-center m-1">
      <DashboardMockup />
    </div>
  </React.StrictMode>
);
export default DashboardMockup