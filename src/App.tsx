import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Newsletter from "./pages/Newsletter";
import WriteForUs from "./pages/WriteForUs";
import WriteEditor from "./pages/WriteEditor";
import CreatorDashboard from "./pages/CreatorDashboard";
import CreatorServices from "./pages/CreatorServices";
import CreatorProfile from "./pages/CreatorProfile";
import Bookmarks from "./pages/Bookmarks";
import TagPage from "./pages/TagPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/write-for-us" element={<WriteForUs />} />
            <Route path="/creator/services" element={<CreatorServices />} />
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/creator/write" element={<WriteEditor />} />
            <Route path="/creator/write/:id" element={<WriteEditor />} />
            <Route path="/creator/:userId" element={<CreatorProfile />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tag/:slug" element={<TagPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
