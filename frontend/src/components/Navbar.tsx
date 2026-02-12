import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const links = [
    { to: "/", label: "Home" },
    { to: "/verify", label: "Verify Medicine" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/regulator", label: "DDA View" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate('/login');
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive"
      });
    }
  };

  const userName = user?.user_metadata?.name || user?.email || "User";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/30">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white">Sahi Aaushadi</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(l.to)
                  ? "bg-white/20 text-white backdrop-blur-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <User className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{userName}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleLogout}
            className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                isActive(l.to)
                  ? "bg-white/20 text-white backdrop-blur-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-lg mt-2 border border-white/20">
            <User className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">{userName}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleLogout}
            className="w-full gap-2 mt-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
