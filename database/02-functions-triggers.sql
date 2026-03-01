-- =============================================
-- YESZZ TECH — Functions & Triggers
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at 
      BEFORE UPDATE ON public.profiles 
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_posts_updated_at') THEN
    CREATE TRIGGER update_posts_updated_at 
      BEFORE UPDATE ON public.posts 
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;


-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created 
      AFTER INSERT ON auth.users 
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;


-- Notify post author when someone comments
CREATE OR REPLACE FUNCTION public.notify_on_comment()
RETURNS TRIGGER AS $$
DECLARE
  post_author_id uuid;
  post_title text;
  commenter_name text;
BEGIN
  SELECT author_id, title INTO post_author_id, post_title
  FROM public.posts WHERE id = NEW.post_id;
  
  IF post_author_id IS NOT NULL AND post_author_id != NEW.user_id THEN
    SELECT COALESCE(display_name, 'Someone') INTO commenter_name
    FROM public.profiles WHERE user_id = NEW.user_id;
    
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      post_author_id,
      'comment',
      'New comment',
      commenter_name || ' commented on "' || post_title || '"',
      '/post/' || (SELECT slug FROM public.posts WHERE id = NEW.post_id)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_new_comment') THEN
    CREATE TRIGGER on_new_comment
      AFTER INSERT ON public.comments
      FOR EACH ROW EXECUTE FUNCTION public.notify_on_comment();
  END IF;
END $$;


-- Notify user when someone follows them
CREATE OR REPLACE FUNCTION public.notify_on_follow()
RETURNS TRIGGER AS $$
DECLARE
  follower_name text;
BEGIN
  SELECT COALESCE(display_name, 'Someone') INTO follower_name
  FROM public.profiles WHERE user_id = NEW.follower_id;
  
  INSERT INTO public.notifications (user_id, type, title, message, link)
  VALUES (
    NEW.following_id,
    'follow',
    'New follower',
    follower_name || ' started following you',
    '/creator/' || NEW.follower_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_new_follow') THEN
    CREATE TRIGGER on_new_follow
      AFTER INSERT ON public.follows
      FOR EACH ROW EXECUTE FUNCTION public.notify_on_follow();
  END IF;
END $$;
