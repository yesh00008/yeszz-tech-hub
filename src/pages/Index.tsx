import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import CategoriesSection from "@/components/CategoriesSection";
import TrendingSection from "@/components/TrendingSection";
import SearchOverlay from "@/components/SearchOverlay";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, catsRes] = await Promise.all([
        supabase.from("posts").select("*, categories(name, slug, icon)").eq("published", true).order("created_at", { ascending: false }),
        supabase.from("categories").select("*"),
      ]);
      if (postsRes.data) setPosts(postsRes.data);
      if (catsRes.data) setCategories(catsRes.data);
    };
    fetchData();
  }, []);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={handleSearchOpen} />
      <SearchOverlay open={searchOpen} onClose={handleSearchClose} />

      <main>
        <HeroSection />
        <TrendingSection posts={posts} />
        <CategoriesSection categories={categories} />

        <section id="latest" className="py-16 border-t border-border">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            {posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <PostCard
                    key={post.id}
                    post={{
                      id: post.id,
                      title: post.title,
                      summary: post.summary || "",
                      category: post.categories?.name || "General",
                      image: post.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
                      date: new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                      readTime: post.read_time || "5 min",
                      author: "Yeszz Team",
                      slug: post.slug,
                      featured: post.featured,
                    }}
                    index={i}
                    featured={i === 0}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-2">No articles yet</p>
                <p className="text-sm text-muted-foreground">Articles will appear here once published.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
