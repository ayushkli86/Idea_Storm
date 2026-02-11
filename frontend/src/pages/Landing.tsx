import { Link } from "react-router-dom";
import { Shield, QrCode, Lock, BarChart3, Globe, CheckCircle2, ChevronRight, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const features = [
  {
    icon: QrCode,
    title: "QR Verification",
    desc: "Every medicine strip has a unique encrypted QR code. Scan to verify authenticity instantly.",
  },
  {
    icon: Blocks,
    title: "Blockchain Ledger",
    desc: "Immutable, tamper-proof records stored on a decentralized blockchain network.",
  },
  {
    icon: Lock,
    title: "AES-256 Encryption",
    desc: "Industry-standard encryption protects all data across the supply chain.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Track scanning patterns and detect counterfeit anomalies across regions.",
  },
];

const stats = [
  { value: "1 in 10", label: "Medicines falsified in low-income countries" },
  { value: "15%", label: "Nepali market affected by substandard drugs" },
  { value: "100K+", label: "Lives at risk from counterfeit medicine yearly" },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 gradient-dark opacity-95" />
        <img
          src={heroImage}
          alt="Blockchain medicine verification"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-sm font-medium text-primary">
              <Shield className="w-4 h-4" />
              Blockchain-Powered Verification
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary-foreground leading-tight">
              Eliminating Counterfeit Medicines from{" "}
              <span className="text-gradient">Nepal's Supply Chain</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
              Sahi Aaushadi uses blockchain-backed QR verification to ensure every medicine you take is authentic, safe, and traceable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/verify">
                <Button size="lg" className="gradient-hero text-primary-foreground border-0 glow-green text-base px-8 h-12">
                  <QrCode className="w-5 h-5 mr-2" />
                  Verify Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8">
                  Partner Login
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient">{s.value}</div>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our multi-layer security framework ensures complete transparency from manufacturer to patient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-card rounded-xl p-6 shadow-card border hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:glow-green transition-shadow">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Globe className="w-10 h-10 text-secondary mx-auto" />
            <h2 className="text-3xl font-bold text-foreground">DDA Code 2080 Compliant</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fully aligned with Nepal's Department of Drug Administration regulations for pharmaceutical tracking and verification.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {["AES-256 Encryption", "Immutable Ledger", "OAuth 2.0 Auth", "API Rate Limiting"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-dark py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary-foreground">Sahi Aaushadi</span>
          </div>
          <p className="text-sm text-primary-foreground/50">
            © 2026 Sahi Aaushadi. Securing Nepal's pharmaceutical supply chain.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
