import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Globe
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import BarChart from '../../components/BarChart';
import axios from 'axios';

export default function SuperAdminDashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseUrl = process.env.REACT_APP_BASE_URL?.endsWith('/') 
          ? process.env.REACT_APP_BASE_URL.slice(0, -1) 
          : process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${baseUrl}/dashboard/super-admin-stats`);
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching super admin stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold mb-2">Failed to load dashboard</p>
          <p className="text-sm">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl">Retry</button>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Companies', value: stats?.totalCompanies || 0, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Total Jobs', value: stats?.totalJobs || 0, icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { title: 'Applications', value: stats?.totalApplications || 0, icon: FileText, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ];

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <Globe className="text-indigo-500 animate-pulse" />
              Global <span className="text-indigo-500">Command</span> Center
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Managing the ecosystem at a glance. Everything looks optimal.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/super-admin/add-company')}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <Plus size={20} />
              New Company
            </button>
            <div className={`p-4 rounded-2xl glass-card flex items-center gap-3 border ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
              <ShieldCheck className="text-green-500" />
              <span className="text-sm font-bold truncate">System Secure</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className={`p-6 rounded-3xl glass-card border transition-all hover:-translate-y-2 group ${theme === 'dark' ? 'border-slate-800 hover:border-indigo-500/50' : 'border-white hover:border-indigo-200'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${card.bg}`}>
                  <card.icon className={card.color} size={24} />
                </div>
                <ArrowUpRight className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
              </div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{card.title}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-black">{card.value}</h3>
                <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                  <Activity size={12} /> Live
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Companies Stats Chart */}
          <div className={`lg:col-span-2 p-8 rounded-3xl glass-card border ${theme === 'dark' ? 'border-slate-800' : 'border-white shadow-xl shadow-slate-200/50'}`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black">Top Performing Companies</h2>
              <select className={`bg-transparent border-none text-sm font-bold focus:ring-0 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                <option>By Job Count</option>
                <option>By Applications</option>
              </select>
            </div>
            <div className="h-[300px]">
              <BarChart data={stats?.companyStats?.map(s => ({ job: s.companyName, applications: s.jobCount })) || []} />
            </div>
          </div>

          {/* Right Column Lists */}
          <div className="flex flex-col gap-6">
            {/* Recent Companies */}
            <div className={`p-8 rounded-3xl glass-card border ${theme === 'dark' ? 'border-slate-800' : 'border-white shadow-xl shadow-slate-200/50'}`}>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Building2 size={24} className="text-blue-500" />
                Recent Companies
              </h2>
              <div className="space-y-4">
                {stats?.recentCompanies?.map((company) => (
                  <div key={company._id} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-indigo-500/5 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black">
                        {(company.companyName || company.name || '?').charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">{company.companyName || company.name || 'Unknown'}</h4>
                        <p className="text-[10px] text-slate-500">{new Date(company.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className={`p-8 rounded-3xl glass-card border ${theme === 'dark' ? 'border-slate-800' : 'border-white shadow-xl shadow-slate-200/50'}`}>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Users size={24} className="text-purple-500" />
                Recent Users
              </h2>
              <div className="space-y-4">
                {stats?.recentUsers?.map((user) => (
                  <div key={user._id} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-purple-500/5 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-black">
                        {(user.userName || user.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs truncate max-w-[100px]">{user.userName || user.name || 'Unknown'}</h4>
                        <p className="text-[10px] text-slate-500 truncate max-w-[100px]">{user.email || ''}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-500/10 text-slate-500">
                      {user.role || 'user'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
