# Yeszz Tech — Database SQL Reference

All SQL queries for setting up the Supabase database. Run them **in order**.

| # | File | Description |
|---|------|-------------|
| 1 | `01-core-tables.sql` | Profiles, Categories, Posts, Comments, Newsletter |
| 2 | `02-functions-triggers.sql` | Auto-update timestamps, auto-create profile on signup |
| 3 | `03-creator-features.sql` | Tags, Post Tags, Creator Tips, SEO columns |
| 4 | `04-engagement.sql` | Bookmarks, Follows, Reactions |
| 5 | `05-seed-categories.sql` | Seed the 6 default categories |
| 6 | `06-seed-sample-posts.sql` | 12 sample blog posts across all categories |

## Quick Start

1. Go to your Supabase project → SQL Editor
2. Run each file in order (1 → 6)
3. All tables will have Row Level Security (RLS) enabled

## Notes
- All tables use `gen_random_uuid()` for primary keys
- RLS is enabled on every table
- The `handle_new_user()` trigger auto-creates a profile when a user signs up
- Newsletter subscriptions validate email length
- Tags require non-empty name and slug
