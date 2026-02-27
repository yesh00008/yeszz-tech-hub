import { motion } from "framer-motion";
import { categories } from "@/data/posts";

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-16">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} articles</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
