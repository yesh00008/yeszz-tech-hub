import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoriesSectionProps {
  categories: any[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (categories.length === 0) return null;

  return (
    <section id="categories" className="py-16">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-2xl group-hover:animate-float">{cat.icon}</span>
                <span className="text-sm font-semibold text-foreground">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
