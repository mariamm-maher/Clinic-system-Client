import { Stethoscope, Heart, Clock } from "lucide-react";
import { clinicConfig } from "@/lib/config";

export default function LeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Animated Medical Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Floating medical cross patterns with subtle animation */}
        <div className="absolute top-10 left-10 w-8 h-8 animate-pulse">
          <div className="absolute inset-0 bg-white/30 transform rotate-45 transition-transform duration-1000 hover:rotate-90"></div>
          <div className="absolute inset-0 bg-white/30 transition-opacity duration-1000"></div>
        </div>
        <div className="absolute top-32 right-20 w-6 h-6 animate-pulse delay-300">
          <div className="absolute inset-0 bg-white/20 transform rotate-45 transition-transform duration-1000 hover:rotate-90"></div>
          <div className="absolute inset-0 bg-white/20 transition-opacity duration-1000"></div>
        </div>
        <div className="absolute bottom-20 left-20 w-10 h-10 animate-pulse delay-700">
          <div className="absolute inset-0 bg-white/25 transform rotate-45 transition-transform duration-1000 hover:rotate-90"></div>
          <div className="absolute inset-0 bg-white/25 transition-opacity duration-1000"></div>
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white/15 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/10 rounded-full animate-bounce delay-500"></div>

        {/* Animated flowing wave pattern */}
        <svg
          className="absolute bottom-0 left-0 w-full h-64 animate-pulse"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
            className="transition-opacity duration-2000"
          ></path>
        </svg>
      </div>{" "}
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center text-white p-12 relative z-10 h-full w-full">
        <div className="text-center max-w-md transform transition-all duration-1000 hover:scale-105 flex flex-col items-center justify-center">
          {/* Animated Medical Logo */}
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transition-all duration-500 hover:shadow-blue-500/25 hover:bg-white/25 group">
            <Stethoscope className="w-16 h-16 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          </div>
          {/* Clinic Branding with subtle animation */}
          <h1 className="text-5xl font-bold mb-4 leading-tight transition-all duration-700 hover:text-blue-100">
            {clinicConfig.name}
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed font-light transition-all duration-500 hover:text-white">
            {clinicConfig.tagline}
          </p>{" "}
          {/* Animated Clinic Features */}
          <div className="space-y-4 text-center mb-8">
            <div className="flex items-center justify-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:text-blue-50">
              <Heart className="w-5 h-5 text-blue-200 transition-colors duration-300 hover:text-red-300" />
              <span className="text-blue-100">
                Comprehensive Internal Medicine
              </span>
            </div>
            <div className="flex items-center justify-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:text-blue-50 delay-200">
              <Clock className="w-5 h-5 text-blue-200 transition-colors duration-300 hover:text-yellow-300" />
              <span className="text-blue-100">
                Same-day appointments available
              </span>
            </div>
          </div>
          {/* Enhanced Doctor Credentials Badge */}
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/20">
            <p className="text-sm text-blue-100 font-medium transition-colors duration-300 hover:text-white">
              Dr. Ehab • Board Certified
            </p>
            <p className="text-xs text-blue-200 transition-colors duration-300 hover:text-blue-100">
              Internal Medicine Physician
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
