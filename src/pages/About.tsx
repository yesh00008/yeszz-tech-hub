import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Globe, Shield, Code, Award } from "lucide-react";
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
                <motion.div
                  key={v.title}
                  variants={item}
                  className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group"
                >
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
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
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
      </main>
      <Footer />
    </div>
  );
};

export default About;
