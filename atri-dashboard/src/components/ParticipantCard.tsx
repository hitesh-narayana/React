
import React from 'react';
import { Participant } from '../types';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Eye, Edit, Clock, SquareUser } from 'lucide-react';
import { cn } from '../lib/utils';


// Define the props for the ParticipantCard component
interface ParticipantCardProps {
  participant: Participant; // The participant object
  className?: string; // Optional additional class names
}

const ParticipantCard = ({ participant, className }: ParticipantCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'withdrawn':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'screening':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Render the participant card which will allows to edit and view the participant
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-all duration-300 hover-scale border border-border/50", className)}>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-lg">
                {participant.firstName} {participant.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">ID: {participant.studyId}</p>
            </div>
            <Badge className={cn("ml-2", getStatusColor(participant.status))}>
              {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
            </Badge>
          </div>
           {/* Shows what need to be displayed in the participant card */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="flex items-center text-sm">
              <SquareUser className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{participant.gender}, {new Date().getFullYear() - new Date(participant.dob).getFullYear()} years</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Enrolled: {new Date(participant.enrollmentDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Buttons to view and edit the participant */}
          {/* These buttons will redirect to the respective pages */}
          <div className="flex space-x-2 mt-4">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link to={`/participants/${participant.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link to={`/participants/${participant.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
