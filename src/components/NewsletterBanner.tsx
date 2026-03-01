import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NewsletterBanner = () => {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" as const, stiffness: 100 }}
          className="rounded-2xl border border-border bg-card p-10 md:p-14 relative overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500"
        >
          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle, hsl(151 72% 40%) 1px, transparent 0)",
            backgroundSize: "16px 16px"
          }} />
          {/* Green glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-primary/[0.04] blur-[80px]" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-4"
              >
                <Sparkles className="h-3 w-3" /> Newsletter
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-black mb-2 text-foreground"
              >
                Never Miss a Story
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground max-w-md"
              >
                Join 50,000+ subscribers who get the best of tech delivered to their inbox every week.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/newsletter"
                className="hover-scale inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all whitespace-nowrap"
              >
                Subscribe Free <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
