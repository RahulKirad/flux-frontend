import { useState } from 'react';
import { Outlet, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, FolderOpen, Award, Building2,
  Users, MessageSquare, Image, Settings, LogOut, Menu, BookOpen, PenTool, FileText, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import FluxLogo from '../components/common/FluxLogo';
import { WEBSITE_PAGES } from '../data/adminPages';

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
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pagesActive = location.pathname.startsWith('/admin/pages');
  const [pagesOpen, setPagesOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F3EEE4] flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#101820] text-white transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10">
          <FluxLogo className="h-10 w-auto rounded bg-white px-2 py-1 mb-3" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/90">Operations console</p>
          <p className="text-xs text-slate-400 mt-1">{user?.role_name || user?.role_slug}</p>
        </div>
        <nav className="p-3 space-y-0.5 pb-24 overflow-y-auto max-h-[calc(100vh-11rem)]">
          {sidebarLinks.slice(0, 1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-medium' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}

          <div>
            <button
              type="button"
              onClick={() => setPagesOpen((o) => !o)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                pagesActive ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <FileText size={18} />
              <span className="flex-1 text-left">Pages</span>
              <ChevronDown size={16} className={`transition ${pagesOpen ? 'rotate-180' : ''}`} />
            </button>
            {pagesOpen && (
              <div className="ml-3 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
                <NavLink
                  to="/admin/pages"
                  end
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded-lg text-xs ${isActive ? 'bg-amber-500 text-slate-950 font-medium' : 'text-slate-400 hover:text-white'}`
                  }
                >
                  All pages
                </NavLink>
                {WEBSITE_PAGES.map((page) => {
                  const pagePath = `/admin/pages/${page.id}`;
                  const isPageActive = location.pathname === pagePath;
                  return (
                    <div key={page.id}>
                      <NavLink
                        to={pagePath}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-1.5 rounded-lg text-xs ${isActive ? 'bg-amber-500 text-slate-950 font-medium' : 'text-slate-400 hover:text-white'}`
                        }
                      >
                        {page.nav}
                      </NavLink>
                      {isPageActive &&
                        page.related.map((rel) => (
                          <NavLink
                            key={rel.to}
                            to={rel.to}
                            onClick={() => setSidebarOpen(false)}
                            className="block pl-5 pr-3 py-1 text-[11px] text-slate-500 hover:text-amber-300"
                          >
                            {rel.label}
                          </NavLink>
                        ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {sidebarLinks.slice(1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-medium' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#101820]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/5 w-full transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#101820]/95 backdrop-blur text-white px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 border-b border-white/10">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-300 hover:text-amber-200 hidden sm:block">
            View public site →
          </a>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-slate-300">{user?.name}</span>
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 text-sm font-bold">
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
      await login(email.trim(), password);
      navigate('/admin');
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(msg === 'Validation failed' ? 'Enter username admin or your email, and password.' : (msg || 'Invalid username or password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101820] flex items-center justify-center p-4">
      <div className="bg-[#F3EEE4] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-amber-500/30">
        <div className="text-center mb-8">
          <FluxLogo className="h-14 w-auto mx-auto mb-4" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-amber-800 font-semibold">Operations console</p>
          <h1 className="text-2xl font-semibold text-slate-900 mt-1">Admin sign-in</h1>
          <p className="text-slate-500 mt-1 text-sm">Live CMS for fluxcorporation.in</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username or email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin"
              autoComplete="username"
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
              autoComplete="current-password"
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
