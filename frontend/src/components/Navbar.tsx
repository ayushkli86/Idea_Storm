import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setUserName(userData.name || userData.email);
    }
  }, [location]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/verify", label: "Verify Medicine" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/regulator", label: "DDA View" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserName("");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">Sahi Aaushadi</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(l.to)
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">{userName}</span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm font-semibold">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                isActive(l.to)
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-lg mt-2">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">{userName}</span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleLogout}
                className="w-full gap-2 mt-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-white border-0 mt-2">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
