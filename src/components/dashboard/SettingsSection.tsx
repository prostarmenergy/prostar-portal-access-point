
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Lock, User, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import ChangePasswordDialog from './ChangePasswordDialog';

interface Employee {
  name: string;
  employeeId: string;
  profilePicture?: string | null;
}

interface SettingsSectionProps {
  employee: Employee;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ employee }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleUpdateProfilePicture = () => {
    // TODO: Open file upload dialog
    toast({
      title: "Feature Coming Soon",
      description: "Profile picture upload will be available soon.",
    });
  };

  const handleEditDetails = () => {
    // TODO: Navigate to profile edit page
    toast({
      title: "Feature Coming Soon",
      description: "Profile editing will be available soon.",
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const settingsOptions = [
    {
      icon: Lock,
      label: 'Change Password',
      description: 'Update your account password',
      action: handleChangePassword,
      variant: 'outline' as const
    },
    {
      icon: Upload,
      label: 'Update Profile Picture',
      description: 'Upload a new profile photo',
      action: handleUpdateProfilePicture,
      variant: 'outline' as const
    },
    {
      icon: User,
      label: 'Edit Personal Details',
      description: 'Update your profile information',
      action: handleEditDetails,
      variant: 'outline' as const
    }
  ];

  return (
    <>
      <Card className="enterprise-shadow h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-enterprise-primary">
            <Settings className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {settingsOptions.map((option, index) => (
              <Button
                key={index}
                variant={option.variant}
                className="w-full justify-start h-auto p-4 text-left"
                onClick={option.action}
              >
                <div className="flex items-start gap-3">
                  <option.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">
                      {option.label}
                    </div>
                    <div className="text-xs opacity-70">
                      {option.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
            
            {/* Logout button separately */}
            <Button
              variant="destructive"
              className="w-full justify-start h-auto p-4 text-left"
              onClick={handleLogout}
            >
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">
                    Logout
                  </div>
                  <div className="text-xs opacity-70">
                    Sign out of your account
                  </div>
                </div>
              </div>
            </Button>
          </div>
          
          {/* Quick Info */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Employee ID: {employee.employeeId}</div>
              <div>Portal Version: 1.0</div>
              <div>Last Updated: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog 
        open={showChangePassword} 
        onOpenChange={setShowChangePassword} 
      />
    </>
  );
};

export default SettingsSection;
