
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from './AnimatedSection';

interface FeaturedEventProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  category: string;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  id,
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  category,
}) => {
  return (
    <AnimatedSection className="overflow-hidden rounded-2xl bg-card border border-border shadow-elegant">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-72 lg:h-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute top-4 left-4 bg-accent text-white font-normal">
            Featured Event
          </Badge>
        </div>
        
        {/* Content */}
        <div className="p-6 lg:p-8 flex flex-col">
          <Badge variant="outline" className="w-fit mb-4">
            {category}
          </Badge>
          
          <h2 className="text-2xl font-medium">{title}</h2>
          
          <p className="mt-3 text-foreground/80 line-clamp-3 lg:line-clamp-4">
            {description}
          </p>
          
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center text-foreground/70">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center text-foreground/70">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center text-foreground/70">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <Link to={`/events/${id}`}>
              <Button className="w-full sm:w-auto font-normal rounded-md">
                View Details
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default FeaturedEvent;
