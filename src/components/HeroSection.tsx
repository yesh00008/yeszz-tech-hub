import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 border-b border-border">
      {/* Dot grid inherited from body, clean white bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-foreground mb-6"
          >
            <Zap className="h-3.5 w-3.5 text-primary" />
            Your daily dose of tech
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-6 text-foreground">
            Where Technology
            <br />
            <span className="text-gradient">Meets Insight</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
            AI breakthroughs, cybersecurity deep dives, product reviews, and programming tutorials — all in one place.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#latest"
              className="hover-scale inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all"
            >
              Explore Articles
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/categories"
              className="hover-scale inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
            >
              Browse Categories
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
