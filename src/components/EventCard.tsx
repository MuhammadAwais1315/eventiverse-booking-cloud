
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  attendees?: number;
  isFeatured?: boolean;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  location,
  imageUrl,
  category,
  attendees,
  isFeatured = false,
  className,
}) => {
  return (
    <Link to={`/events/${id}`} className="block outline-none focus:ring-2 focus:ring-accent/50 rounded-xl">
      <div 
        className={cn(
          "overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 group card-hover",
          isFeatured ? "shadow-soft" : "",
          className
        )}
      >
        {/* Image */}
        <div className="aspect-[4/3] w-full relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute top-3 right-3 bg-accent text-white font-normal">
            {category}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-medium line-clamp-1 group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-foreground/70">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center text-sm text-foreground/70">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            
            {attendees && (
              <div className="flex items-center text-sm text-foreground/70">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{attendees} attending</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
