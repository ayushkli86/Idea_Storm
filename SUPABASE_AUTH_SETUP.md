# Supabase Authentication Setup Guide

## Overview
This document explains the complete Supabase authentication implementation for Sahi Aaushadi.

## Architecture

### File Structure
```
frontend/src/
├── contexts/
│   └── AuthContext.tsx          # Supabase auth state management
├── components/
│   ├── AuthLayout.tsx           # Layout for login/signup pages
│   ├── AppLayout.tsx            # Layout for main app (with Navbar & Chatbot)
│   ├── ProtectedRoute.tsx       # Route protection component
│   └── Navbar.tsx               # Updated to use Supabase auth
├── pages/
│   ├── Login.tsx                # Separate login page
│   ├── Signup.tsx               # Separate signup page
│   ├── Landing.tsx              # Home page (protected)
│   ├── Verify.tsx               # Verify page (protected)
│   ├── Dashboard.tsx            # Dashboard (protected)
│   └── DDAView.tsx              # DDA View (protected)
└── App.tsx                      # Updated routing with protection
```

## Authentication Flow

### 1. Signup Flow
```
User visits /signup
  ↓
Fills form (name, email, password)
  ↓
Supabase creates user account
  ↓
User is AUTOMATICALLY logged in
  ↓
Redirects to "/" (home page)
```

### 2. Login Flow
```
User visits /login
  ↓
Enters credentials
  ↓
Supabase validates credentials
  ↓
Session created
  ↓
Redirects to "/" (home page)
```

### 3. Logout Flow
```
User clicks logout
  ↓
Supabase signs out user
  ↓
Session cleared
  ↓
Redirects to /login
```

### 4. Protected Routes
```
User tries to access protected route (/, /verify, /dashboard, /regulator)
  ↓
ProtectedRoute checks auth state
  ↓
If NOT authenticated → Redirect to /login
If authenticated → Show page with Navbar & Chatbot
```

### 5. Auth Route Protection
```
Authenticated user tries to access /login or /signup
  ↓
Automatically redirects to "/"
```

## Key Features

### ✅ Complete Page Separation
- Login/Signup pages: NO navbar, NO chatbot, NO dashboard UI
- Main app pages: WITH navbar, WITH chatbot, full functionality
- Clean, minimal auth layout vs full app layout

### ✅ Supabase Integration
- Uses `supabase.auth.signUp()` for registration
- Uses `supabase.auth.signInWithPassword()` for login
- Uses `supabase.auth.signOut()` for logout
- Uses `supabase.auth.onAuthStateChange()` for session management
- Automatic session persistence via localStorage

### ✅ Proper Redirects
- After signup → "/" (NOT /login)
- After login → "/"
- After logout → "/login"
- Authenticated users accessing /login or /signup → "/"
- Unauthenticated users accessing protected routes → "/login"

### ✅ Security
- All main routes are protected
- JWT tokens managed by Supabase
- Session persistence across page refreshes
- Automatic token refresh

### ✅ User Experience
- Loading states during auth operations
- Error messages from Supabase
- Toast notifications for feedback
- Smooth redirects
- No infinite redirect loops

## Components Explained

### AuthContext.tsx
Manages global authentication state using Supabase:
- Provides `user`, `session`, `loading` state
- Provides `signUp()`, `signIn()`, `signOut()` methods
- Listens to auth state changes
- Persists session automatically

### ProtectedRoute.tsx
Wraps protected pages:
- Shows loading spinner while checking auth
- Redirects to /login if not authenticated
- Renders children if authenticated

### AuthLayout.tsx
Minimal layout for auth pages:
- Centered card design
- Logo and branding
- No navbar, no chatbot
- Clean gradient background

### AppLayout.tsx
Full app layout:
- Includes Navbar
- Includes MedicineChatBot
- Used for all protected routes

### Login.tsx & Signup.tsx
Separate auth pages:
- Clean, focused UI
- Form validation
- Loading states
- Error handling
- Links to switch between login/signup
- Auto-redirect if already authenticated

## Supabase Configuration

### Environment Variables
Located in `frontend/.env`:
```env
VITE_SUPABASE_URL=https://bshvpxzkezzxgfewbzax.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Supabase Client
Located in `frontend/src/integrations/supabase/client.ts`:
- Auto-configured with environment variables
- Enables session persistence
- Auto-refresh tokens
- Uses localStorage for storage

## Testing the Auth Flow

### Test Signup
1. Navigate to http://localhost:8080/signup
2. Fill in name, email, password
3. Click "Create Account"
4. Should automatically log in and redirect to "/"
5. Navbar should show user name and logout button

### Test Login
1. Navigate to http://localhost:8080/login
2. Enter credentials
3. Click "Sign In"
4. Should redirect to "/"
5. Navbar should show user info

### Test Protected Routes
1. Log out
2. Try to access http://localhost:8080/dashboard
3. Should redirect to /login
4. Log in
5. Should redirect back to dashboard

### Test Auth Route Protection
1. While logged in, try to access /login
2. Should automatically redirect to "/"

## Edge Cases Handled

### ✅ Already Authenticated
- Accessing /login or /signup while logged in → Redirect to "/"

### ✅ Not Authenticated
- Accessing protected routes → Redirect to /login

### ✅ Session Persistence
- Refresh page while logged in → Stay logged in
- Close browser and reopen → Stay logged in (until session expires)

### ✅ Loading States
- Show spinner while checking auth state
- Prevent flash of wrong content

### ✅ Error Handling
- Invalid credentials → Show error message
- Network errors → Show error message
- Validation errors → Show error message

## Supabase Dashboard Setup

### Enable Email Auth
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. Disable email confirmation (for development):
   - Go to Authentication → Settings
   - Uncheck "Enable email confirmations"

### User Management
- View users: Authentication → Users
- Delete users: Click on user → Delete
- Reset password: Click on user → Reset password

## Migration from Old Auth

### What Changed
- ❌ Removed: Old `/auth` route with flip animation
- ❌ Removed: Backend JWT auth (can keep for API if needed)
- ❌ Removed: localStorage manual token management
- ✅ Added: Supabase authentication
- ✅ Added: Separate /login and /signup routes
- ✅ Added: AuthContext for global state
- ✅ Added: ProtectedRoute component
- ✅ Added: Proper page separation

### Backward Compatibility
- Old auth pages are replaced
- Can keep backend auth for API endpoints if needed
- Supabase handles all user authentication

## Troubleshooting

### Issue: Infinite redirect loop
**Solution**: Check that ProtectedRoute doesn't wrap auth pages

### Issue: User not persisting after refresh
**Solution**: Verify Supabase client has `persistSession: true`

### Issue: Can't sign up
**Solution**: Check Supabase dashboard for email confirmation settings

### Issue: Navbar not showing user info
**Solution**: Verify AuthContext is wrapping the app in App.tsx

## Next Steps

### Optional Enhancements
1. Add "Forgot Password" functionality
2. Add email verification flow
3. Add social auth (Google, GitHub)
4. Add user profile page
5. Add role-based access control
6. Add password strength indicator
7. Add "Remember me" option

### Production Checklist
- [ ] Enable email confirmation in Supabase
- [ ] Set up email templates
- [ ] Configure redirect URLs
- [ ] Add rate limiting
- [ ] Add CAPTCHA for signup
- [ ] Set up monitoring
- [ ] Test all auth flows
- [ ] Update privacy policy

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs/guides/auth
2. Check this project's README.md
3. Review the code comments in AuthContext.tsx
