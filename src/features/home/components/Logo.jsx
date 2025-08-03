import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  Stethoscope,
  Heart,
  UserCheck,
  Activity,
  ShieldCheck,
} from "lucide-react";

/**
 * Logo component for the clinic
 * Displays clinic name with a medical icon representing internal medicine
 * @param {string} size - Size variant: "small", "default", "large"
 * @param {boolean} showBadge - Whether to show the specialty badge
 * @param {boolean} showIcon - Whether to show the stethoscope icon in badge
 * @param {string} iconType - Medical icon type: "stethoscope", "heart", "activity", "shield"
 * @param {string} className - Additional CSS classes
 */
export default function Logo({
  size = "default",
  showBadge = true,
  showIcon = true,
  iconType = "stethoscope", // "stethoscope", "heart", "activity", "shield"
  className = "",
}) {
  const { t } = useTranslation();
  const sizes = {
    small: {
      icon: "w-8 h-8",
      iconSize: "w-5 h-5",
      title: "text-base font-bold",
      badge: "text-xs",
      badgeIcon: "w-3 h-3",
    },
    default: {
      icon: "w-12 h-12",
      iconSize: "w-7 h-7",
      title: "text-xl font-bold",
      badge: "text-xs",
      badgeIcon: "w-4 h-4",
    },
    large: {
      icon: "w-16 h-16",
      iconSize: "w-10 h-10",
      title: "text-2xl font-bold",
      badge: "text-sm",
      badgeIcon: "w-5 h-5",
    },
  };
  const currentSize = sizes[size] || sizes.default; // Get the appropriate medical icon
  const getMedicalIcon = () => {
    const iconProps = {
      className: `${currentSize.iconSize} text-blue-600`,
    };

    switch (iconType) {
      case "heart":
        return <Heart {...iconProps} />;
      case "activity":
        return <Activity {...iconProps} />;
      case "shield":
        return <ShieldCheck {...iconProps} />;
      case "stethoscope":
      default:
        return <Stethoscope {...iconProps} />;
    }
  };
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Medical Icon representing Internal Medicine */}
      <div
        className={`flex items-center justify-center ${currentSize.icon} rounded-full bg-blue-100 p-2`}
      >
        {getMedicalIcon()}
      </div>{" "}
      <div>
        <h1 className={`${currentSize.title} text-gray-900`}>
          {t("logo.clinicName")}
        </h1>
        {showBadge && (
          <div className="flex items-center space-x-2">
            <Badge
              className={`${currentSize.badge} bg-green-100 text-green-700 border-green-200 hover:bg-green-200`}
            >
              {showIcon && (
                <Stethoscope className={`${currentSize.badgeIcon} mr-1`} />
              )}
              {t("logo.tagline")}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
