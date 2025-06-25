
import React, { useState } from 'react';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import NewlyAddedPolicies from '@/components/dashboard/NewlyAddedPolicies';
import PolicyList from '@/components/dashboard/PolicyList';
import SettingsSection from '@/components/dashboard/SettingsSection';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-enterprise-light via-white to-enterprise-light font-poppins flex items-center justify-center">
        <div className="text-enterprise-primary">Loading dashboard...</div>
      </div>
    );
  }

  // Use profile data from Supabase or fallback to defaults
  const employeeData = {
    name: profile?.name || "Employee",
    employeeId: profile?.employee_id || "Loading...",
    profilePicture: profile?.profile_pic || null
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
