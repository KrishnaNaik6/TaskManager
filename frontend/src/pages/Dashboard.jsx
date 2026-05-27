import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../api/axios";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const STAGES = ["Todo", "In Progress", "Done"];

const columnConfig = {
  "Todo": {
    icon: "📋",
    accent: "col-todo",
    countBg: "bg-amber-400/15 text-amber-300",
    emptyIcon: "🗒️",
    emptyText: "No tasks yet",
  },
  "In Progress": {
    icon: "⚡",
    accent: "col-progress",
    countBg: "bg-indigo-400/15 text-indigo-300",
    emptyIcon: "🚀",
    emptyText: "Nothing in progress",
  },
  "Done": {
    icon: "✅",
    accent: "col-done",
    countBg: "bg-emerald-400/15 text-emerald-300",
    emptyIcon: "🎉",
    emptyText: "No completed tasks",
  },
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data.tasks);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSave = async (taskData) => {
    try {
      if (selectedTask) {
        await API.put(`/tasks/${selectedTask._id}`, taskData);
        toast.success("Task updated");
      } else {
        await API.post("/tasks", taskData);
        toast.success("Task created");
      }
      fetchTasks();
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.stage === "Done").length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ background: "#0f0f1a" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              My <span className="gradient-text">Workspace</span>
            </h2>
            <p className="text-sm text-slate-500">
              {totalTasks === 0
                ? "No tasks yet — create your first one"
                : `${doneTasks} of ${totalTasks} tasks completed`}
            </p>
          </div>

          <button
            onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}
            className="btn-gradient flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-lg leading-none">+</span>
            <span>New Task</span>
          </button>
        </div>

        {/* ── Progress bar ── */}
        {totalTasks > 0 && (
          <div className="glass rounded-2xl p-4 mb-8 animate-fade-in-up delay-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Overall Progress</span>
              <span className="text-xs font-bold text-indigo-400">{progress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
                }}
              />
            </div>
            <div className="flex gap-6 mt-3">
              {STAGES.map((stage) => {
                const count = tasks.filter((t) => t.stage === stage).length;
                const cfg = columnConfig[stage];
                return (
                  <div key={stage} className="flex items-center gap-1.5">
                    <span className="text-xs">{cfg.icon}</span>
                    <span className="text-xs text-slate-400">{stage}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${cfg.countBg}`}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Columns ── */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {STAGES.map((stage, colIdx) => {
              const cfg = columnConfig[stage];
              const stageTasks = tasks.filter((t) => t.stage === stage);
              return (
                <div
                  key={stage}
                  className={`glass rounded-2xl overflow-hidden animate-fade-in-up`}
                  style={{ animationDelay: `${colIdx * 0.1}s` }}
                >
                  {/* Column header */}
                  <div className={`${cfg.accent} px-4 pt-4 pb-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{cfg.icon}</span>
                        <h3 className="text-sm font-bold text-slate-200">{stage}</h3>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.countBg}`}>
                        {stageTasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="p-3 min-h-[200px]">
                    {stageTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 gap-2 opacity-40">
                        <span className="text-3xl">{cfg.emptyIcon}</span>
                        <p className="text-xs text-slate-500">{cfg.emptyText}</p>
                      </div>
                    ) : (
                      stageTasks.map((task, i) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          index={i}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedTask(null); }}
        onSave={handleSave}
        task={selectedTask}
      />
    </div>
  );
};

export default Dashboard;
