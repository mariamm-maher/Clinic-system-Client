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
import {
  Menu,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  MapPin,
  Clock,
} from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
  }, [lastScrollY]);
  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b header-transition ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        {" "}
        <div className="flex items-center justify-between">
          {/* Logo/Doctor Info */}
          <Logo />

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Logo size="small" showBadge={false} />
                  </SheetTitle>
                  <SheetDescription>{t("logo.tagline")}</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  <LanguageToggle />
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a href="#appointment">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t("header.bookAppointment")}
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <a href={`tel:${clinicConfig.contact.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {t("header.call")} {clinicConfig.contact.phone}
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <a href={`mailto:${clinicConfig.contact.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      {t("header.sendEmail")}
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Staff Portal
                    </Link>
                  </Button>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {t("contact.address")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {t("contact.hours.monday")}
                      </span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Language Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <div className="text-right">
              <p className="text-sm text-gray-600">Call for appointment</p>
              <a
                href={`tel:${clinicConfig.contact.phone}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-700"
              >
                {clinicConfig.contact.phone}
              </a>
            </div>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a href="#appointment">{t("header.bookAppointment")}</a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Staff Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
