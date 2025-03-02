
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'signin' || type === 'signup') {
      setAuthType(type);
    }
  }, [searchParams]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    // For now, just navigate to home
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-gradient-to-b from-background to-secondary/30">
        <AnimatedSection animation="scale-in" className="w-full max-w-md">
          <div className="bg-card rounded-xl border border-border p-8 shadow-elegant">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-medium">
                {authType === 'signin' ? 'Welcome back' : 'Create an account'}
              </h1>
              <p className="mt-1 text-foreground/70">
                {authType === 'signin' 
                  ? 'Sign in to access your account' 
                  : 'Sign up to get started with eventiverse'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {authType === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Your full name" 
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {authType === 'signin' && (
                    <Link to="/forgot-password" className="text-xs text-accent hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              {authType === 'signup' && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-xs text-foreground/70">
                    I agree to the{" "}
                    <Link to="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              )}
              
              <Button type="submit" className="w-full rounded-md mt-6 font-normal">
                {authType === 'signin' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-xs text-foreground/60">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" className="rounded-md font-normal">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" 
                    alt="Google" 
                    className="h-4 w-4 mr-2"
                  />
                  Google
                </Button>
                <Button variant="outline" className="rounded-md font-normal">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" 
                    alt="Apple" 
                    className="h-4 w-4 mr-2" 
                  />
                  Apple
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-6 text-sm text-foreground/70">
              {authType === 'signin' ? (
                <>
                  Don't have an account?{" "}
                  <Link to="/auth?type=signup" className="text-accent hover:underline">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/auth?type=signin" className="text-accent hover:underline">
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </AnimatedSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
