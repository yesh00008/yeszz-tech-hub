-- =============================================
-- YESZZ TECH — Seed Categories
-- =============================================

INSERT INTO public.categories (name, slug, icon, description) VALUES
  ('AI', 'ai', '🤖', 'Artificial Intelligence, Machine Learning, and Deep Learning trends'),
  ('Cybersecurity', 'cybersecurity', '🔒', 'Security threats, privacy, and protection strategies'),
  ('Gadgets', 'gadgets', '📱', 'Latest devices, wearables, and consumer electronics'),
  ('Programming', 'programming', '💻', 'Languages, frameworks, developer tools, and best practices'),
  ('Reviews', 'reviews', '⭐', 'In-depth reviews of software, hardware, and services'),
  ('Startups', 'startups', '🚀', 'Startup ecosystem, funding, entrepreneurship, and innovation')
ON CONFLICT (name) DO NOTHING;
