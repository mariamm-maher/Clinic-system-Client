import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { clinicConfig } from "@/lib/config";

export default function ContactInfo() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  {t("contact.location")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-80 bg-gray-200 rounded-b-lg overflow-hidden">
                  <iframe
                    src={clinicConfig.contact.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic Location"
                    className="rounded-b-lg"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  {t("contact.getInTouch")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("contact.addressLabel")}
                    </h3>
                    <p className="text-gray-600">{t("contact.address")}</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("contact.phoneLabel")}
                    </h3>
                    <a
                      href={`tel:${clinicConfig.contact.phone}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {clinicConfig.contact.phone}
                    </a>
                    <p className="text-sm text-gray-500">
                      {t("contact.clickToCall")}
                    </p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("contact.emailLabel")}
                    </h3>
                    <a
                      href={`mailto:${clinicConfig.contact.email}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {clinicConfig.contact.email}
                    </a>
                    <p className="text-sm text-gray-500">
                      {t("contact.sendEmail")}
                    </p>
                  </div>
                </div>
                {/* Office Hours */}
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t("contact.hours.title")}
                    </h3>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>{t("contact.hours.monday")}</p>
                      <p>{t("contact.hours.saturday")}</p>
                      <p>{t("contact.hours.sunday")}</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-6" /> {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    {t("contact.quickActions")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <a href={`tel:${clinicConfig.contact.phone}`}>
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {t("contact.callNow")}
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {t("contact.callTooltip")}{" "}
                            {clinicConfig.contact.phone}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <a href={`mailto:${clinicConfig.contact.email}`}>
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {t("contact.sendEmailButton")}
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {t("contact.emailTooltip")}{" "}
                            {clinicConfig.contact.email}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <a href="#appointment">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {t("contact.bookAppointmentOnline")}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
