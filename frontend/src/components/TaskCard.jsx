const stageConfig = {
  "Todo": {
    dot: "bg-amber-400",
    badge: "bg-amber-400/15 text-amber-300 border border-amber-400/30",
  },
  "In Progress": {
    dot: "bg-indigo-400",
    badge: "bg-indigo-400/15 text-indigo-300 border border-indigo-400/30",
  },
  "Done": {
    dot: "bg-emerald-400",
    badge: "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
  },
};

const TaskCard = ({ task, onEdit, onDelete, index = 0 }) => {
  const config = stageConfig[task.stage] || stageConfig["Todo"];

  return (
    <div
      className="task-card glass rounded-2xl p-4 mb-3 group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-slate-100 leading-snug line-clamp-2 flex-1">
          {task.title}
        </h3>
        {/* Action buttons — visible on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          <button
            onClick={() => onEdit(task)}
            title="Edit"
            className="w-7 h-7 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 text-indigo-300 flex items-center justify-center transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            title="Delete"
            className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-300 flex items-center justify-center transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${config.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
          {task.stage}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
