import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeftSide from "./LeftSide";
import {
  Building2,
  Mail,
  ArrowLeft,
  Loader2,
  Send,
  CheckCircle,
} from "lucide-react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically call your password reset API
      // await authService.resetPassword(email);

      setIsEmailSent(true);
      console.log("Password reset email sent to:", email);
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };
  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
        <LeftSide />

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>{" "}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dr. Ehab Clinic
              </h1>
              <p className="text-gray-600">
                Professional Healthcare Management
              </p>
            </div>

            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 font-bold">
                  Check Your Email
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  We've sent a password reset link to your email address.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Email sent to:</strong> {email}
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    If you don't see the email in your inbox, please check your
                    spam folder.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Login
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail("");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    Try a different email address
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <LeftSide />

      {/* Right Side - Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>{" "}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dr. Ehab Clinic
            </h1>
            <p className="text-gray-600">Professional Healthcare Management</p>
          </div>
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-900 font-bold">
                Reset Your Password
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 pl-12 border-2 focus:border-blue-500 transition-all duration-200"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-3" />
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </button>
              </div>
            </CardContent>
          </Card>{" "}
        </div>
      </div>
    </div>
  );
}
