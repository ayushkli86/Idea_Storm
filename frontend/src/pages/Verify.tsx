import { useState } from "react";
import { QrCode, Shield, ShieldAlert, ShieldCheck, Package, Calendar, Hash, MapPin, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type VerifyStatus = "idle" | "scanning" | "authentic" | "counterfeit";

const mockDrugData = {
  name: "Amoxicillin 500mg",
  manufacturer: "Nepal Pharma Pvt. Ltd.",
  batchNumber: "NPL-2026-AMX-0847",
  expiryDate: "March 2028",
  uniqueId: "SA-7f3a9b2e-4d1c-8e5f",
  blockchainTx: "0x8a3f...e7d2",
  verifiedAt: "Kathmandu, Nepal",
};

const Verify = () => {
  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [code, setCode] = useState("");

  const handleScan = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus(code.toLowerCase().includes("fake") ? "counterfeit" : "authentic");
    }, 2000);
  };

  const handleReset = () => {
    setStatus("idle");
    setCode("");
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Verify Your Medicine</h1>
          <p className="text-muted-foreground text-sm">
            Scan the QR code or enter the unique code to verify authenticity
          </p>
        </div>

        {status === "idle" && (
          <div className="space-y-6 animate-fade-up">
            {/* QR Scanner Simulation */}
            <div className="relative bg-card rounded-2xl border-2 border-dashed border-primary/30 p-12 flex flex-col items-center gap-4">
              <div className="relative">
                <QrCode className="w-20 h-20 text-primary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full gradient-hero animate-pulse-glow" />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Tap to scan QR code</p>
              <Button onClick={handleScan} className="gradient-hero text-primary-foreground border-0">
                <QrCode className="w-4 h-4 mr-2" />
                Simulate Scan
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">or enter code</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder='Enter code (type "fake" to test alert)'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleScan} disabled={!code} className="gradient-hero text-primary-foreground border-0">
                Verify
              </Button>
            </div>
          </div>
        )}

        {status === "scanning" && (
          <div className="bg-card rounded-2xl border p-12 flex flex-col items-center gap-4 animate-fade-up">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
            <div className="text-center space-y-2">
              <p className="font-semibold text-foreground">Querying Blockchain...</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>→ Decrypting AES-256 hash...</p>
                <p>→ Validating on immutable ledger...</p>
                <p>→ Cross-referencing batch data...</p>
              </div>
            </div>
          </div>
        )}

        {status === "authentic" && (
          <div className="space-y-4 animate-fade-up">
            <div className="bg-card rounded-2xl border-2 border-success p-6 glow-green">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-success-foreground" />
                </div>
                <div>
                  <p className="font-bold text-lg text-success">Authentic Medicine</p>
                  <p className="text-xs text-muted-foreground">Blockchain verified ✓</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Package, label: "Drug Name", value: mockDrugData.name },
                  { icon: Shield, label: "Manufacturer", value: mockDrugData.manufacturer },
                  { icon: Hash, label: "Batch Number", value: mockDrugData.batchNumber },
                  { icon: Calendar, label: "Expiry Date", value: mockDrugData.expiryDate },
                  { icon: Hash, label: "Unique ID", value: mockDrugData.uniqueId },
                  { icon: MapPin, label: "Verified At", value: mockDrugData.verifiedAt },
                  { icon: Clock, label: "Blockchain Tx", value: mockDrugData.blockchainTx },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                    <item.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Verify Another
            </Button>
          </div>
        )}

        {status === "counterfeit" && (
          <div className="space-y-4 animate-fade-up">
            <div className="bg-card rounded-2xl border-2 border-destructive p-6" style={{ boxShadow: "0 0 40px hsl(6 78% 57% / 0.2)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full gradient-danger flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-destructive-foreground" />
                </div>
                <div>
                  <p className="font-bold text-lg text-destructive">⚠ Counterfeit Alert</p>
                  <p className="text-xs text-muted-foreground">This code has been flagged</p>
                </div>
              </div>

              <div className="bg-destructive/10 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-destructive">Warning: Do not consume this medicine.</p>
                <p className="text-xs text-muted-foreground">
                  This QR code has been reported in multiple locations simultaneously, indicating a potential counterfeit.
                  Please report this to your nearest pharmacy or contact DDA Nepal.
                </p>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
                <p>Report Code: <span className="font-mono font-medium text-foreground">RPT-{Date.now().toString(36).toUpperCase()}</span></p>
                <p>Flagged Locations: Kathmandu, Pokhara (simultaneous scan detected)</p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Verify Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
