
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, TicketCheck, Banknote, X } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Booking, getBookings, cancelBooking } from '@/services/bookingService';
import { eventsMockData } from '@/components/EventList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Load bookings from local storage
    setBookings(getBookings());
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = cancelBooking(bookingId);
    setBookings(updatedBookings);
    setOpenDialog(false);
  };

  // Find event details for a booking
  const getEventDetails = (eventId: string) => {
    return eventsMockData.find(event => event.id === eventId) || null;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <AnimatedSection animation="fade-in-up" className="mb-6">
            <Link 
              to="/events" 
              className="inline-flex items-center text-sm text-foreground/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Browse more events
            </Link>
            
            <h1 className="text-3xl font-medium mt-4 flex items-center">
              <TicketCheck className="h-6 w-6 mr-2" />
              My Bookings
            </h1>
          </AnimatedSection>
          
          {bookings.length > 0 ? (
            <AnimatedSection animation="fade-in" className="space-y-6">
              {bookings.map((booking) => {
                const eventDetails = getEventDetails(booking.eventId);
                return (
                  <div 
                    key={booking.id} 
                    className="border border-border rounded-lg overflow-hidden bg-card"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4">
                      {/* Event Image */}
                      {eventDetails && (
                        <div className="md:col-span-1">
                          <img 
                            src={eventDetails.imageUrl} 
                            alt={eventDetails.title} 
                            className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
                          />
                        </div>
                      )}
                      
                      {/* Booking Details */}
                      <div className="md:col-span-3 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-medium">
                              <Link 
                                to={`/events/${booking.eventId}`} 
                                className="hover:text-accent transition-colors"
                              >
                                {booking.eventTitle}
                              </Link>
                            </h2>
                            <p className="text-sm text-foreground/70 mt-1">
                              Booking ID: {booking.id}
                            </p>
                          </div>
                          
                          <Badge 
                            variant={
                              booking.status === 'confirmed' ? 'default' : 
                              booking.status === 'pending' ? 'outline' : 
                              'destructive'
                            }
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            {eventDetails && (
                              <>
                                <div className="flex items-center text-sm text-foreground/70">
                                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{eventDetails.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-foreground/70">
                                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{eventDetails.location}</span>
                                </div>
                              </>
                            )}
                            <div className="flex items-center text-sm text-foreground/70">
                              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Booked on {formatDate(booking.bookingDate)}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-foreground/70">
                              <User className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>{booking.quantity} Ticket{booking.quantity > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center text-sm font-medium">
                              <Banknote className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Total: ${booking.totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button size="sm" asChild>
                            <Link to={`/events/${booking.eventId}`}>
                              View Event
                            </Link>
                          </Button>
                          
                          {booking.status === 'confirmed' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => {
                                setSelectedBooking(booking);
                                setOpenDialog(true);
                              }}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </AnimatedSection>
          ) : (
            <AnimatedSection animation="fade-in" className="text-center py-12">
              <div className="max-w-md mx-auto">
                <TicketCheck className="h-16 w-16 mx-auto text-foreground/30" />
                <h2 className="text-2xl font-medium mt-4">No bookings found</h2>
                <p className="text-foreground/70 mt-2 mb-6">
                  You haven't made any bookings yet. Browse our events and book your tickets!
                </p>
                <Link to="/events">
                  <Button>
                    Browse Events
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Cancel Booking Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your booking for "{selectedBooking?.eventTitle}"?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              No, Keep Booking
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedBooking && handleCancelBooking(selectedBooking.id)}
            >
              Yes, Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
