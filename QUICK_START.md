# Quick Start Guide

Get up and running with Rohan's Tee Shop in 5 minutes!

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js 18 or higher (`node --version`)
- ✅ npm or yarn (`npm --version`)
- ✅ PostgreSQL database or Supabase account

## 5-Minute Setup

### Step 1: Install Dependencies (1 min)

```bash
npm install
```

### Step 2: Configure Environment (1 min)

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your database connection:

```env
SUPABASE_URI=postgresql://user:password@host:5432/database
```

**Using Supabase?**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project (it's free!)
3. Go to Settings → Database
4. Copy the "Connection String" (Transaction mode)
5. Paste it in your `.env` file

### Step 3: Setup Database (2 min)

Run the schema to create tables:

**Option A: Using psql**
```bash
psql your_connection_string -f schema.sql
```

**Option B: Using Supabase Dashboard**
1. Go to SQL Editor in Supabase
2. Copy contents of `schema.sql`
3. Click "Run"

**Option C: Manual copy**
Copy the SQL from `schema.sql` and execute in your database client.

### Step 4: Start Development Server (1 min)

```bash
npm start
```

The app will open at: **http://localhost:3000** 🎉

## What's Next?

### Test the Features

1. **Browse T-Shirts**: See the colorful collection
2. **Click Login**: Enter any username
3. **Add to Cart**: Click "Add to cart" on any t-shirt
4. **View Cart**: See your cart count in the header
5. **Check Weather**: View Singapore's 7-day forecast

### Make Changes

The app auto-reloads when you edit files:
- Edit `src/App.tsx` to change the main app
- Edit `src/styles/App.css` to change styles
- Edit `src/components/*` to modify components

## Common Issues

### "Cannot connect to database"
- Check your `SUPABASE_URI` in `.env`
- Ensure database is running
- Verify connection string format

### "Port 3000 already in use"
- Stop other apps using port 3000
- Or change PORT in `src/index.ts`

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and reinstall

### Build fails
- Check Node.js version (needs 18+)
- Check for syntax errors in code
- Run `npm run build` to see detailed errors

## Development Commands

```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Build and watch for changes
npm run build:watch

# Seed database (if seed script exists)
npm run seed
```

## Project Structure Quick Reference

```
src/
├── App.tsx              # Main app component
├── index.ts             # Express server & API routes
├── components/          # React components
│   ├── Button.tsx       # Reusable button
│   ├── Card.tsx         # Product card
│   ├── Login.tsx        # Login dialog
│   └── Weather.tsx      # Weather widget
├── styles/              # CSS files
└── utils/               # Helper functions
    ├── db.ts            # Database connection
    ├── tshirt.ts        # Canvas rendering
    └── weather.ts       # Weather API
```

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 🔍 Check [IMPROVEMENTS.md](./IMPROVEMENTS.md) for known issues
- 🐛 Open an issue on GitHub
- 💬 Ask in the project discussions

## Pro Tips

1. **Use React DevTools**: Install the browser extension
2. **Check Console**: Open browser DevTools (F12) to see logs
3. **Watch Network**: Monitor API calls in Network tab
4. **Test Different Users**: Login with different names
5. **Try Mobile View**: Test responsive design

Happy coding! 🚀
