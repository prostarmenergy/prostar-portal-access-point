
import React, { useState } from 'react';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import NewlyAddedPolicies from '@/components/dashboard/NewlyAddedPolicies';
import PolicyList from '@/components/dashboard/PolicyList';
import SettingsSection from '@/components/dashboard/SettingsSection';

const Dashboard = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  // Mock employee data - in real app this would come from auth/database
  const employeeData = {
    name: "John Smith",
    employeeId: "EMP001234",
    profilePicture: null
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-enterprise-light via-white to-enterprise-light font-poppins">
      <EnterpriseHeader companyName="PROSTARM" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="space-y-6 md:space-y-8">
          {/* Welcome Section */}
          <WelcomeSection employee={employeeData} />
          
          {/* Newly Added Policies - First-time view only */}
          {isFirstTimeUser && (
            <NewlyAddedPolicies onDismiss={() => setIsFirstTimeUser(false)} />
          )}
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Policy Documents - Takes up 2/3 on large screens */}
            <div className="lg:col-span-2">
              <PolicyList />
            </div>
            
            {/* Settings Section - Takes up 1/3 on large screens */}
            <div className="lg:col-span-1">
              <SettingsSection employee={employeeData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
