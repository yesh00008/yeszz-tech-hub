import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });
    if (error) {
      if (error.code === "23505") toast.info("You're already subscribed!");
      else toast.error("Failed to subscribe. Try again.");
    } else {
      toast.success("Subscribed! Welcome to Yeszz.");
      setEmail("");
    }
    setSubLoading(false);
  };

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-xl font-black text-gradient">Yeszz</span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Your daily source for technology news, tutorials, and insights.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["AI", "Cybersecurity", "Programming", "Gadgets"].map((c) => (
                <li key={c}><Link to="/categories" className="hover:text-foreground transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get the latest tech updates in your inbox.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 rounded-lg border border-border bg-secondary px-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                disabled={subLoading}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all disabled:opacity-50"
              >
                {subLoading ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Yeszz. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
