# Yeszz Tech — Database SQL Reference

All SQL queries for setting up the database. Run them **in order**.

| # | File | Description |
|---|------|-------------|
| 1 | `01-core-tables.sql` | Profiles, Categories, Posts, Comments, Newsletter |
| 2 | `02-functions-triggers.sql` | Auto-update timestamps, auto-create profile, notification triggers |
| 3 | `03-creator-features.sql` | Tags, Post Tags, Creator Tips |
| 4 | `04-engagement.sql` | Bookmarks, Follows, Reactions, Notifications (with realtime) |
| 5 | `05-seed-categories.sql` | 16 default categories |
| 6 | `06-seed-sample-posts.sql` | 12 sample blog posts |
| 7 | `07-seed-tags.sql` | 40 trending topic tags |

## Quick Start

1. Go to your database SQL Editor
2. Run each file in order (1 → 7)
3. All tables have Row Level Security (RLS) enabled

## Tables Overview

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profiles (name, bio, avatar, website) | Public read, owner write |
| `categories` | Blog categories (AI, Cybersecurity, etc.) | Public read only |
| `posts` | Blog articles with SEO metadata | Published = public, author = full |
| `comments` | Post comments with moderation | Approved = public, owner create/delete |
| `newsletter_subscribers` | Email subscriptions | Insert only |
| `tags` | SEO tags | Public read, auth create |
| `post_tags` | Post-tag relationships | Public read, author manage |
| `creator_tips` | Donations to creators | Creator read, auth create |
| `bookmarks` | User reading lists | Owner only |
| `follows` | Author follow system | Public read, owner manage |
| `reactions` | Post likes/reactions | Public read, owner manage |
| `notifications` | Real-time user notifications | Owner read/update, system insert |

## Functions & Triggers

| Function | Trigger | Description |
|----------|---------|-------------|
| `update_updated_at_column()` | `update_profiles_updated_at`, `update_posts_updated_at` | Auto-updates `updated_at` on row changes |
| `handle_new_user()` | `on_auth_user_created` | Auto-creates profile when user signs up |
| `notify_on_comment()` | `on_new_comment` | Sends notification to post author on new comment |
| `notify_on_follow()` | `on_new_follow` | Sends notification when someone follows a user |

## Realtime

The `notifications` table has realtime enabled via `supabase_realtime` publication for instant push notifications.
