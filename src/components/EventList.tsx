
import React from 'react';
import EventCard, { EventCardProps } from './EventCard';
import AnimatedSection from './AnimatedSection';

// Sample data
export const eventsMockData: Omit<EventCardProps, 'className'>[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    date: 'Mar 15, 2025',
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    category: 'Technology',
    attendees: 1240,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    date: 'Jun 10-12, 2025',
    location: 'Austin, TX',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    category: 'Music',
    attendees: 5000
  },
  {
    id: '3',
    title: 'Digital Marketing Summit',
    date: 'Apr 5, 2025',
    location: 'New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    category: 'Marketing',
    attendees: 750
  },
  {
    id: '4',
    title: 'Food & Wine Expo',
    date: 'May 22, 2025',
    location: 'Chicago, IL',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    category: 'Food',
    attendees: 1200
  },
  {
    id: '5',
    title: 'Design Week',
    date: 'Jul 7-11, 2025',
    location: 'Los Angeles, CA',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    category: 'Design',
    attendees: 900
  },
  {
    id: '6',
    title: 'Startup Pitch Competition',
    date: 'Aug 15, 2025',
    location: 'Seattle, WA',
    imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    category: 'Business',
    attendees: 350
  },
];

interface EventListProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showFeatured?: boolean;
}

const EventList: React.FC<EventListProps> = ({
  title = "Upcoming Events",
  subtitle = "Discover and book tickets for upcoming events",
  limit = 6,
  showFeatured = false,
}) => {
  // In a real app, this would fetch events from an API
  const events = eventsMockData.slice(0, limit);
  
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-medium">{title}</h2>
          <p className="mt-2 text-foreground/70 max-w-2xl mx-auto">{subtitle}</p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <AnimatedSection 
              key={event.id} 
              animation="fade-in-up" 
              delay={index * 100}
            >
              <EventCard {...event} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
