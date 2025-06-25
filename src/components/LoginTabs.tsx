import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoginFormData {
  employeeId: string;
  password: string;
}

interface LoginTabsProps {
  onLogin?: (data: LoginFormData, userType: 'employee' | 'admin') => void;
}

const LoginTabs: React.FC<LoginTabsProps> = ({ onLogin }) => {
  const [employeeForm, setEmployeeForm] = useState<LoginFormData>({ employeeId: '', password: '' });
  const [adminForm, setAdminForm] = useState<LoginFormData>({ employeeId: '', password: '' });
  const [showEmployeePassword, setShowEmployeePassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [employeeError, setEmployeeError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmployeeError('');
    setIsLoading(true);

    try {
      if (!employeeForm.employeeId || !employeeForm.password) {
        setEmployeeError('Please fill in all fields');
        return;
      }

      // Use employee ID as email (you might want to modify this based on your auth setup)
      const email = `${employeeForm.employeeId}@company.com`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: employeeForm.password,
      });

      if (error) {
        setEmployeeError('Invalid credentials. Please try again.');
        return;
      }

      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome to the enterprise portal!",
        });
        navigate('/dashboard');
      }

      if (onLogin) {
        await onLogin(employeeForm, 'employee');
      }
    } catch (error) {
      setEmployeeError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setIsLoading(true);

    try {
      if (!adminForm.employeeId || !adminForm.password) {
        setAdminError('Please fill in all fields');
        return;
      }

      // Use employee ID as email (you might want to modify this based on your auth setup)
      const email = `${adminForm.employeeId}@company.com`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: adminForm.password,
      });

      if (error) {
        setAdminError('Invalid credentials. Please try again.');
        return;
      }

      if (data.user) {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin portal!",
        });
        navigate('/dashboard');
      }

      if (onLogin) {
        await onLogin(adminForm, 'admin');
      }
    } catch (error) {
      setAdminError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Tabs defaultValue="employee" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-enterprise-light">
          <TabsTrigger 
            value="employee" 
            className="data-[state=active]:bg-enterprise-primary data-[state=active]:text-white font-medium"
          >
            <User className="w-4 h-4 mr-2" />
            Employee Login
          </TabsTrigger>
          <TabsTrigger 
            value="admin"
            className="data-[state=active]:bg-enterprise-primary data-[state=active]:text-white font-medium"
          >
            <Building className="w-4 h-4 mr-2" />
            Admin Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <Card className="border-enterprise-primary/20 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-enterprise-primary font-semibold">Employee Access</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your employee credentials to access the portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmployeeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-id" className="text-sm font-medium text-gray-700">
                    Employee ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="employee-id"
                      type="text"
                      placeholder="Enter your Employee ID"
                      value={employeeForm.employeeId}
                      onChange={(e) => setEmployeeForm(prev => ({ ...prev, employeeId: e.target.value }))}
                      className="pl-10 border-gray-300 focus:border-enterprise-primary focus:ring-enterprise-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="employee-password"
                      type={showEmployeePassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={employeeForm.password}
                      onChange={(e) => setEmployeeForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10 border-gray-300 focus:border-enterprise-primary focus:ring-enterprise-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowEmployeePassword(!showEmployeePassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showEmployeePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {employeeError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700 text-sm">
                      {employeeError}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-enterprise-primary hover:bg-enterprise-dark text-white font-medium py-2.5 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card className="border-enterprise-primary/20 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-enterprise-primary font-semibold">Administrator Access</CardTitle>
              <CardDescription className="text-gray-600">
                For Admin, Superadmin, and SuperadminIT roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-id" className="text-sm font-medium text-gray-700">
                    Employee ID
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="admin-id"
                      type="text"
                      placeholder="Enter your Employee ID"
                      value={adminForm.employeeId}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, employeeId: e.target.value }))}
                      className="pl-10 border-gray-300 focus:border-enterprise-primary focus:ring-enterprise-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="admin-password"
                      type={showAdminPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10 border-gray-300 focus:border-enterprise-primary focus:ring-enterprise-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {adminError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700 text-sm">
                      {adminError}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-enterprise-primary hover:bg-enterprise-dark text-white font-medium py-2.5 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In as Admin'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginTabs;
