import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redirect component to maintain backward compatibility
export default function StaffDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Redirect to the new nested route structure
    navigate(`/doctor-dashboard/staff/${id}/overview`, { replace: true });
  }, [navigate, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
