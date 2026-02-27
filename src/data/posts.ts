export interface Post {
  id: string;
  title: string;
  summary: string;
  category: Category;
  image: string;
  date: string;
  readTime: string;
  author: string;
  slug: string;
  featured?: boolean;
  trending?: boolean;
  content?: string;
}

export type Category = "AI" | "Cybersecurity" | "Gadgets" | "Programming" | "Startups" | "Reviews";

export const categories: { name: Category; icon: string; count: number }[] = [
  { name: "AI", icon: "🤖", count: 24 },
  { name: "Cybersecurity", icon: "🔒", count: 18 },
  { name: "Gadgets", icon: "📱", count: 31 },
  { name: "Programming", icon: "💻", count: 42 },
  { name: "Startups", icon: "🚀", count: 15 },
  { name: "Reviews", icon: "⭐", count: 22 },
];

export const posts: Post[] = [
  {
    id: "1",
    title: "GPT-5 Is Here: What It Means for the Future of AI",
    summary: "OpenAI's latest model brings unprecedented reasoning capabilities and multimodal understanding that could reshape entire industries.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    date: "Feb 26, 2026",
    readTime: "6 min",
    author: "Yeszz Team",
    slug: "gpt-5-future-of-ai",
    featured: true,
    trending: true,
    content: `<h2>The Next Leap in AI</h2><p>OpenAI has officially released GPT-5, and the results are nothing short of extraordinary. The new model demonstrates a level of reasoning and contextual understanding that surpasses all previous benchmarks.</p><pre><code class="language-python">import openai

client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)
print(response.choices[0].message.content)</code></pre><p>Early benchmarks show a 40% improvement in complex reasoning tasks compared to GPT-4o, with significantly reduced hallucination rates.</p><h2>Key Improvements</h2><ul><li>Enhanced multi-step reasoning</li><li>Native multimodal processing</li><li>Reduced latency by 60%</li><li>Better code generation across 50+ languages</li></ul>`,
  },
  {
    id: "2",
    title: "Zero-Day Exploit Found in Popular IoT Framework",
    summary: "Security researchers discover critical vulnerability affecting millions of smart home devices worldwide.",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80",
    date: "Feb 25, 2026",
    readTime: "4 min",
    author: "Yeszz Team",
    slug: "zero-day-iot-exploit",
    trending: true,
  },
  {
    id: "3",
    title: "Building a Real-Time Dashboard with React and WebSockets",
    summary: "A step-by-step guide to creating performant, live-updating dashboards using modern web technologies.",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    date: "Feb 24, 2026",
    readTime: "12 min",
    author: "Yeszz Team",
    slug: "react-websocket-dashboard",
    featured: true,
  },
  {
    id: "4",
    title: "Apple Vision Pro 2: A Leap in Spatial Computing",
    summary: "Apple's second-generation headset delivers on the promise of mixed reality with lighter design and better display.",
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80",
    date: "Feb 23, 2026",
    readTime: "5 min",
    author: "Yeszz Team",
    slug: "apple-vision-pro-2",
    trending: true,
  },
  {
    id: "5",
    title: "How This AI Startup Raised $50M in Stealth Mode",
    summary: "An inside look at how a team of three engineers built an AI platform that attracted top-tier VC funding.",
    category: "Startups",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    date: "Feb 22, 2026",
    readTime: "7 min",
    author: "Yeszz Team",
    slug: "ai-startup-50m-raise",
  },
  {
    id: "6",
    title: "Samsung Galaxy S26 Ultra: The Complete Review",
    summary: "We spent two weeks with Samsung's flagship phone. Here's everything you need to know before buying.",
    category: "Reviews",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
    date: "Feb 21, 2026",
    readTime: "10 min",
    author: "Yeszz Team",
    slug: "samsung-galaxy-s26-review",
    featured: true,
  },
  {
    id: "7",
    title: "Rust vs Go in 2026: Which Should You Learn?",
    summary: "A comprehensive comparison of two of the most popular systems programming languages for modern development.",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800&q=80",
    date: "Feb 20, 2026",
    readTime: "8 min",
    author: "Yeszz Team",
    slug: "rust-vs-go-2026",
  },
  {
    id: "8",
    title: "The Rise of AI Agents: Autonomous Systems in Production",
    summary: "How companies are deploying AI agents that can plan, execute, and iterate on complex tasks independently.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    date: "Feb 19, 2026",
    readTime: "9 min",
    author: "Yeszz Team",
    slug: "rise-of-ai-agents",
    trending: true,
  },
];
