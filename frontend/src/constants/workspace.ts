import {
  BarChart3,
  Bookmark,
  CalendarDays,
  CheckSquare,
  FolderKanban,
  LayoutGrid,
  Library,
  MessageSquareText,
  PenTool,
  Search,
  Settings,
  Sparkles,
  Target,
  Users,
  Wallet,
} from "lucide-react";

export const workspaceModules = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid, active: true },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "scheduler", label: "Scheduler", icon: CalendarDays },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "notes", label: "Notes", icon: PenTool },
  { id: "crm", label: "CRM", icon: Users },
  { id: "content", label: "Content Planner", icon: MessageSquareText },
  { id: "seo", label: "SEO Workspace", icon: Search },
  { id: "finance", label: "Finance", icon: Wallet },
  { id: "knowledge", label: "Knowledge Base", icon: Library },
  { id: "assets", label: "Assets", icon: Sparkles },
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "goals", label: "Goals", icon: Target },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const priorities = [
  { title: "Launch Orbit onboarding", due: "Today · 11:30", pct: 82 },
  { title: "Client proposal review", due: "Today · 15:00", pct: 64 },
  { title: "SEO audit for Aformix", due: "Tomorrow · 09:00", pct: 47 },
];

export const activityFeed = [
  { title: "New note created", detail: "Operating system blueprint", time: "8 min ago" },
  { title: "Project updated", detail: "Aformix website refresh", time: "24 min ago" },
  { title: "Invoice sent", detail: "Northstar Studio", time: "1 hr ago" },
];

export const stats = [
  { label: "Today focus", value: "5.2h", hint: "Healthy pace" },
  { label: "Revenue", value: "$12.8k", hint: "This month" },
  { label: "Tasks done", value: "18", hint: "Completed" },
  { label: "Productivity", value: "92%", hint: "Momentum" },
];
