import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Shield, AlertTriangle, Package, QrCode, MapPin, TrendingUp, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const scanData = [
  { city: "Kathmandu", scans: 4523 },
  { city: "Pokhara", scans: 2891 },
  { city: "Biratnagar", scans: 1845 },
  { city: "Lalitpur", scans: 1632 },
  { city: "Bharatpur", scans: 1204 },
  { city: "Birgunj", scans: 956 },
];

const trendData = [
  { month: "Aug", scans: 12400, alerts: 23 },
  { month: "Sep", scans: 15600, alerts: 31 },
  { month: "Oct", scans: 18200, alerts: 18 },
  { month: "Nov", scans: 22100, alerts: 42 },
  { month: "Dec", scans: 28500, alerts: 27 },
  { month: "Jan", scans: 34200, alerts: 15 },
  { month: "Feb", scans: 38700, alerts: 12 },
];

const pieData = [
  { name: "Authentic", value: 94.2, color: "hsl(145, 63%, 42%)" },
  { name: "Flagged", value: 4.1, color: "hsl(45, 93%, 47%)" },
  { name: "Counterfeit", value: 1.7, color: "hsl(6, 78%, 57%)" },
];

const alerts = [
  { id: 1, batch: "NPL-2026-PAR-1234", drug: "Paracetamol 500mg", cities: ["Kathmandu", "Pokhara"], time: "12 min ago", severity: "high" },
  { id: 2, batch: "NPL-2026-AMX-0847", drug: "Amoxicillin 250mg", cities: ["Biratnagar", "Birgunj"], time: "1 hr ago", severity: "high" },
  { id: 3, batch: "NPL-2026-IBU-2091", drug: "Ibuprofen 400mg", cities: ["Lalitpur"], time: "3 hrs ago", severity: "medium" },
];

const batches = [
  { id: "NPL-2026-AMX-0847", drug: "Amoxicillin 500mg", qty: 50000, date: "2026-01-15", status: "verified", scans: 4231 },
  { id: "NPL-2026-PAR-1234", drug: "Paracetamol 500mg", qty: 100000, date: "2026-01-20", status: "verified", scans: 8102 },
  { id: "NPL-2026-CIP-0391", drug: "Ciprofloxacin 250mg", qty: 30000, date: "2026-02-01", status: "verified", scans: 1856 },
  { id: "NPL-2026-MET-0562", drug: "Metformin 500mg", qty: 75000, date: "2026-02-05", status: "pending", scans: 0 },
  { id: "NPL-2026-IBU-2091", drug: "Ibuprofen 400mg", qty: 60000, date: "2026-02-08", status: "flagged", scans: 3412 },
];

const statCards = [
  { label: "Total Scans", value: "38,700", change: "+12.4%", icon: QrCode, gradient: "gradient-hero" },
  { label: "Active Batches", value: "247", change: "+8", icon: Package, gradient: "gradient-hero" },
  { label: "Counterfeit Alerts", value: "12", change: "-55%", icon: AlertTriangle, gradient: "gradient-danger" },
  { label: "Cities Covered", value: "32", change: "+4", icon: MapPin, gradient: "gradient-hero" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pharma Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time supply chain monitoring</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Alerts</span>
            <Badge variant="destructive" className="h-5 px-1.5 text-xs">3</Badge>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div key={i} className="bg-card rounded-xl p-5 shadow-card border">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${s.gradient} flex items-center justify-center`}>
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className={`text-xs font-medium ${s.change.startsWith("-") && s.label.includes("Alert") ? "text-success" : "text-success"} flex items-center gap-0.5`}>
                  <TrendingUp className="w-3 h-3" />
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Counterfeit Alerts</TabsTrigger>
            <TabsTrigger value="batches">Batch Management</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scanning by City */}
              <div className="bg-card rounded-xl p-6 shadow-card border">
                <h3 className="font-semibold text-foreground mb-4">Scans by City</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={scanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,15%,89%)" />
                    <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="scans" fill="hsl(145,63%,42%)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Verification Distribution */}
              <div className="bg-card rounded-xl p-6 shadow-card border">
                <h3 className="font-semibold text-foreground mb-4">Verification Results</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value">
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-5 mt-2">
                  {pieData.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground">{d.name} ({d.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend */}
            <div className="bg-card rounded-xl p-6 shadow-card border">
              <h3 className="font-semibold text-foreground mb-4">Monthly Scan Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,15%,89%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="scans" stroke="hsl(204,70%,53%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {alerts.map((a) => (
              <div key={a.id} className="bg-card rounded-xl p-5 shadow-card border border-destructive/20 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-10 h-10 rounded-lg gradient-danger flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground text-sm">{a.drug}</p>
                    <Badge variant="destructive" className="text-xs">{a.severity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Batch <span className="font-mono">{a.batch}</span> scanned simultaneously in{" "}
                    <span className="font-medium text-foreground">{a.cities.join(" & ")}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="batches">
            <div className="bg-card rounded-xl shadow-card border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">Batch ID</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Drug</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Quantity</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Mfg Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Scans</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((b) => (
                      <tr key={b.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-mono text-xs">{b.id}</td>
                        <td className="p-4 font-medium text-foreground">{b.drug}</td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{b.qty.toLocaleString()}</td>
                        <td className="p-4 text-muted-foreground hidden lg:table-cell">{b.date}</td>
                        <td className="p-4">
                          <Badge
                            variant={b.status === "verified" ? "default" : b.status === "flagged" ? "destructive" : "secondary"}
                            className={b.status === "verified" ? "bg-success text-success-foreground" : ""}
                          >
                            {b.status === "verified" && <Shield className="w-3 h-3 mr-1" />}
                            {b.status === "verified" ? "Blockchain Verified" : b.status === "flagged" ? "Flagged" : "Pending"}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground hidden md:table-cell">{b.scans.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
