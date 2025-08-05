import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { clinicConfig } from "@/lib/config";
import Logo from "./Logo";
import LanguageToggle from "@/components/common/LanguageToggle";
import useAuthStore from "@/stores/authStore";
import {
  Menu,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  MapPin,
  Clock,
  UserPlus,
  LogIn,
  Stethoscope,
  Users,
} from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auth state
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setVisible(true); // Always show near top
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // Scrolling down hides header
      } else {
        setVisible(true); // Scrolling up shows header
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Function to render authentication buttons
  const renderAuthButtons = (isMobile = false) => {
    const baseClasses = isMobile ? "w-full" : "";
    const sizeClass = isMobile ? "h-10 text-sm" : "";

    if (!isAuthenticated) {
      return (
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-2" : "flex-row space-x-2"
          }`}
        >
          <Button
            asChild
            size={isMobile ? "sm" : "default"}
            className={`${baseClasses} ${sizeClass} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200`}
          >
            <Link to="/login" className="flex items-center justify-center">
              <Stethoscope
                className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} mr-2`}
              />
              {isMobile ? "Staff Login" : "Staff Portal"}
            </Link>
          </Button>
        </div>
      );
    }

    // If authenticated, show role-specific portals or logout option
    return (
      <div
        className={`flex ${
          isMobile ? "flex-col space-y-2" : "flex-row space-x-2"
        }`}
      >
        <Button
          variant="outline"
          asChild
          size={isMobile ? "sm" : "default"}
          className={`${baseClasses} ${sizeClass} border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200`}
        >
          <Link to="/login" className="flex items-center justify-center">
            <Users className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} mr-2`} />
            {isMobile ? "Portal" : "Access Portal"}
          </Link>
        </Button>
      </div>
    );
  };
  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b header-transition ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Doctor Info */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Contact Info */}
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Call for appointment
              </p>
              <a
                href={`tel:${clinicConfig.contact.phone}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {clinicConfig.contact.phone}
              </a>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <LanguageToggle />
              {renderAuthButtons()}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-200"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <Logo size="small" showBadge={false} />
                  </SheetTitle>
                  <SheetDescription className="text-sm text-gray-600">
                    {t("logo.tagline")}
                  </SheetDescription>
                </SheetHeader>

                <div className="grid gap-3 py-6">
                  {/* Language Toggle */}
                  <div className="mb-2">
                    <LanguageToggle />
                  </div>

                  {/* Contact Buttons - Compact Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      asChild
                      size="sm"
                      className="h-10 text-xs"
                    >
                      <a
                        href={`tel:${clinicConfig.contact.phone}`}
                        className="flex items-center justify-center"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        {t("header.call")}
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      asChild
                      size="sm"
                      className="h-10 text-xs"
                    >
                      <a
                        href={`mailto:${clinicConfig.contact.email}`}
                        className="flex items-center justify-center"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        {t("header.sendEmail")}
                      </a>
                    </Button>
                  </div>

                  {/* Auth Buttons */}
                  <div className="mt-2">{renderAuthButtons(true)}</div>

                  <Separator className="my-4" />

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {t("contact.address")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {t("contact.hours.monday")}
                      </span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
