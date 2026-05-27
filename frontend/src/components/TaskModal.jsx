import { useEffect, useState } from "react";

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "Todo",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay so CSS transition fires
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (task) {
      setFormData({ title: task.title, description: task.description, stage: task.stage });
    } else {
      setFormData({ title: "", description: "", stage: "Todo" });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        className="glass rounded-2xl w-full max-w-md shadow-2xl border border-white/10"
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {task
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                }
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">
              {task ? "Edit Task" : "New Task"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Task Title *</label>
            <input
              type="text"
              name="title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={handleChange}
              className="input-glow w-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 px-4 py-2.5 rounded-xl text-sm transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
            <textarea
              name="description"
              placeholder="Add some details..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="input-glow w-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 px-4 py-2.5 rounded-xl text-sm resize-none transition-all duration-200"
            />
          </div>

          {/* Stage */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="input-glow w-full bg-[#1a1a2e] border border-white/10 text-slate-100 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer"
            >
              <option value="Todo">📋 Todo</option>
              <option value="In Progress">⚡ In Progress</option>
              <option value="Done">✅ Done</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              <span>{task ? "Save Changes" : "Create Task"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
