import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clinicConfig } from "@/lib/config";

export default function FloatingNavigation({ visible }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(false);
  };

  if (!visible) return null;

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex flex-col items-end space-y-4">
          {/* Expanded Menu */}
          {isExpanded && (
            <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-3 space-y-2 min-w-[200px]">
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 flex-col gap-1 hover:bg-blue-50 hover:border-blue-200"
                          onClick={() => scrollToSection("appointment")}
                        >
                          <svg
                            className="w-4 h-4"
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
                          <span className="text-xs">Book</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Book Appointment</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 flex-col gap-1 hover:bg-green-50 hover:border-green-200"
                          asChild
                        >
                          <a href={`tel:${clinicConfig.contact.phone}`}>
                            <svg
                              className="w-4 h-4"
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
                            <span className="text-xs">Call</span>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Call {clinicConfig.contact.phone}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 flex-col gap-1 hover:bg-blue-50 hover:border-blue-200"
                          asChild
                        >
                          <a href={`mailto:${clinicConfig.contact.email}`}>
                            <svg
                              className="w-4 h-4"
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
                            <span className="text-xs">Email</span>
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Send Email</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-12 flex-col gap-1 hover:bg-purple-50 hover:border-purple-200"
                          onClick={() => scrollToSection("contact")}
                        >
                          <svg
                            className="w-4 h-4"
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
                          <span className="text-xs">Location</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>View Location</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Clinic Info */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {clinicConfig.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          Open Now
                        </Badge>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-xs text-gray-600">
                            <svg
                              className="w-3 h-3 mr-2 text-gray-400"
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
                            Mon-Fri: 9AM-5PM
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <svg
                              className="w-3 h-3 mr-2 text-gray-400"
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
                            {clinicConfig.contact.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Emergency Call Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-green-600 hover:bg-green-700 rounded-full w-14 h-14 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                  asChild
                >
                  <a
                    href={`tel:${clinicConfig.contact.phone}`}
                    aria-label={`Call ${clinicConfig.contact.phone}`}
                  >
                    <svg
                      className="w-6 h-6"
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
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Call Now: {clinicConfig.contact.phone}</p>
              </TooltipContent>
            </Tooltip>

            {/* Menu Toggle Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={`${
                    isExpanded
                      ? "bg-red-600 hover:bg-red-700 rotate-90"
                      : "bg-blue-600 hover:bg-blue-700"
                  } rounded-full w-16 h-16 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Close menu" : "Open menu"}
                >
                  {isExpanded ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isExpanded ? "Close Menu" : "Quick Actions"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
