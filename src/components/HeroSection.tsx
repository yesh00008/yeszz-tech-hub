import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-hero text-primary-foreground py-20 md:py-28 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(217 91% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 60%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            Your daily dose of tech
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-6">
            Where Technology
            <br />
            <span className="text-gradient">Meets Insight</span>
          </h1>

          <p className="text-lg md:text-xl opacity-70 max-w-xl mb-8 leading-relaxed">
            AI breakthroughs, cybersecurity deep dives, product reviews, and programming tutorials — all in one place.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#latest"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all"
            >
              Explore Articles
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-semibold hover:bg-primary/10 transition-all"
            >
              Browse Categories
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
