import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import PostCard from "@/components/PostCard";

const CategoryDetail = () => {
  const { slug } = useParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: cat } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug!)
        .single();

      if (cat) {
        setCategory(cat);
        const { data: p } = await supabase
          .from("posts")
          .select("*, categories(name, slug, icon)")
          .eq("published", true)
          .eq("category_id", cat.id)
          .order("created_at", { ascending: false });
        if (p) setPosts(p);
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> All Categories
            </Link>

            {category && (
              <div className="flex items-center gap-4 mb-10">
                <span className="text-5xl">{category.icon}</span>
                <div>
                  <h1 className="text-4xl font-black">{category.name}</h1>
                  <p className="text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-secondary" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-secondary rounded w-3/4" />
                      <div className="h-3 bg-secondary rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
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
                    }}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No articles in this category yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
