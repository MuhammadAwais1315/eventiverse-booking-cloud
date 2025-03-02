import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { eventsMockData } from '@/components/EventList';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Search, SlidersHorizontal } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import EventCard from '@/components/EventCard';
import { useUser } from '@/context/UserContext';

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const { isAuthenticated } = useUser();

  // Filter events based on search query and filters
  const filteredEvents = eventsMockData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? 
                            (selectedCategory === 'all' ? true : event.category === selectedCategory) : 
                            true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from event data
  const categories = Array.from(new Set(eventsMockData.map(event => event.category)));

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      toast({
        title: "Date selected",
        description: `Filtering events around ${format(selectedDate, 'PPP')}`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">
                {isAuthenticated ? 'Welcome back to Events' : 'Discover Events'}
              </h1>
              <p className="text-foreground/70 text-lg">
                Find and book tickets for the most exciting events happening near you
              </p>
              
              {/* Search and filters */}
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events by name or location..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {date ? format(date, 'PP') : 'Date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Active filters */}
        {(searchQuery || selectedCategory || date) && (
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-foreground/70">Active filters:</span>
              
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button 
                    className="ml-1 hover:text-foreground" 
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                  <button 
                    className="ml-1 hover:text-foreground" 
                    onClick={() => setSelectedCategory('')}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {date && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Date: {format(date, 'PP')}
                  <button 
                    className="ml-1 hover:text-foreground" 
                    onClick={() => setDate(undefined)}
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {(searchQuery || selectedCategory || date) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setDate(undefined);
                  }}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Event listing */}
        <div className="py-12">
          {filteredEvents.length > 0 ? (
            <div className="container mx-auto px-4">
              <AnimatedSection className="mb-8">
                <h2 className="text-2xl font-medium">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </h2>
                <Separator className="mt-4" />
              </AnimatedSection>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredEvents.map((event, index) => (
                  <AnimatedSection 
                    key={event.id} 
                    animation="fade-in-up" 
                    delay={index * 100}
                  >
                    <div className="event-card-wrapper">
                      <EventCard {...event} />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 text-center py-16">
              <AnimatedSection>
                <h2 className="text-2xl font-medium mb-2">No events found</h2>
                <p className="text-foreground/70 mb-6">
                  Try adjusting your search filters to find more events
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setDate(undefined);
                }}>
                  Clear all filters
                </Button>
              </AnimatedSection>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
