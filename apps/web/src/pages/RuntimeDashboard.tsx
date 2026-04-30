import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  Cloud, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Layers,
  Container,
  Cpu,
  Globe,
  Terminal,
  CheckCircle2
} from 'lucide-react';

const runtimeData = [
  { month: 'Jan', deployments: 120, latency: 45 },
  { month: 'Feb', deployments: 154, latency: 38 },
  { month: 'Mar', deployments: 142, latency: 52 },
  { month: 'Apr', deployments: 189, latency: 41 },
  { month: 'May', deployments: 210, latency: 35 },
  { month: 'Jun', deployments: 245, latency: 32 },
  { month: 'Jul', deployments: 280, latency: 30 },
];

const KPI_CARDS = [
  { title: 'Active Workloads', value: '1,482', trend: '+15% Month', color: 'cyan', icon: Container },
  { title: 'Cluster Fleet', value: '42', trend: 'Global Distribution', color: 'blue', icon: Cloud },
  { title: 'Deploy Success', value: '99.98%', trend: 'Rollback Rate: 0.02%', color: 'emerald', icon: CheckCircle2 },
  { title: 'CPU Utilization', value: '68.4%', trend: 'Target: 75%', color: 'indigo', icon: Cpu },
];

const RuntimeDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Runtime Intelligence</h1>
          <p className="text-slate-400">Standardized workload orchestration and runtime governance across Kubernetes.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Scale Cluster Fleet
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Initiate Deployment
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deployment Trend */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Workload Deployment Velocity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={runtimeData}>
                <defs>
                  <linearGradient id="colorDeployments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="deployments" stroke="#06b6d4" fill="url(#colorDeployments)" name="Deployments" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Namespace Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Namespace Usage (Top 5)</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'core-banking-prod', usage: 84, pods: 450, color: 'bg-emerald-500' },
              { name: 'payment-api-stage', usage: 62, pods: 120, color: 'bg-cyan-500' },
              { name: 'data-lake-worker', usage: 45, pods: 85, color: 'bg-blue-500' },
              { name: 'auth-svc-prod', usage: 38, pods: 60, color: 'bg-indigo-500' },
              { name: 'legacy-monolith', usage: 22, pods: 15, color: 'bg-slate-500' },
            ].map((ns) => (
              <div key={ns.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{ns.name}</span>
                  <span className="text-slate-400">{ns.pods} Pods</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${ns.color}`} style={{ width: `${ns.usage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Runtime Deployments */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Live Runtime Rollouts</h3>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View Canary Status</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Workload Name</th>
                <th className="px-6 py-4 font-semibold">Strategy</th>
                <th className="px-6 py-4 font-semibold">Cluster</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Rollout %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'Payments-Gateway', strategy: 'BLUE_GREEN', cluster: 'AWS-EKS-PROD-01', status: 'SWITCHING_TRAFFIC', progress: 50 },
                { name: 'Auth-API-V2', strategy: 'CANARY', cluster: 'GCP-GKE-STAGE-04', status: 'ANALYZING_METRICS', progress: 15 },
                { name: 'User-Profile-DB', strategy: 'ROLLING_UPDATE', cluster: 'AZR-AKS-PROD-02', status: 'COMPLETED', progress: 100 },
                { name: 'Search-Indexer', strategy: 'RECREATE', cluster: 'ON-PREM-K8S-01', status: 'PENDING', progress: 0 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.strategy}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded border border-slate-700">{row.cluster}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${row.progress === 100 ? 'bg-emerald-500' : 'bg-cyan-500 animate-pulse'}`}></div>
                      <span className="text-xs text-slate-300">{row.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full" style={{ width: `${row.progress}%` }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RuntimeDashboard;
