
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, FileText, Clock } from 'lucide-react';

interface NewlyAddedPoliciesProps {
  onDismiss: () => void;
}

const NewlyAddedPolicies: React.FC<NewlyAddedPoliciesProps> = ({ onDismiss }) => {
  const newPolicies = [
    {
      id: 1,
      title: "Remote Work Policy Update",
      category: "HR Policies",
      addedDate: "2024-06-20",
      description: "Updated guidelines for remote work arrangements and hybrid schedules."
    },
    {
      id: 2,
      title: "Cybersecurity Best Practices",
      category: "IT Security",
      addedDate: "2024-06-18",
      description: "New security protocols and password requirements for all employees."
    },
    {
      id: 3,
      title: "Health & Safety Guidelines",
      category: "Safety",
      addedDate: "2024-06-15",
      description: "Updated workplace safety measures and emergency procedures."
    }
  ];

  return (
    <Card className="border-enterprise-accent bg-gradient-to-r from-enterprise-light/50 to-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-enterprise-primary" />
          <CardTitle className="text-enterprise-primary">Newly Added Policies</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-6 w-6 p-0 hover:bg-enterprise-primary/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {newPolicies.map((policy) => (
            <div key={policy.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-enterprise-primary/10">
              <Clock className="h-4 w-4 text-enterprise-accent mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="font-semibold text-enterprise-primary text-sm">
                    {policy.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    Added {new Date(policy.addedDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {policy.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-enterprise-accent font-medium">
                    {policy.category}
                  </span>
                  <a
                    href="#"
                    className="text-xs text-enterprise-primary hover:text-enterprise-accent font-medium underline"
                  >
                    View Document
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewlyAddedPolicies;
