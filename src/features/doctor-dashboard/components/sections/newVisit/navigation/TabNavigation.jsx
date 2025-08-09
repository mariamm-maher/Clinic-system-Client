import { useNavigate } from "react-router-dom";
import { User, History, MessageSquare, Activity, Stethoscope, FlaskConical, Pill } from "lucide-react";

export default function TabNavigation({ currentTab, patientId }) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'basic-info', title: "Basic Info", icon: User },
    { id: 'past-history', title: "Past History", icon: History },
    { id: 'main-complaint', title: "Main Complaint", icon: MessageSquare },
    { id: 'checks', title: "Checks", icon: Activity },
    { id: 'examination', title: "Examination", icon: Stethoscope },
    { id: 'investigations', title: "Investigations", icon: FlaskConical },
    { id: 'prescription', title: "Prescription", icon: Pill },
  ];

  const handleTabClick = (tabId) => {
    navigate(`/doctor-dashboard/patients/${patientId}/new-visit/${tabId}`);
  };

  return (
    <div className="mb-6">
      <div className="border-b border-slate-200 bg-white rounded-t-lg shadow-sm">
        <nav className="flex space-x-0 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-blue-600 border-blue-600 bg-blue-50"
                    : "text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.title}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
