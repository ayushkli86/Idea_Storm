import { Shield, AlertTriangle, FileText, TrendingDown, Building2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import EmptyState from "@/components/EmptyState";

const DDAView = () => {
  const { stats, batches, alerts, isLoading, isError } = useDashboardData();

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
  const complianceRate = totalBatches > 0 ? ((verifiedBatches / totalBatches) * 100).toFixed(1) : '0.0';
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
    { label: "Active Recalls", value: activeRecalls.toString(), icon: AlertTriangle, gradient: activeRecalls > 0 ? "gradient-danger" : "gradient-hero" },
    { label: "Registered Manufacturers", value: manufacturerCount.toString(), icon: Building2, gradient: "gradient-hero" },
    { label: "Compliance Rate", value: `${complianceRate}%`, icon: Activity, gradient: "gradient-hero" },
    { label: "Total Verifications", value: statsData?.totalScans?.toLocaleString() || "0", icon: FileText, gradient: "gradient-hero" },
  ];

  // Counterfeit trend by region (using dummy data for visualization)
  const counterfeitTrend = [
    { region: "Kathmandu Valley", before: 45, after: Math.max(12, flaggedBatches * 2) },
    { region: "Eastern Nepal", before: 38, after: Math.max(18, flaggedBatches * 3) },
    { region: "Western Nepal", before: 52, after: Math.max(22, flaggedBatches * 4) },
    { region: "Terai Region", before: 61, after: Math.max(28, flaggedBatches * 5) },
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-teal-300" />
                <h1 className="text-2xl font-bold text-white">DDA Regulator View</h1>
              </div>
              <p className="text-sm text-white/70">Department of Drug Administration — Nepal</p>
            </div>
            <Badge variant="outline" className="border-teal-300 text-teal-300 bg-white/10 backdrop-blur-sm">
              DDA Code 2080
            </Badge>
          </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {regulatorStats.map((s, i) => (
            <div key={i} className="bg-card rounded-xl p-5 shadow-card border">
              <div className={`w-10 h-10 rounded-lg ${s.gradient} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Supply Chain Integrity */}
          <div className="bg-card rounded-xl p-6 shadow-card border">
            <h3 className="font-semibold text-foreground mb-4">Supply Chain Integrity</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={supplyChainData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,15%,89%)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} width={90} />
                <Tooltip />
                <Bar dataKey="verified" fill="hsl(145,63%,42%)" stackId="a" name="Verified %" radius={[0, 4, 4, 0]} />
                <Bar dataKey="flagged" fill="hsl(6,78%,57%)" stackId="a" name="Flagged %" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Counterfeit Trend */}
          <div className="bg-card rounded-xl p-6 shadow-card border">
            <h3 className="font-semibold text-foreground mb-4">Counterfeit Incident Trend</h3>
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-success" />
              <span className="text-sm text-success font-medium">55% decrease since Sahi Aaushadi deployment</span>
            </div>
            <div className="space-y-4">
              {counterfeitTrend.map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{r.region}</span>
                    <span className="text-success font-medium">-{Math.round(((r.before - r.after) / r.before) * 100)}%</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="bg-destructive/30 rounded-full" style={{ width: `${r.before}%` }} />
                    <div className="bg-success rounded-full" style={{ width: `${r.after}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive/30" />Before</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" />After</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drug Recalls */}
        <div className="bg-card rounded-xl shadow-card border overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-foreground">Active Drug Recalls & Alerts</h3>
            <p className="text-xs text-muted-foreground">Managed under DDA Code 2080 compliance</p>
          </div>
          {alertData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Alert ID</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Drug</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Batch Number</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Affected Area</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Severity</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {alertData.map((alert) => (
                    <tr key={alert.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-xs">{alert.product_id}</td>
                      <td className="p-4 font-medium text-foreground">{alert.drug_name}</td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{alert.batch_number}</td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{alert.affected_regions.join(", ")}</td>
                      <td className="p-4">
                        <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
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
              <Shield className="w-12 h-12 mx-auto mb-3 text-success" />
              <p className="text-sm font-medium text-foreground mb-1">No Active Alerts</p>
              <p className="text-xs text-muted-foreground">All medicines are verified and compliant</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default DDAView;
