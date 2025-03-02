
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Events', path: '/events', icon: <Calendar className="h-4 w-4" /> },
    { name: 'Search', path: '/search', icon: <Search className="h-4 w-4" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out-expo py-4',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-soft py-3' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-50 text-xl md:text-2xl font-medium tracking-tight transition-colors hover:text-accent"
          >
            eventiverse
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-md flex items-center space-x-1 transition-colors',
                  location.pathname === item.path 
                    ? 'text-accent font-medium' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth?type=signin">
              <Button variant="outline" size="sm" className="font-normal rounded-md">
                Sign In
              </Button>
            </Link>
            <Link to="/auth?type=signup">
              <Button size="sm" className="font-normal rounded-md">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 transition-transform duration-300 ease-out" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-300 ease-out" />
            )}
          </button>

          {/* Mobile menu */}
          <div
            className={cn(
              'fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col justify-center items-center md:hidden transition-all duration-400 ease-in-out-expo',
              isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
          >
            <nav className="flex flex-col items-center space-y-6 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 text-lg flex items-center space-x-2 transition-colors',
                    location.pathname === item.path 
                      ? 'text-accent font-medium' 
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 flex flex-col w-full items-center space-y-3">
                <Link to="/auth?type=signin" className="w-48">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?type=signup" className="w-48">
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
