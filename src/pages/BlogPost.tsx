import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import PostCard from "@/components/PostCard";
import { posts } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = posts.find((p) => p.slug === slug);
  const related = posts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <article className="py-10">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${categoryColors[post.category] || "bg-secondary text-secondary-foreground"}`}>
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{post.summary}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  Y
                </div>
                <span className="font-medium text-foreground">{post.author}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
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
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors">
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full aspect-[2/1] object-cover" />
            </div>

            {/* Post Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: post.content || `
                  <p>${post.summary}</p>
                  <h2>What This Means</h2>
                  <p>The tech landscape is constantly evolving, and this development represents a significant shift in how we approach ${post.category.toLowerCase()}. Industry experts are weighing in on the implications, and the consensus points to lasting impact.</p>
                  <h2>Key Takeaways</h2>
                  <ul>
                    <li>This could reshape the ${post.category.toLowerCase()} industry significantly</li>
                    <li>Early adopters stand to benefit the most</li>
                    <li>The full impact will unfold over the coming months</li>
                  </ul>
                  <h2>Looking Ahead</h2>
                  <p>As we continue to track these developments, Yeszz will bring you in-depth analysis and expert perspectives. Stay tuned for more coverage.</p>
                `
              }}
            />
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
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
