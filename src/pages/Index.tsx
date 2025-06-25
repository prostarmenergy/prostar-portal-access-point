
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import LoginTabs from '@/components/LoginTabs';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (data: { employeeId: string; password: string }, userType: 'employee' | 'admin') => {
    console.log('Login attempt:', { userType, employeeId: data.employeeId });
    // Login logic is now handled in LoginTabs component
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-enterprise-light via-white to-enterprise-light font-poppins flex items-center justify-center">
        <div className="text-enterprise-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-enterprise-light via-white to-enterprise-light font-poppins">
      {/* Header with company branding */}
      <EnterpriseHeader companyName="PROSTARM" />
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md">
          {/* Welcome section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-enterprise-primary mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Sign in to access your enterprise portal
            </p>
          </div>

          {/* Login tabs */}
          <LoginTabs onLogin={handleLogin} />

          {/* Footer note */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              Secure enterprise portal • Protected by advanced authentication
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            © 2024 PROSTARM. All rights reserved. • Enterprise Portal v1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
