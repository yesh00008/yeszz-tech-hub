import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Copy, Check, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";
import PostCard from "@/components/PostCard";
import PostReactions from "@/components/PostReactions";
import CommentsSection from "@/components/CommentsSection";
import FollowButton from "@/components/FollowButton";

const BlogPost = () => {
  const { slug } = useParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*, categories(name, slug, icon)")
        .eq("slug", slug!)
        .eq("published", true)
        .single();

      if (data) {
        setPost(data);
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
            <div className="h-4 bg-secondary rounded w-1/3" />
            <div className="h-64 bg-secondary rounded-xl mt-8" />
            <div className="space-y-3 mt-8">
              <div className="h-4 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded w-5/6" />
              <div className="h-4 bg-secondary rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-6xl font-black text-gradient mb-4">404</div>
          <h1 className="text-2xl font-bold mb-3">Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const catName = post.categories?.name || "General";

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
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
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
            </div>

            {post.image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl overflow-hidden mb-10"
              >
                <img src={post.image_url} alt={post.title} className="w-full aspect-[2/1] object-cover" loading="lazy" />
              </motion.div>
            )}

            {post.content && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* Reactions & Bookmark */}
            <div className="mt-10 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <PostReactions
                postId={post.id}
                onCommentClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
              />
              {post.author_id && (
                <FollowButton authorId={post.author_id} />
              )}
            </div>

            {/* Comments */}
            <CommentsSection postId={post.id} />
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
      <BackToTop />
    </div>
  );
};

export default BlogPost;
