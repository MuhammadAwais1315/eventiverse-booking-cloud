
import React from 'react';
import Hero from '@/components/Hero';
import EventList, { eventsMockData } from '@/components/EventList';
import FeaturedEvent from '@/components/FeaturedEvent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Users, Bell } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const Index: React.FC = () => {
  // Featured event data
  const featuredEvent = {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join industry leaders and innovators at the premier tech conference of the year. Experience cutting-edge demonstrations, insightful panels, and unparalleled networking opportunities with professionals from around the globe.',
    date: 'March 15-17, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'Moscone Center, San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    category: 'Technology'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-medium">How It Works</h2>
            <p className="mt-2 text-foreground/70 max-w-2xl mx-auto">
              Your journey to incredible experiences in three simple steps
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Calendar className="h-8 w-8" />,
                title: 'Find Events',
                description: 'Browse through our curated selection of events happening near you or around the world.'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: 'Book Tickets',
                description: 'Secure your spot with our seamless booking process and flexible payment options.'
              },
              {
                icon: <Bell className="h-8 w-8" />,
                title: 'Get Notified',
                description: 'Receive timely reminders and updates about your upcoming events.'
              }
            ].map((step, index) => (
              <AnimatedSection 
                key={index} 
                animation="fade-in-up" 
                delay={index * 200} 
                className="flex flex-col items-center text-center p-6 rounded-xl"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium mt-2">{step.title}</h3>
                <p className="mt-2 text-foreground/70">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Event Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-medium">Featured Event</h2>
            <p className="mt-2 text-foreground/70 max-w-2xl mx-auto">
              Don't miss out on our highlighted event of the month
            </p>
          </AnimatedSection>
          
          <FeaturedEvent {...featuredEvent} />
        </div>
      </section>
      
      {/* Events List Section */}
      <EventList 
        title="Upcoming Events" 
        subtitle="Discover and book tickets for the most exciting upcoming events"
        limit={6}
      />
      
      {/* CTA Section */}
      <section className="section-padding bg-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-medium">Ready to Experience Something Amazing?</h2>
              <p className="mt-4 text-white/80 text-lg">
                Join thousands of event-goers who discover and book tickets through our platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/events">
                  <Button size="lg" variant="secondary" className="font-normal rounded-md w-full sm:w-auto">
                    Explore All Events
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/auth?type=signup">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 font-normal rounded-md w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
