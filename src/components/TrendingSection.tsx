import { Link } from "react-router-dom";
import { TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface TrendingSectionProps {
  posts: any[];
}

const TrendingSection = ({ posts }: TrendingSectionProps) => {
  const trending = posts.filter((p) => p.trending).slice(0, 4);

  if (trending.length === 0) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="container">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/post/${post.slug}`}
                className="group flex gap-4 items-start rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-3xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{post.categories?.name || "General"}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.read_time || "5 min"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
