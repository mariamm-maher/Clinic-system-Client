import { useNavigate } from "react-router-dom";

export default function StaffDetailsNavigation({ tabs, currentTab, staffId }) {
  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    navigate(`/doctor-dashboard/staff/${staffId}/${tabId}`);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-2">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-102"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
