// Main home page component
import { useState, useEffect } from "react";
import Header from "./components/Header";
import AppointmentForm from "./components/AppointmentForm";
import ContactInfo from "./components/ContactInfo";
import DoctorProfile from "./components/DoctorProfile";
import FloatingNavigation from "./components/FloatingNavigation";

export default function Home() {
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show floating navigation when scrolling down past 200px
      setShowFloatingNav(currentScrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white scroll-smooth">      <Header />
      <main className="relative">
        <DoctorProfile />
        <div id="appointment" className="scroll-mt-20">
          <AppointmentForm />
        </div>
        <ContactInfo />
      </main>
      {/* Professional Floating Navigation */}
      <FloatingNavigation visible={showFloatingNav} />
    </div>
  );
}

// Export individual components that are actually used
export {
  Header,
  AppointmentForm,
  ContactInfo,
  DoctorProfile,
  FloatingNavigation,
};
