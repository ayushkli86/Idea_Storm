import { Shield, AlertTriangle, FileText, TrendingDown, Building2, Activity, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const recallData = [
  { id: "DDA-RC-001", drug: "Counterfeit Paracetamol 500mg", manufacturer: "Unknown", date: "2026-02-08", status: "active", affected: "Kathmandu Valley" },
  { id: "DDA-RC-002", drug: "Substandard Amoxicillin 250mg", manufacturer: "XYZ Pharma", date: "2026-01-28", status: "active", affected: "Eastern Nepal" },
  { id: "DDA-RC-003", drug: "Expired Metformin 500mg", manufacturer: "ABC Labs", date: "2026-01-15", status: "resolved", affected: "Pokhara" },
];

const supplyChainData = [
  { stage: "Manufacturer", verified: 98, flagged: 2 },
  { stage: "Distributor", verified: 95, flagged: 5 },
  { stage: "Wholesaler", verified: 91, flagged: 9 },
  { stage: "Pharmacy", verified: 87, flagged: 13 },
];

const regulatorStats = [
  { label: "Active Recalls", value: "2", icon: AlertTriangle, gradient: "gradient-danger" },
  { label: "Registered Manufacturers", value: "156", icon: Building2, gradient: "gradient-hero" },
  { label: "Compliance Rate", value: "94.2%", icon: Activity, gradient: "gradient-hero" },
  { label: "Reports Filed", value: "847", icon: FileText, gradient: "gradient-hero" },
];

const DDAView = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-secondary" />
              <h1 className="text-2xl font-bold text-foreground">DDA Regulator View</h1>
            </div>
            <p className="text-sm text-muted-foreground">Department of Drug Administration — Nepal</p>
          </div>
          <Badge variant="outline" className="border-secondary text-secondary">
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
              {[
                { region: "Kathmandu Valley", before: 45, after: 12 },
                { region: "Eastern Nepal", before: 38, after: 18 },
                { region: "Western Nepal", before: 52, after: 22 },
                { region: "Terai Region", before: 61, after: 28 },
              ].map((r, i) => (
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
            <h3 className="font-semibold text-foreground">Active Drug Recalls</h3>
            <p className="text-xs text-muted-foreground">Managed under DDA Code 2080 compliance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Recall ID</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Drug</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Manufacturer</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Affected Area</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {recallData.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{r.id}</td>
                    <td className="p-4 font-medium text-foreground">{r.drug}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{r.manufacturer}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{r.affected}</td>
                    <td className="p-4">
                      <Badge variant={r.status === "active" ? "destructive" : "secondary"}>
                        {r.status === "active" ? "Active Recall" : "Resolved"}
                      </Badge>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        View <ExternalLink className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DDAView;
