import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "@/data/posts";

const categoryColors: Record<string, string> = {
  AI: "bg-primary/10 text-primary",
  Cybersecurity: "bg-destructive/10 text-destructive",
  Gadgets: "bg-emerald-500/10 text-emerald-600",
  Programming: "bg-amber-500/10 text-amber-600",
  Startups: "bg-violet-500/10 text-violet-600",
  Reviews: "bg-pink-500/10 text-pink-600",
};

interface PostCardProps {
  post: Post;
  index?: number;
  featured?: boolean;
}

const PostCard = ({ post, index = 0, featured = false }: PostCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`group ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <Link to={`/post/${post.slug}`} className="block h-full">
        <div className="h-full rounded-xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
          <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[post.category] || "bg-secondary text-secondary-foreground"}`}>
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className={`font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 ${featured ? "text-xl md:text-2xl" : "text-base"}`}>
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {post.summary}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
