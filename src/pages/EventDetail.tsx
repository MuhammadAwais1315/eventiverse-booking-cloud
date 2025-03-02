
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { eventsMockData } from '@/components/EventList';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Share2,
  Heart,
  Ticket,
  CreditCard,
  ArrowLeft,
  ShoppingCart
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import EventCard from '@/components/EventCard';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import { addToCart } from '@/services/bookingService';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { toast: uiToast } = useToast();
  
  // In a real app, this would fetch the event details from an API
  const event = eventsMockData.find(event => event.id === id) || eventsMockData[0];
  
  // Additional event details (in a real app, this would come from the API)
  const eventDetails = {
    description: "Join us for an incredible experience at this amazing event. Network with industry professionals, learn from expert speakers, and enjoy a day full of insights and opportunities. This is your chance to be part of something special!",
    time: "10:00 AM - 6:00 PM",
    organizer: "Tech Innovations Inc.",
    price: "$149.99",
    totalTickets: 500,
    availableTickets: 237,
    highlights: [
      "Keynote presentations from industry leaders",
      "Interactive workshops and panel discussions",
      "Networking opportunities with professionals",
      "Product demonstrations and exhibitions",
      "Complimentary lunch and refreshments"
    ]
  };
  
  // Similar events (in a real app, this would be fetched based on category or tags)
  const similarEvents = eventsMockData
    .filter(e => e.id !== id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      eventId: event.id,
      eventTitle: event.title,
      price: eventDetails.price,
      quantity: quantity,
      imageUrl: event.imageUrl
    });
  };

  const handleBookNow = () => {
    addToCart({
      eventId: event.id,
      eventTitle: event.title,
      price: eventDetails.price,
      quantity: quantity,
      imageUrl: event.imageUrl
    });
    
    uiToast({
      title: "Ticket added to cart!",
      description: `${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title} added.`,
    });
    
    // In a real app, this would navigate to checkout
    setTimeout(() => {
      window.location.href = '/cart';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Event Header */}
        <div className="bg-secondary/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fade-in-up" className="mb-6">
              <Link 
                to="/events" 
                className="inline-flex items-center text-sm text-foreground/70 hover:text-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to events
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {event.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-medium">{event.title}</h1>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="rounded-md">
                    <Heart className="h-4 w-4 mr-1.5" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-md">
                    <Share2 className="h-4 w-4 mr-1.5" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 md:gap-6 mt-4">
                <div className="flex items-center text-sm text-foreground/70">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center text-sm text-foreground/70">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{eventDetails.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-foreground/70">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-foreground/70">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="fade-in" className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={200}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-medium mb-4">About this event</h2>
                    <p className="text-foreground/80 leading-relaxed">
                      {eventDetails.description}
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-medium mb-4">Event highlights</h2>
                    <ul className="space-y-2">
                      {eventDetails.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span className="text-foreground/80">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-medium mb-4">Organizer</h2>
                    <p className="text-foreground/80">{eventDetails.organizer}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection animation="fade-in" delay={300} className="sticky top-24">
                <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
                  <h3 className="text-xl font-medium mb-4">Get your tickets</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Price</span>
                      <span className="font-medium">{eventDetails.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Available tickets</span>
                      <span className="font-medium">
                        {eventDetails.availableTickets} / {eventDetails.totalTickets}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <label className="text-sm text-foreground/70 mb-1.5 block">
                        Select quantity
                      </label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'ticket' : 'tickets'}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <Button className="w-full mt-4 rounded-md font-normal" onClick={handleBookNow}>
                      <Ticket className="h-4 w-4 mr-1.5" />
                      Book Tickets
                    </Button>
                    
                    <Button variant="outline" className="w-full rounded-md font-normal" onClick={handleAddToCart}>
                      <ShoppingCart className="h-4 w-4 mr-1.5" />
                      Add to Cart
                    </Button>
                    
                    <p className="text-xs text-foreground/60 text-center mt-2">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
          
          {/* Similar Events */}
          <AnimatedSection animation="fade-in-up" delay={400} className="mt-16">
            <h2 className="text-2xl font-medium mb-6">Similar events you might like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
