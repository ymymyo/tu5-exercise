# Rohan's Tee Shop

A modern e-commerce web application for browsing and purchasing t-shirts, built with React, TypeScript, Express, and PostgreSQL.

## Features

- 🎨 Browse a colorful collection of t-shirts
- 🛒 Add items to cart (login required)
- 👤 Simple username-based authentication
- 🌤️ Singapore weather forecast integration
- 🎭 Interactive UI with smooth animations
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Supabase)
- **Build Tools**: esbuild, TypeScript compiler
- **Dev Tools**: nodemon, livereload

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Supabase account)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd tu5-exercise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
SUPABASE_URI=your_postgresql_connection_string
```

Example connection string format:
```
postgresql://user:password@host:5432/database
```

### 4. Initialize the database

Run the schema to create required tables:

```bash
psql -h your_host -U your_user -d your_database -f schema.sql
```

Or copy the SQL from `schema.sql` and execute it in your database client.

### 5. Seed the database (optional)

If you have a seed script:

```bash
npm run seed
```

## Development

### Start the development server

```bash
npm start
```

This will:
- Build the TypeScript and React code
- Start the Express server on `http://localhost:3000`
- Watch for file changes and auto-reload
- Enable live reload in the browser

### Build for production

```bash
npm run build
```

This creates optimized bundles in the `dist/` directory.

### Build with watch mode

```bash
npm run build:watch
```

## Project Structure

```
tu5-exercise/
├── public/              # Static files
│   └── index.html       # Main HTML template
├── src/
│   ├── components/      # React components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Login.tsx
│   │   └── Weather.tsx
│   ├── styles/          # CSS files
│   │   ├── App.css
│   │   ├── Button.css
│   │   ├── Card.css
│   │   ├── Login.css
│   │   └── Weather.css
│   ├── utils/           # Utility functions
│   │   ├── db.ts        # Database connection
│   │   ├── tshirt.ts    # T-shirt rendering
│   │   └── weather.ts   # Weather API
│   ├── App.tsx          # Main React component
│   └── index.ts         # Express server
├── dist/                # Build output
├── schema.sql           # Database schema
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all available t-shirts

### Authentication
- `GET /api/auth/user` - Get current logged-in user
- `POST /api/auth/login` - Login with username
- `POST /api/auth/logout` - Logout current user

### Cart
- `GET /api/cart` - Get cart items for logged-in user
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart

## Database Schema

### Tables

**products**
- `id` (UUID, Primary Key)
- `title` (Text, Unique)
- `color` (Varchar)

**users**
- `id` (UUID, Primary Key)
- `name` (Text, Unique)
- `created_at` (Timestamp)

**carts**
- `user_id` (UUID, Foreign Key)
- `product_id` (UUID, Foreign Key)
- Primary Key: (user_id, product_id)

## Features in Detail

### T-Shirt Rendering
T-shirts are rendered dynamically using HTML5 Canvas with color gradients.

### Weather Integration
Displays 7-day weather forecast for Singapore using Open-Meteo API.

### Cart Management
- Items can only be added to cart when logged in
- Cart state persists in PostgreSQL database
- Visual feedback when items are in cart

### Authentication
- Simple username-based authentication
- Session stored in HTTP-only cookies
- Auto-login on page refresh if session exists

## Known Issues and Improvements

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for a comprehensive list of suggested improvements and known issues.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the GitHub repository.
