import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Globe, Shield, Code, Award, Mail, ArrowRight, Sparkles, DollarSign, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";

const values = [
  { icon: Zap, title: "Innovation First", desc: "We cover the bleeding edge so you're always ahead of the curve." },
  { icon: Shield, title: "Trusted Content", desc: "Every article is fact-checked and reviewed by industry experts." },
  { icon: Code, title: "Developer Focused", desc: "Real tutorials, real code — no fluff, just what works." },
  { icon: Users, title: "Community Driven", desc: "Built by tech enthusiasts, for tech enthusiasts worldwide." },
  { icon: Globe, title: "Global Reach", desc: "Covering tech stories from Silicon Valley to Bangalore and beyond." },
  { icon: Award, title: "Quality First", desc: "We'd rather publish less but ensure every piece adds real value." },
];

const creatorFeatures = [
  { icon: Sparkles, title: "AI Writing Assistant", desc: "Get AI-powered suggestions, outlines, and content generation to speed up your workflow." },
  { icon: DollarSign, title: "Revenue Share", desc: "Earn money from your articles through our fair revenue share model." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track views, engagement, earnings, and audience growth in real-time." },
  { icon: Users, title: "Build Your Audience", desc: "Gain followers, receive tips, and grow your personal brand with us." },
];

const About = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main>
        {/* Hero */}
        <section className="bg-hero text-primary-foreground py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(hsl(151 72% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(151 72% 40%) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
          <div className="container relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">About <span className="text-gradient">Yeszz</span></h1>
              <p className="text-lg opacity-70 max-w-xl leading-relaxed">
                We're a team of passionate technologists, developers, and writers on a mission to make technology accessible, understandable, and exciting for everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Yeszz was born from a simple idea: tech content shouldn't be gatekept behind jargon and complexity. We started in 2024 as a small blog and have grown into a trusted source for hundreds of thousands of readers.</p>
                <p>We cover everything from AI breakthroughs to cybersecurity threats, from startup culture to in-depth programming tutorials. Our goal is to help you stay informed, learn new skills, and make better decisions about the technology that shapes our world.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-t border-border">
          <div className="container">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold mb-8 text-center">What We Stand For</motion.h2>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((v) => (
                <motion.div key={v.title} variants={item} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group">
                  <v.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-t border-border">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: "500K+", label: "Monthly Readers" },
                { num: "2,000+", label: "Articles Published" },
                { num: "50+", label: "Contributors" },
                { num: "6", label: "Categories" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="text-3xl font-black text-gradient mb-1">{s.num}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Creator Services Section */}
        <section className="py-16 border-t border-border">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-black mb-3">Creator Services</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Join our creator program to write, earn, and grow your audience. Everything you need to succeed as a tech content creator.</p>
            </motion.div>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {creatorFeatures.map((f) => (
                <motion.div key={f.title} variants={item} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center">
              <Link to="/creator/services" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all">
                Explore Creator Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 border-t border-border">
          <div className="container max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-black mb-3">Stay in the Loop</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">Get the best tech stories, tutorials, and insights delivered straight to your inbox every week.</p>
              <Link to="/newsletter" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all">
                Subscribe to Newsletter <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
