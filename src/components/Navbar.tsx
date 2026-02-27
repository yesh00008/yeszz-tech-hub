import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, LogOut, ChevronDown, Moon, Sun, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Creator Services", to: "/creator/services" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const categories = [
  { name: "AI", slug: "ai", icon: "🤖" },
  { name: "Cybersecurity", slug: "cybersecurity", icon: "🔒" },
  { name: "Gadgets", slug: "gadgets", icon: "📱" },
  { name: "Programming", slug: "programming", icon: "💻" },
  { name: "Reviews", slug: "reviews", icon: "⭐" },
  { name: "Startups", slug: "startups", icon: "🚀" },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

const Navbar = ({ onSearchOpen }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [dbCategories, setDbCategories] = useState(categories);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    supabase.from("categories").select("name, slug, icon").then(({ data }) => {
      if (data && data.length > 0) setDbCategories(data);
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-gradient">Yeszz</span>
          <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">Tech</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="story-link px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
          >
            <span>Home</span>
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
              <span>Categories</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border bg-card shadow-card-hover p-2 z-50"
                >
                  {dbCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setCatOpen(false)}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <Link
                      to="/categories"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
                      onClick={() => setCatOpen(false)}
                    >
                      View All Categories
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="story-link px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-card px-1.5 text-[10px] font-mono">⌘K</kbd>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user && (
            <Link
              to="/bookmarks"
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors hidden sm:flex"
              aria-label="Bookmarks"
            >
              <Bookmark className="h-4 w-4" />
            </Link>
          )}

          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link
                to="/profile"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">Home</Link>
              
              {/* Mobile Categories Accordion */}
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileCatOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileCatOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {dbCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                      >
                        <span>{cat.icon}</span> {cat.name}
                      </Link>
                    ))}
                    <Link
                      to="/categories"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2 text-sm font-semibold text-primary"
                    >
                      View All
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link to="/bookmarks" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">Bookmarks</Link>
              )}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">Profile</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-left px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-lg transition-colors">Sign Out</button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-semibold text-primary">Sign In</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
