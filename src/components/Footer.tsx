import { Link } from "react-router-dom";

const Footer = () => {
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
              <li><Link to="/" className="hover:text-foreground transition-colors">AI & Machine Learning</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Cybersecurity</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Programming</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Gadgets & Reviews</Link></li>
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
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 rounded-lg border border-border bg-secondary px-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors"
              />
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all">
                Join
              </button>
            </div>
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
