import { Link } from "react-router-dom";
import { Shield, QrCode, MapPin, Bell, CheckCircle2, ChevronRight, Award, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../styles/verify-animations.css";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white relative font-sans">
      {/* Radial Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              {/* Hero Content */}
              <div className="text-center space-y-8 mb-16">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 text-sm font-bold text-white shadow-lg">
                  <Shield className="w-5 h-5" />
                  Blockchain-Powered Medicine Verification
                </div>
                
                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  Authentic Medicine,<br />
                  <span className="text-emerald-200">Healthy Nepal</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium">
                  Protecting lives through blockchain verification. Every scan ensures your medicine is genuine, safe, and traceable.
                </p>
              </div>

              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Verify Medicine Card */}
                <Link to="/verify" className="group">
                  <div className="button-3d bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-300 h-full shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <QrCode className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Verify Medicine</h3>
                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                          Scan QR code or enter product ID to verify authenticity instantly
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <span>Start Verification</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Find Pharmacy Card */}
                <div className="group cursor-pointer">
                  <div className="button-3d bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-300 h-full shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <MapPin className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Find Pharmacy</h3>
                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                          Locate verified pharmacies near you with authentic medicines
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <span>Coming Soon</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Alerts Card */}
                <div className="group cursor-pointer">
                  <div className="button-3d bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-300 h-full shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-20 h-20 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Bell className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Emergency Alerts</h3>
                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                          Get instant alerts about counterfeit medicine recalls
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <span>Coming Soon</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals Section */}
        <section className="py-16 bg-white/10 backdrop-blur-sm border-y border-white/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto border-2 border-white/30">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm">Blockchain Secured</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto border-2 border-white/30">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm">DDA Approved</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto border-2 border-white/30">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm">Real-time Tracking</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto border-2 border-white/30">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm">Counterfeit Detection</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why It Matters</h2>
                <p className="text-white/80 text-lg font-medium">The counterfeit medicine crisis in Nepal</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 text-center shadow-xl">
                  <div className="text-5xl md:text-6xl font-black text-emerald-200 mb-3">1 in 10</div>
                  <p className="text-white/90 font-semibold leading-relaxed">Medicines falsified in low-income countries</p>
                </div>
                <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 text-center shadow-xl">
                  <div className="text-5xl md:text-6xl font-black text-emerald-200 mb-3">15%</div>
                  <p className="text-white/90 font-semibold leading-relaxed">Nepali market affected by substandard drugs</p>
                </div>
                <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30 text-center shadow-xl">
                  <div className="text-5xl md:text-6xl font-black text-emerald-200 mb-3">100K+</div>
                  <p className="text-white/90 font-semibold leading-relaxed">Lives at risk from counterfeit medicine yearly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Official Seal */}
        <footer className="bg-black/40 backdrop-blur-md py-12 border-t-2 border-white/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-6">
              {/* Official DDA Nepal Seal */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4 border-2 border-white/40 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
                    <Shield className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg">Official DDA Nepal</p>
                    <p className="text-white/80 text-sm font-semibold">Department of Drug Administration</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-300" />
                </div>
                <span className="font-black text-xl text-white">Sahi Aaushadi</span>
              </div>
              
              <p className="text-sm text-white/70 text-center font-medium">
                © 2026 Sahi Aaushadi. Securing Nepal's pharmaceutical supply chain.
              </p>
              
              <div className="flex items-center gap-3 text-xs text-white/60 font-semibold">
                <span>Powered by Blockchain</span>
                <span>•</span>
                <span>DDA Code 2080 Compliant</span>
                <span>•</span>
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
