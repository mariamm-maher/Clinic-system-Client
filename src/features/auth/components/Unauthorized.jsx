import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

const Unauthorized = ({
  requiredRole = null,
  requiredRoles = null,
  message = null,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getRoleMessage = () => {
    if (message) return message;

    if (requiredRole) {
      return `You need to have the "${requiredRole}" role to access this content.`;
    }

    if (requiredRoles && requiredRoles.length > 0) {
      if (requiredRoles.length === 1) {
        return `You need to have the "${requiredRoles[0]}" role to access this content.`;
      }
      return `You need to have one of these roles: ${requiredRoles
        .map((role) => `"${role}"`)
        .join(", ")} to access this content.`;
    }

    return "You don't have permission to access this content.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-100">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <ShieldX className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {getRoleMessage()}
            </AlertDescription>
          </Alert>

          <div className="text-center text-gray-600">
            <p className="text-sm">
              If you believe this is an error, please contact your administrator
              or try logging in with a different account.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full h-11 border-2 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={handleGoHome}
              className="w-full h-11 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
