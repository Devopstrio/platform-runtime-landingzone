import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import RuntimeDashboard from './pages/RuntimeDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The platform runtime engine is currently orchestrating workload isolation. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<RuntimeDashboard />} />
          <Route path="/clusters" element={<Placeholder name="Multi-Cluster Fleet Manager" />} />
          <Route path="/namespaces" element={<Placeholder name="Namespace Isolation & Quotas" />} />
          <Route path="/workloads" element={<Placeholder name="Runtime Workload Catalog" />} />
          <Route path="/deployments" element={<Placeholder name="Blue/Green & Canary Orchestration" />} />
          <Route path="/security" element={<Placeholder name="Zero-Trust Runtime Security" />} />
          <Route path="/mesh" element={<Placeholder name="Service Mesh Traffic Control" />} />
          <Route path="/quotas" element={<Placeholder name="Resource Optimization & Quotas" />} />
          <Route path="/monitoring" element={<Placeholder name="Runtime Observability Center" />} />
          <Route path="/settings" element={<Placeholder name="Global Runtime Settings" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
