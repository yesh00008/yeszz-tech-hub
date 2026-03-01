import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
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
import TableOfContents from "@/components/TableOfContents";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReadingTimeEstimator from "@/components/ReadingTimeEstimator";

const BlogPost = () => {
  const { slug } = useParams();
  const [searchOpen, setSearchOpen] = useState(false);
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
        // Increment views
        supabase.from("posts").update({ views: (data.views || 0) + 1 }).eq("id", data.id).then();
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
      <div className="min-h-screen">
        <Navbar onSearchOpen={() => setSearchOpen(true)} />
        <div className="container max-w-4xl py-20">
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-secondary rounded w-20" />
            <div className="h-10 bg-secondary rounded w-3/4" />
            <div className="h-6 bg-secondary rounded w-1/2" />
            <div className="h-64 bg-secondary rounded-xl mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen">
      <ReadingProgress />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <article className="py-10">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to articles
            </Link>

            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${categoryColors[catName] || "bg-secondary text-secondary-foreground"}`}>
              {catName}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 text-primary">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{post.summary}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">Y</div>
                <span className="font-medium text-foreground">Yeszz Team</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {post.content && <ReadingTimeEstimator content={post.content} />}
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {post.views || 0} views
                </span>
              </div>
              <SocialShareButtons url={window.location.href} title={post.title} />
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

            {/* Content with TOC sidebar */}
            <div className="flex gap-10">
              <div className="flex-1 min-w-0">
                {post.content && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </div>
              
              {/* Table of Contents - desktop sidebar */}
              {post.content && (
                <aside className="hidden lg:block w-56 shrink-0">
                  <div className="sticky top-20">
                    <TableOfContents contentHtml={post.content} />
                  </div>
                </aside>
              )}
            </div>

            {/* Reactions & Follow */}
            <div className="mt-10 pt-8 flex items-center justify-between flex-wrap gap-4">
              <PostReactions
                postId={post.id}
                onCommentClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
              />
              {post.author_id && (
                <FollowButton authorId={post.author_id} />
              )}
            </div>

            {/* Share bar at bottom */}
            <div className="mt-6 py-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Share this article</span>
              <SocialShareButtons url={window.location.href} title={post.title} />
            </div>

            {/* Comments */}
            <CommentsSection postId={post.id} />
          </motion.div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold mb-2">Related Articles</h2>
            <p className="text-sm text-muted-foreground mb-8">More from {catName}</p>
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
