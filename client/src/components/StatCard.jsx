import React from "react";

const TONES = {
  primary: "bg-primary-50 text-primary-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
};

const StatCard = React.memo(function StatCard({ icon: Icon, label, value, tone = "primary" }) {
  return (
    <div className="card p-5 flex items-center gap-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-hover">
      <div className={`h-11 w-11 shrink-0 rounded-control flex items-center justify-center ${TONES[tone]}`}>
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
      </div>
    </div>
  );
});

export default StatCard;
