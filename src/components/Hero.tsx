
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent to-transparent"></div>
        
        {/* Background glass elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection animation="fade-in-up" className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-4">
              <span className="animate-pulse mr-1.5">●</span> Launching Events Platform
            </div>
            <h1 className="max-w-3xl">
              <span className="block font-medium">Discover and Book</span>
              <span className="block font-light">Unforgettable Experiences</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-xl mx-auto lg:mx-0">
              Browse through exclusive events, secure your tickets, and receive instant confirmations—all in one seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link to="/events">
                <Button size="lg" className="font-normal rounded-md shadow-soft w-full sm:w-auto">
                  Explore Events
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/auth?type=signup">
                <Button size="lg" variant="outline" className="font-normal rounded-md w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={300} className="hidden lg:block">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                  alt="Event preview" 
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Floating card elements */}
              <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-glass max-w-[200px] animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <div className="text-sm font-medium">Upcoming Event</div>
                <div className="text-xs text-foreground/70 mt-1">Summer Music Festival 2025</div>
              </div>
              
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 shadow-glass max-w-[180px] animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs font-medium">Booking Open</span>
                </div>
                <div className="text-sm font-medium mt-1">234 spots left</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
