import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PostCard from "@/components/PostCard";
import CategoriesSection from "@/components/CategoriesSection";
import TrendingSection from "@/components/TrendingSection";
import SearchOverlay from "@/components/SearchOverlay";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";

const Index = () => {
  const [searchOpen, setSearchOpen] = useState(false);

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

  const featured = posts.filter((p) => p.featured);
  const latest = posts.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={handleSearchOpen} />
      <SearchOverlay open={searchOpen} onClose={handleSearchClose} />

      <main>
        <HeroSection />
        <TrendingSection />
        <CategoriesSection />

        {/* Latest Posts */}
        <section id="latest" className="py-16 border-t border-border">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured[0] && <PostCard post={featured[0]} index={0} featured />}
              {latest.filter((p) => p.id !== featured[0]?.id).slice(0, 5).map((post, i) => (
                <PostCard key={post.id} post={post} index={i + 1} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
