import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, Send, Eye, EyeOff, Sparkles, Wand2, FileText, Tag, Hash,
  ArrowLeft, Image, Bold, Italic, Code, Heading2, List, Quote, Link2, Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { useAIWriter } from "@/hooks/useAIWriter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";
import { toast } from "sonner";

const WriteEditor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { runAI, loading: aiLoading, streamedContent } = useAIWriter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState("");

  const [post, setPost] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    image_url: "",
    category_id: "",
    read_time: "5 min",
    meta_description: "",
    meta_keywords: "",
    status: "draft" as string,
  });

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    supabase.from("categories").select("*").then(({ data }) => {
      if (data) setCategories(data);
    });
    if (id) {
      supabase.from("posts").select("*").eq("id", id).eq("author_id", user.id).single().then(({ data }) => {
        if (data) setPost({
          title: data.title || "",
          slug: data.slug || "",
          summary: data.summary || "",
          content: data.content || "",
          image_url: data.image_url || "",
          category_id: data.category_id || "",
          read_time: data.read_time || "5 min",
          meta_description: (data as any).meta_description || "",
          meta_keywords: (data as any).meta_keywords || "",
          status: (data as any).status || "draft",
        });
      });
    }
  }, [user, id, navigate]);

  const generateSlug = useCallback((title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }, []);

  const handleTitleChange = (title: string) => {
    setPost(p => ({ ...p, title, slug: generateSlug(title) }));
  };

  const insertFormatting = (tag: string) => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = post.content.substring(start, end);
    let formatted = "";
    switch (tag) {
      case "bold": formatted = `<strong>${selected || "bold text"}</strong>`; break;
      case "italic": formatted = `<em>${selected || "italic text"}</em>`; break;
      case "code": formatted = `<pre><code>${selected || "code"}</code></pre>`; break;
      case "h2": formatted = `<h2>${selected || "Heading"}</h2>`; break;
      case "list": formatted = `<ul>\n<li>${selected || "Item"}</li>\n</ul>`; break;
      case "quote": formatted = `<blockquote>${selected || "Quote"}</blockquote>`; break;
      case "link": formatted = `<a href="url">${selected || "link text"}</a>`; break;
      case "image": formatted = `<img src="${selected || "image-url"}" alt="description" />`; break;
    }
    const newContent = post.content.substring(0, start) + formatted + post.content.substring(end);
    setPost(p => ({ ...p, content: newContent }));
  };

  const handleSave = async (publish = false) => {
    if (!user) return;
    if (!post.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);

    const payload = {
      title: post.title,
      slug: post.slug || generateSlug(post.title),
      summary: post.summary,
      content: post.content,
      image_url: post.image_url,
      category_id: post.category_id || null,
      read_time: post.read_time,
      meta_description: post.meta_description,
      meta_keywords: post.meta_keywords,
      author_id: user.id,
      published: publish,
      status: publish ? "published" : post.status === "published" ? "published" : "draft",
      ...(publish ? { published_at: new Date().toISOString() } : {}),
    };

    let error;
    if (id) {
      ({ error } = await supabase.from("posts").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("posts").insert(payload));
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(publish ? "Published!" : "Draft saved!");
      if (!id) navigate("/creator/dashboard");
    }
    setSaving(false);
  };

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) { toast.error("Enter a topic first"); return; }
    try {
      const result = await runAI("generate", { topic: aiTopic });
      setPost(p => ({ ...p, content: result }));
      toast.success("Content generated!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleAIImprove = async () => {
    if (!post.content.trim()) { toast.error("Write some content first"); return; }
    try {
      const result = await runAI("improve", { content: post.content });
      setPost(p => ({ ...p, content: result }));
      toast.success("Content improved!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleAISummary = async () => {
    if (!post.content.trim()) return;
    try {
      const result = await runAI("summarize", { content: post.content });
      setPost(p => ({ ...p, summary: result }));
      toast.success("Summary generated!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleAISEO = async () => {
    if (!post.content.trim()) return;
    try {
      const result = await runAI("seo", { content: post.content, topic: post.title });
      try {
        const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);
        setPost(p => ({
          ...p,
          meta_description: parsed.metaDescription || p.meta_description,
          meta_keywords: (parsed.tags || []).join(", "),
        }));
        toast.success("SEO suggestions applied!");
      } catch {
        toast.info("SEO analysis complete — check the results");
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const toolbarButtons = [
    { icon: Bold, action: "bold", label: "Bold" },
    { icon: Italic, action: "italic", label: "Italic" },
    { icon: Heading2, action: "h2", label: "Heading" },
    { icon: Code, action: "code", label: "Code" },
    { icon: List, action: "list", label: "List" },
    { icon: Quote, action: "quote", label: "Quote" },
    { icon: Link2, action: "link", label: "Link" },
    { icon: Image, action: "image", label: "Image" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="py-8">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => navigate("/creator/dashboard")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Dashboard
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => setPreview(!preview)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                  {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {preview ? "Edit" : "Preview"}
                </button>
                <button onClick={() => handleSave(false)} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-all">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Draft
                </button>
                <button onClick={() => handleSave(true)} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-primary hover:brightness-110 transition-all">
                  <Send className="h-4 w-4" /> Publish
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_300px] gap-6">
              {/* Editor */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title..."
                  className="w-full text-3xl sm:text-4xl font-black bg-transparent outline-none placeholder:text-muted-foreground/40"
                />
                <input
                  type="text"
                  value={post.summary}
                  onChange={(e) => setPost(p => ({ ...p, summary: e.target.value }))}
                  placeholder="Write a brief summary..."
                  className="w-full text-lg text-muted-foreground bg-transparent outline-none placeholder:text-muted-foreground/30"
                />

                {!preview ? (
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-secondary/50 flex-wrap">
                      {toolbarButtons.map((btn) => (
                        <button
                          key={btn.action}
                          onClick={() => insertFormatting(btn.action)}
                          className="p-2 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                          title={btn.label}
                        >
                          <btn.icon className="h-4 w-4" />
                        </button>
                      ))}
                      <div className="w-px h-6 bg-border mx-1" />
                      <button
                        onClick={() => setShowAI(!showAI)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${showAI ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-background"}`}
                      >
                        <Sparkles className="h-4 w-4" /> AI Assistant
                      </button>
                    </div>

                    {/* AI Panel */}
                    <AnimatePresence>
                      {showAI && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-b border-border overflow-hidden"
                        >
                          <div className="p-4 bg-primary/5 space-y-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={aiTopic}
                                onChange={(e) => setAiTopic(e.target.value)}
                                placeholder="Enter a topic to generate content..."
                                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                              />
                              <button onClick={handleAIGenerate} disabled={aiLoading} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all disabled:opacity-50">
                                {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />} Generate
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button onClick={handleAIImprove} disabled={aiLoading} className="text-xs rounded-full border border-border px-3 py-1 hover:bg-secondary transition-colors disabled:opacity-50">
                                ✨ Improve Writing
                              </button>
                              <button onClick={handleAISummary} disabled={aiLoading} className="text-xs rounded-full border border-border px-3 py-1 hover:bg-secondary transition-colors disabled:opacity-50">
                                📝 Auto Summary
                              </button>
                              <button onClick={handleAISEO} disabled={aiLoading} className="text-xs rounded-full border border-border px-3 py-1 hover:bg-secondary transition-colors disabled:opacity-50">
                                🔍 SEO Suggestions
                              </button>
                            </div>
                            {aiLoading && streamedContent && (
                              <div className="text-xs text-muted-foreground bg-background rounded-lg p-3 max-h-32 overflow-auto">
                                Generating... {streamedContent.length} chars
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Content Editor */}
                    <textarea
                      id="content-editor"
                      value={post.content}
                      onChange={(e) => setPost(p => ({ ...p, content: e.target.value }))}
                      placeholder="Write your content in HTML... Use the toolbar or AI assistant to help."
                      className="w-full min-h-[500px] p-6 bg-transparent font-mono text-sm outline-none resize-none"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-card p-8">
                    <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content || "<p class='text-muted-foreground'>Nothing to preview yet...</p>" }} />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Status */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" /> Post Settings
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Slug</label>
                      <input
                        type="text"
                        value={post.slug}
                        onChange={(e) => setPost(p => ({ ...p, slug: e.target.value }))}
                        className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                      <select
                        value={post.category_id}
                        onChange={(e) => setPost(p => ({ ...p, category_id: e.target.value }))}
                        className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-all"
                      >
                        <option value="">Select category</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Read Time</label>
                      <input
                        type="text"
                        value={post.read_time}
                        onChange={(e) => setPost(p => ({ ...p, read_time: e.target.value }))}
                        className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Cover Image URL</label>
                      <input
                        type="url"
                        value={post.image_url}
                        onChange={(e) => setPost(p => ({ ...p, image_url: e.target.value }))}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-all"
                      />
                      {post.image_url && (
                        <img src={post.image_url} alt="Cover" className="mt-2 rounded-lg w-full aspect-video object-cover" />
                      )}
                    </div>
                  </div>
                </div>

                {/* SEO */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" /> SEO & Tags
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Meta Description</label>
                      <textarea
                        value={post.meta_description}
                        onChange={(e) => setPost(p => ({ ...p, meta_description: e.target.value }))}
                        rows={3}
                        placeholder="SEO description (under 160 chars)"
                        className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-all resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{post.meta_description.length}/160</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Keywords / Tags</label>
                      <input
                        type="text"
                        value={post.meta_keywords}
                        onChange={(e) => setPost(p => ({ ...p, meta_keywords: e.target.value }))}
                        placeholder="react, ai, web development"
                        className="w-full rounded-lg border border-input bg-secondary px-3 py-2 text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <button onClick={handleAISEO} disabled={aiLoading} className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-all disabled:opacity-50">
                      <Sparkles className="h-4 w-4" /> Auto-Generate SEO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WriteEditor;
