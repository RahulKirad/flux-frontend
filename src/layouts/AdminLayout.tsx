import { useState } from 'react';
import { Outlet, NavLink, Navigate, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, FolderOpen, Award, Building2,
  Users, MessageSquare, Image, Settings, LogOut, Menu, BookOpen, PenTool,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import FluxLogo from '../components/common/FluxLogo';

const sidebarLinks = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Services', path: '/admin/services', icon: Briefcase },
  { label: 'Projects', path: '/admin/projects', icon: FolderOpen },
  { label: 'Case Studies', path: '/admin/case-studies', icon: BookOpen },
  { label: 'Blogs', path: '/admin/blogs', icon: PenTool },
  { label: 'Certifications', path: '/admin/certifications', icon: Award },
  { label: 'Facilities', path: '/admin/facilities', icon: Building2 },
  { label: 'Careers', path: '/admin/careers', icon: Users },
  { label: 'Leads', path: '/admin/leads', icon: MessageSquare },
  { label: 'Media', path: '/admin/media', icon: Image },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

function AdminShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary-900 text-white transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-primary-800">
          <FluxLogo className="h-10 w-auto rounded bg-white px-2 py-1 mb-3" />
          <p className="text-xs text-primary-300">CMS · {user?.role_name || user?.role_slug}</p>
        </div>
        <nav className="p-4 space-y-1 pb-24">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                  isActive ? 'bg-primary-700 text-white' : 'text-primary-200 hover:bg-primary-800'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-800 bg-primary-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-primary-200 hover:bg-primary-800 w-full transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-500 hover:underline hidden sm:block">
            View Website →
          </a>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminLoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <FluxLogo className="h-14 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
          <p className="text-gray-500 mt-1">Sign in to manage your website</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fluxcorp.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary !py-3 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In to Admin'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-primary-500">← Back to website</a>
        </p>
      </div>
    </div>
  );
}

/** Gate: shows login at /admin when unauthenticated, admin shell when authenticated */
export default function AdminGate() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <AdminLoginPage />;

  return <AdminShell />;
}
