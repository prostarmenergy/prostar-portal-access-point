
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';

const PolicyList: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['HR Policies']);

  const policiesByCategory = {
    'HR Policies': [
      {
        id: 1,
        title: 'Employee Handbook',
        description: 'Comprehensive guide covering company policies, procedures, and expectations for all employees.',
        link: '#handbook'
      },
      {
        id: 2,
        title: 'Remote Work Policy',
        description: 'Guidelines for working from home, including equipment, schedules, and communication protocols.',
        link: '#remote-work'
      },
      {
        id: 3,
        title: 'Time Off Policy',
        description: 'Vacation, sick leave, and personal time off policies including request procedures.',
        link: '#time-off'
      },
      {
        id: 4,
        title: 'Code of Conduct',
        description: 'Ethical guidelines and behavioral expectations for all company employees.',
        link: '#code-conduct'
      }
    ],
    'IT Security': [
      {
        id: 5,
        title: 'Password Security Guidelines',
        description: 'Requirements for creating and managing secure passwords across all company systems.',
        link: '#password-security'
      },
      {
        id: 6,
        title: 'Data Protection Policy',
        description: 'Protocols for handling sensitive company and customer data securely.',
        link: '#data-protection'
      },
      {
        id: 7,
        title: 'Device Usage Policy',
        description: 'Guidelines for using company devices and personal devices for work purposes.',
        link: '#device-usage'
      }
    ],
    'Safety & Compliance': [
      {
        id: 8,
        title: 'Workplace Safety Guidelines',
        description: 'Safety procedures, emergency protocols, and accident reporting requirements.',
        link: '#workplace-safety'
      },
      {
        id: 9,
        title: 'Anti-Harassment Policy',
        description: 'Zero-tolerance policy regarding harassment and discrimination in the workplace.',
        link: '#anti-harassment'
      },
      {
        id: 10,
        title: 'Environmental Policy',
        description: 'Company commitment to environmental responsibility and sustainable practices.',
        link: '#environmental'
      }
    ],
    'Benefits & Compensation': [
      {
        id: 11,
        title: 'Health Insurance Guide',
        description: 'Overview of health insurance benefits, coverage options, and enrollment procedures.',
        link: '#health-insurance'
      },
      {
        id: 12,
        title: 'Retirement Plan Information',
        description: 'Details about 401(k) plans, company matching, and retirement planning resources.',
        link: '#retirement'
      },
      {
        id: 13,
        title: 'Professional Development Policy',
        description: 'Guidelines for training, education reimbursement, and career advancement opportunities.',
        link: '#professional-development'
      }
    ]
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Card className="enterprise-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-enterprise-primary">
          <FileText className="h-5 w-5" />
          Policy Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(policiesByCategory).map(([category, policies]) => (
            <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-semibold text-left hover:bg-enterprise-light/50"
                onClick={() => toggleCategory(category)}
              >
                <span className="text-enterprise-primary">{category}</span>
                {expandedCategories.includes(category) ? (
                  <ChevronDown className="h-4 w-4 text-enterprise-accent" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-enterprise-accent" />
                )}
              </Button>
              
              {expandedCategories.includes(category) && (
                <div className="border-t border-gray-200 bg-gray-50/50">
                  {policies.map((policy) => (
                    <div key={policy.id} className="p-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-enterprise-primary mb-1">
                            {policy.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {policy.description}
                          </p>
                        </div>
                        <a
                          href={policy.link}
                          className="text-sm text-enterprise-primary hover:text-enterprise-accent font-medium underline whitespace-nowrap"
                        >
                          View Document
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyList;
