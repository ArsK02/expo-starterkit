# Supabase Setup

## 1. Create a project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New project**
3. Choose an organization, give the project a name, set a database password, and pick a region close to your users
4. Wait ~2 minutes for the project to provision

## 2. Get your API keys

1. In your project dashboard, go to **Settings → API Keys**
2. Copy the **Publishable key** — this is your anon key
3. Go to **Settings → General** and copy the **Project URL**

> **Legacy key format:** If you run into issues with the `sb_publishable_...` key format, click the **"Legacy anon, service_role API keys"** tab on the API Keys page and use the `anon` key from there instead.

## 3. Add keys to your app

Open `.env.local` in the project root and fill in your values:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

The app will pick these up automatically on next start (`npx expo start`).

## 4. Enable the delete account function

Supabase does not allow client-side user deletion for security reasons. You need to create a server-side SQL function once.

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Paste the following and press **Run** (`Cmd+Enter`):

```sql
create or replace function delete_user()
returns void
language plpgsql
security definer
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;
```

The **Delete account** option in the Profile screen will now work.

## 5. Configure email auth

Email/password sign up and sign in work out of the box. By default, Supabase sends a confirmation email after sign up.

To disable email confirmation during development:

1. Go to **Authentication → Providers → Email**
2. Toggle off **Confirm email**

Re-enable it before going to production.
