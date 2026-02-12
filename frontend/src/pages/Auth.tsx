import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import '../styles/auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sign Up form state
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  // Sign In form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!signUpData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signUpData.email,
          password: signUpData.password,
          name: signUpData.name,
          role: 'consumer' // Default role
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Account created successfully. Please log in.",
        });
        // Switch to login form
        setIsSignUp(false);
        setSignUpData({ email: '', password: '', confirmPassword: '', name: '' });
      } else {
        toast({
          title: "Registration Failed",
          description: data.message || "Unable to create account",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to connect to server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${data.user.name}`,
        });

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to connect to server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchToSignIn = () => {
    setIsSignUp(false);
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Sign Up Form */}
        <form 
          className={`signUp ${isSignUp ? 'active-sx' : 'inactive-sx'}`}
          onSubmit={handleSignUp}
        >
          <h3>Create Your Account</h3>
          <p>
            Just enter your details<br />
            to join Sahi Aaushadi
          </p>
          <input
            className="w100"
            type="text"
            placeholder="Your Name"
            required
            autoComplete="name"
            value={signUpData.name}
            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
            disabled={isLoading}
          />
          <input
            className="w100"
            type="email"
            placeholder="Insert eMail"
            required
            autoComplete="email"
            value={signUpData.email}
            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Insert Password"
            required
            value={signUpData.password}
            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Verify Password"
            required
            value={signUpData.confirmPassword}
            onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
            disabled={isLoading}
          />
          <button 
            className="form-btn sx log-in" 
            type="button" 
            onClick={switchToSignIn}
            disabled={isLoading}
          >
            Log In
          </button>
          <button 
            className="form-btn dx" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        {/* Sign In Form */}
        <form 
          className={`signIn ${isSignUp ? 'inactive-dx' : 'active-dx'}`}
          onSubmit={handleSignIn}
        >
          <h3>Welcome<br />Back !</h3>
          <p>- Sign in to continue -</p>
          <input
            type="email"
            placeholder="Insert eMail"
            autoComplete="email"
            required
            value={signInData.email}
            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Insert Password"
            required
            value={signInData.password}
            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
            disabled={isLoading}
          />
          <button 
            className="form-btn sx back" 
            type="button" 
            onClick={switchToSignUp}
            disabled={isLoading}
          >
            Back
          </button>
          <button 
            className="form-btn dx" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
