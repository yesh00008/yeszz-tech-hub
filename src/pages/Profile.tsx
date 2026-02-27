import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Globe, FileText, Save, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    display_name: "",
    bio: "",
    website: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile({
          display_name: data.display_name || "",
          bio: data.bio || "",
          website: data.website || "",
          avatar_url: data.avatar_url || "",
        });
      }
    };
    fetchProfile();
  }, [user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        bio: profile.bio,
        website: profile.website,
        avatar_url: profile.avatar_url,
      })
      .eq("user_id", user.id);

    if (error) toast.error("Failed to update profile");
    else toast.success("Profile updated!");
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="py-16">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground mb-8">Manage your account and preferences</p>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  {profile.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "Y"}
                </div>
                <div>
                  <h2 className="font-semibold">{profile.display_name || "User"}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" /> Display Name
                  </label>
                  <input
                    type="text"
                    value={profile.display_name}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                    className="w-full rounded-lg border border-input bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" /> Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-input bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" /> Website
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yoursite.com"
                    className="w-full rounded-lg border border-input bg-secondary px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
