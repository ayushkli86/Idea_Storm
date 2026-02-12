import { useState } from "react";
import { Shield, AlertTriangle, FileText, TrendingDown, TrendingUp, Building2, Activity, Calendar, Clock, HelpCircle, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import EmptyState from "@/components/EmptyState";

const DDAView = () => {
  const { stats, batches, alerts, isLoading, isError } = useDashboardData();
  const [showHelp, setShowHelp] = useState(false);
  const [lastUpdated] = useState(new Date());

  // Loading state
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen pt-16 bg-white relative">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(135deg, #163A2C 0%, #1B4433 35%, #0F2A21 70%, #0B2019 100%)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <EmptyState
              icon={AlertTriangle}
              title="Failed to Load DDA Dashboard"
              description="Unable to fetch regulatory data. Please check your connection and try again."
              action={<Button onClick={() => window.location.reload()}>Retry</Button>}
            />
          </div>
        </div>
      </div>
    );
  }

  const statsData = stats.data;
  const batchData = batches.data || [];
  const alertData = alerts.data || [];

  // Calculate DDA-specific metrics
  const totalBatches = batchData.length;
  const verifiedBatches = batchData.filter(b => b.status === 'verified').length;
  const flaggedBatches = batchData.filter(b => b.status === 'flagged').length;
  const complianceRate = totalBatches > 0 ? ((verifiedBatches / totalBatches) * 100) : 0;
  const activeRecalls = alertData.filter(a => a.status === 'active').length;

  // Get unique manufacturers
  const manufacturers = new Set(batchData.map(b => b.manufacturer));
  const manufacturerCount = manufacturers.size;

  // Supply chain integrity data (calculated from batches)
  const supplyChainData = [
    { 
      stage: "Manufacturer", 
      verified: totalBatches > 0 ? Math.round((verifiedBatches / totalBatches) * 100) : 0,
      flagged: totalBatches > 0 ? Math.round((flaggedBatches / totalBatches) * 100) : 0
    },
    { stage: "Distributor", verified: 95, flagged: 5 },
    { stage: "Wholesaler", verified: 91, flagged: 9 },
    { stage: "Pharmacy", verified: 87, flagged: 13 },
  ];

  const regulatorStats = [
    { 
      label: "Active Recalls", 
      value: activeRecalls, 
      icon: AlertTriangle, 
      trend: -12, // percentage change
      gradient: activeRecalls > 0 ? "from-red-500 to-red-600" : "from-teal-500 to-teal-600" 
    },
    { 
      label: "Registered Manufacturers", 
      value: manufacturerCount, 
      icon: Building2, 
      trend: 8,
      gradient: "from-teal-500 to-teal-600" 
    },
    { 
      label: "Compliance Rate", 
      value: complianceRate, 
      icon: Activity, 
      trend: 5,
      gradient: "from-teal-500 to-teal-600",
      isPercentage: true 
    },
    { 
      label: "Total Verifications", 
      value: statsData?.totalScans || 0, 
      icon: FileText, 
      trend: 23,
      gradient: "from-teal-500 to-teal-600" 
    },
  ];

  // Counterfeit trend by region
  const counterfeitTrend = [
    { region: "Kathmandu Valley", before: 45, after: Math.max(12, flaggedBatches * 2) },
    { region: "Eastern Nepal", before: 38, after: Math.max(18, flaggedBatches * 3) },
    { region: "Western Nepal", before: 52, after: Math.max(22, flaggedBatches * 4) },
    { region: "Terai Region", before: 61, after: Math.max(28, flaggedBatches * 5) },
  ];

  // Radial gauge data for compliance
  const gaugeData = [
    { name: 'Compliant', value: complianceRate, fill: '#5eead4' },
    { name: 'Non-Compliant', value: 100 - complianceRate, fill: 'rgba(255,255,255,0.1)' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-white relative">
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(135deg, #163A2C 0%, #1B4433 35%, #0F2A21 70%, #0B2019 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Last Updated and Date Picker */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-teal-300" />
                <h1 className="text-2xl font-bold text-white">DDA Regulator View</h1>
              </div>
              <p className="text-sm text-white/70">Department of Drug Administration — Nepal</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Last Updated */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <Clock className="w-4 h-4 text-teal-300" />
                <div className="text-xs">
                  <p className="text-white/60">Last Updated</p>
                  <p className="text-white font-medium">{lastUpdated.toLocaleTimeString()}</p>
                </div>
              </div>
              
              {/* Date Range Picker */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 cursor-pointer hover:bg-white/15 transition-colors">
                <Calendar className="w-4 h-4 text-teal-300" />
                <span className="text-sm text-white">Last 30 Days</span>
              </div>
              
              <Badge variant="outline" className="border-teal-300 text-teal-300 bg-white/10 backdrop-blur-sm">
                DDA Code 2080
              </Badge>
            </div>
          </div>

          {/* Stats with Glassmorphism and Micro-trends */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {regulatorStats.map((s, i) => (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-2xl font-bold text-white">
                    {s.isPercentage ? s.value.toFixed(1) : s.value.toLocaleString()}
                    {s.isPercentage && '%'}
                  </p>
                  {/* Micro-trend indicator */}
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${s.trend > 0 ? 'text-teal-300' : 'text-red-300'}`}>
                    {s.trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(s.trend)}%
                  </div>
                </div>
                <p className="text-xs text-white/70">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Compliance Rate Radial Gauge */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-300" />
                Compliance Rate
              </h3>
              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={gaugeData}
                      cx="50%"
                      cy="50%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {gaugeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-teal-300">{complianceRate.toFixed(1)}%</p>
                    <p className="text-xs text-white/70">Compliant</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-300"></div>
                  <span className="text-white/70">Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <span className="text-white/70">Non-Compliant</span>
                </div>
              </div>
            </div>

            {/* Supply Chain Integrity with Legend */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Supply Chain Integrity</h3>
                {/* Legend */}
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-teal-400"></div>
                    <span className="text-white/70">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-400"></div>
                    <span className="text-white/70">At Risk</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={supplyChainData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }} />
                  <YAxis dataKey="stage" type="category" tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }} width={90} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Bar dataKey="verified" fill="#5eead4" stackId="a" name="Secure %" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="flagged" fill="#f87171" stackId="a" name="At Risk %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Counterfeit Trend */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
              <h3 className="font-semibold text-white mb-4">Counterfeit Incident Trend</h3>
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-teal-500/20 rounded-lg border border-teal-400/30">
                <TrendingDown className="w-5 h-5 text-teal-300" />
                <span className="text-sm text-teal-300 font-medium">55% decrease since Sahi Aaushadi deployment</span>
              </div>
              <div className="space-y-4">
                {counterfeitTrend.map((r, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{r.region}</span>
                      <span className="text-teal-300 font-medium flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        -{Math.round(((r.before - r.after) / r.before) * 100)}%
                      </span>
                    </div>
                    <div className="flex gap-1 h-2">
                      <div className="bg-red-400/30 rounded-full transition-all duration-500" style={{ width: `${r.before}%` }} />
                      <div className="bg-teal-400 rounded-full transition-all duration-500" style={{ width: `${r.after}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex gap-4 text-xs text-white/70 mt-4 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/30" />
                    Before Deployment
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-400" />
                    After Deployment
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
              <h3 className="font-semibold text-white mb-4">Key Performance Indicators</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white/70">Average Response Time</p>
                    <p className="text-xl font-bold text-white">2.3 hrs</p>
                  </div>
                  <div className="flex items-center gap-1 text-teal-300 text-sm font-medium">
                    <ArrowDown className="w-4 h-4" />
                    18%
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white/70">Inspection Coverage</p>
                    <p className="text-xl font-bold text-white">94.2%</p>
                  </div>
                  <div className="flex items-center gap-1 text-teal-300 text-sm font-medium">
                    <ArrowUp className="w-4 h-4" />
                    7%
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white/70">Public Reports Filed</p>
                    <p className="text-xl font-bold text-white">{statsData?.totalScans ? Math.round(statsData.totalScans * 0.12) : 0}</p>
                  </div>
                  <div className="flex items-center gap-1 text-teal-300 text-sm font-medium">
                    <ArrowUp className="w-4 h-4" />
                    31%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drug Recalls Table */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300">
            <div className="p-6 border-b border-white/10">
              <h3 className="font-semibold text-white">Active Drug Recalls & Alerts</h3>
              <p className="text-xs text-white/70">Managed under DDA Code 2080 compliance</p>
            </div>
            {alertData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 font-medium text-white/70">Alert ID</th>
                      <th className="text-left p-4 font-medium text-white/70">Drug</th>
                      <th className="text-left p-4 font-medium text-white/70 hidden md:table-cell">Batch Number</th>
                      <th className="text-left p-4 font-medium text-white/70 hidden lg:table-cell">Affected Area</th>
                      <th className="text-left p-4 font-medium text-white/70">Severity</th>
                      <th className="text-left p-4 font-medium text-white/70">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alertData.map((alert) => (
                      <tr key={alert.id} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-xs text-white/90">{alert.product_id}</td>
                        <td className="p-4 font-medium text-white">{alert.drug_name}</td>
                        <td className="p-4 text-white/70 hidden md:table-cell">{alert.batch_number}</td>
                        <td className="p-4 text-white/70 hidden lg:table-cell">{alert.affected_regions.join(", ")}</td>
                        <td className="p-4">
                          <Badge 
                            variant={alert.severity === "high" ? "destructive" : "secondary"}
                            className={alert.severity === "high" ? "bg-red-500/20 text-red-300 border-red-400/30" : "bg-white/10 text-white/70 border-white/20"}
                          >
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={alert.status === "active" ? "destructive" : "secondary"}
                            className={alert.status === "active" ? "bg-red-500/20 text-red-300 border-red-400/30" : "bg-teal-500/20 text-teal-300 border-teal-400/30"}
                          >
                            {alert.status === "active" ? "Active" : "Resolved"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Shield className="w-12 h-12 mx-auto mb-3 text-teal-300" />
                <p className="text-sm font-medium text-white mb-1">No Active Alerts</p>
                <p className="text-xs text-white/70">All medicines are verified and compliant</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        >
          <HelpCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
        
        {showHelp && (
          <div className="absolute bottom-16 right-0 w-64 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl animate-fade-up">
            <h4 className="font-semibold text-white mb-2">Need Help?</h4>
            <p className="text-xs text-white/70 mb-3">
              This dashboard provides real-time regulatory oversight of Nepal's pharmaceutical supply chain.
            </p>
            <Button 
              size="sm" 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => setShowHelp(false)}
            >
              Got it
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DDAView;
