
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface Employee {
  name: string;
  employeeId: string;
  profilePicture?: string | null;
}

interface WelcomeSectionProps {
  employee: Employee;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ employee }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="enterprise-shadow border-enterprise-primary/10">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="h-16 w-16 md:h-20 md:w-20">
            {employee.profilePicture ? (
              <AvatarImage src={employee.profilePicture} alt={employee.name} />
            ) : (
              <AvatarFallback className="bg-enterprise-primary text-white text-lg md:text-xl font-semibold">
                {getInitials(employee.name)}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-enterprise-primary mb-2">
              Welcome back, {employee.name.split(' ')[0]}!
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Employee ID: {employee.employeeId}
              </span>
            </div>
          </div>
          
          <div className="hidden md:block text-right text-sm text-gray-500">
            Last login: {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
