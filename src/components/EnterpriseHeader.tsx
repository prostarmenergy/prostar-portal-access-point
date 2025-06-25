
import React from 'react';
import { Building2 } from 'lucide-react';

interface EnterpriseHeaderProps {
  companyName?: string;
  logoUrl?: string;
}

const EnterpriseHeader: React.FC<EnterpriseHeaderProps> = ({ 
  companyName = "PROSTARM",
  logoUrl 
}) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section - Left Aligned */}
          <div className="flex items-center">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${companyName} Logo`}
                className="h-8 md:h-12 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-enterprise-primary rounded-lg">
                <Building2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            )}
          </div>

          {/* Company Name - Center Aligned */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl md:text-3xl font-bold text-enterprise-primary font-poppins tracking-wide">
              {companyName}
            </h1>
          </div>

          {/* Right side spacer for balance */}
          <div className="w-8 md:w-12"></div>
        </div>
      </div>
    </header>
  );
};

export default EnterpriseHeader;
