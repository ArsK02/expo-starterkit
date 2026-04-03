# Auth Providers Setup

Social sign-in is handled through Supabase OAuth. Each provider requires:
1. Creating an app/project in the provider's developer console
2. Adding the client credentials to Supabase
3. Adding your Supabase callback URL to the provider

**Supabase callback URL** (you'll need this for every provider):
```
https://<your-project-ref>.supabase.co/auth/v1/callback
```
Find your project ref in **Settings → General**.

---

## Google

### 1. Create a Google OAuth app

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select an existing one)
3. Go to **APIs & Services → OAuth consent screen**
   - Select **External**, fill in the required app info, save
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - Add to **Authorized redirect URIs**: your Supabase callback URL above
5. Copy the **Client ID** and **Client Secret**

### 2. Enable Google in Supabase

1. Go to **Authentication → Providers → Google**
2. Toggle **Enable Google provider**
3. Paste your **Client ID** and **Client Secret**
4. Save

### 3. Add redirect URL to app config

Your app's scheme is already set in `app.json` as `expostarterkit`. No code changes needed — `useAuth.ts` handles the OAuth redirect automatically.

---

## Apple (iOS only)

Apple Sign In is required by the App Store if your app offers any other social login. It only works on physical iOS devices and in production/TestFlight builds.

### 1. Configure your App ID

1. Go to [Apple Developer Portal](https://developer.apple.com) → **Certificates, IDs & Profiles → Identifiers**
2. Select your app's Bundle ID (or create one)
3. Scroll to **Sign In with Apple**, enable it, and save

### 2. Create a Service ID (for Supabase callback)

1. Go to **Identifiers → + → Services IDs**
2. Give it a description and a unique identifier (e.g. `com.yourapp.siwa`)
3. Enable **Sign In with Apple**, click **Configure**
   - Primary App ID: select your app's Bundle ID
   - Add to **Return URLs**: your Supabase callback URL
4. Save and register

### 3. Create a Key

1. Go to **Keys → + **
2. Give it a name, enable **Sign In with Apple**, click **Configure**
   - Select your Primary App ID
3. Register and **download the `.p8` key file** (you can only download it once)
4. Note the **Key ID**

### 4. Enable Apple in Supabase

1. Go to **Authentication → Providers → Apple**
2. Toggle **Enable Apple provider**
3. Fill in:
   - **Service ID**: the identifier from your Service ID (step 2)
   - **Apple Team ID**: found in the top-right of the Apple Developer Portal
   - **Key ID**: from step 3
   - **Private Key**: paste the contents of the downloaded `.p8` file
4. Save

> Apple Sign In is already wired up in the app via `expo-apple-authentication` and is shown only on iOS (`Platform.OS === 'ios'`).

---

## Facebook

> Facebook is currently commented out in `components/auth/SocialButtons.tsx`. Uncomment it when ready.

### 1. Create a Facebook app

1. Go to [Facebook Developers](https://developers.facebook.com) → **My Apps → Create App**
2. Choose **Consumer** as the app type
3. Go to **Add Product → Facebook Login → Web**
   - Add your Supabase callback URL to **Valid OAuth Redirect URIs**
4. Go to **Settings → Basic** and copy the **App ID** and **App Secret**

### 2. Enable Facebook in Supabase

1. Go to **Authentication → Providers → Facebook**
2. Toggle **Enable Facebook provider**
3. Paste your **App ID** and **App Secret**
4. Save

### 3. Uncomment the Facebook button

In `components/auth/SocialButtons.tsx`, remove the `{/* */}` comment wrapping the Facebook `<Pressable>` block.
