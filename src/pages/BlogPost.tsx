import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import PostCard from "@/components/PostCard";

const BlogPost = () => {
  const { slug } = useParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*, categories(name, slug, icon)")
        .eq("slug", slug!)
        .eq("published", true)
        .single();

      if (data) {
        setPost(data);
        // Fetch related
        const { data: rel } = await supabase
          .from("posts")
          .select("*, categories(name, slug, icon)")
          .eq("published", true)
          .eq("category_id", data.category_id)
          .neq("id", data.id)
          .limit(3);
        if (rel) setRelated(rel);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    AI: "bg-primary/10 text-primary",
    Cybersecurity: "bg-destructive/10 text-destructive",
    Gadgets: "bg-emerald-500/10 text-emerald-600",
    Programming: "bg-amber-500/10 text-amber-600",
    Startups: "bg-violet-500/10 text-violet-600",
    Reviews: "bg-pink-500/10 text-pink-600",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <div className="container max-w-3xl py-20">
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-secondary rounded w-20" />
            <div className="h-10 bg-secondary rounded w-3/4" />
            <div className="h-6 bg-secondary rounded w-1/2" />
            <div className="h-64 bg-secondary rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const catName = post.categories?.name || "General";

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <article className="py-10">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to articles
            </Link>

            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${categoryColors[catName] || "bg-secondary text-secondary-foreground"}`}>
              {catName}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.summary}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">Y</div>
                <span className="font-medium text-foreground">Yeszz Team</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.read_time || "5 min"}
                </span>
              </div>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>

            {post.image_url && (
              <div className="rounded-xl overflow-hidden mb-10">
                <img src={post.image_url} alt={post.title} className="w-full aspect-[2/1] object-cover" />
              </div>
            )}

            {post.content && (
              <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </motion.div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <PostCard
                  key={p.id}
                  post={{
                    id: p.id,
                    title: p.title,
                    summary: p.summary || "",
                    category: p.categories?.name || "General",
                    image: p.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
                    date: new Date(p.published_at || p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    readTime: p.read_time || "5 min",
                    author: "Yeszz Team",
                    slug: p.slug,
                  }}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
