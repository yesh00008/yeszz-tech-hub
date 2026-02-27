import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AuthorSpotlight = () => {
  const [authors, setAuthors] = useState<any[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      // Get profiles that have published posts
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, bio")
        .limit(6);

      if (profiles && profiles.length > 0) {
        // Get post counts for each author
        const authorsWithCounts = await Promise.all(
          profiles.map(async (profile) => {
            const { count } = await supabase
              .from("posts")
              .select("*", { count: "exact", head: true })
              .eq("author_id", profile.user_id)
              .eq("published", true);
            return { ...profile, postCount: count || 0 };
          })
        );
        setAuthors(authorsWithCounts.filter((a) => a.postCount > 0).slice(0, 4));
      }
    };
    fetchAuthors();
  }, []);

  if (authors.length === 0) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Author Spotlight</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {authors.map((author, i) => (
            <motion.div
              key={author.user_id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/creator/${author.user_id}`}
                className="group block rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-3 group-hover:bg-primary/20 transition-colors">
                  {author.avatar_url ? (
                    <img src={author.avatar_url} alt={author.display_name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    author.display_name?.[0]?.toUpperCase() || "U"
                  )}
                </div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{author.display_name || "Creator"}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{author.bio || "Tech Writer"}</p>
                <div className="mt-3 text-xs font-medium text-primary">{author.postCount} article{author.postCount !== 1 ? "s" : ""}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorSpotlight;
