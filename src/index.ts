import express, { Request, Response } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import cookieParser from "cookie-parser";
import db from "./utils/db.js";
import { TSHIRT_COLLECTION } from "./utils/tshirt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Validate required environment variables
if (!process.env.SUPABASE_URI) {
  console.error("ERROR: SUPABASE_URI environment variable is required");
  process.exit(1);
}

const app = express();
const PORT = 3000;

const liveReloadServer = livereload.createServer({
  exts: ["html", "js", "css", "tsx", "ts"],
  debug: false,
});

liveReloadServer.watch([
  join(__dirname, "../public"),
  join(__dirname, "../dist"),
  join(__dirname, "../src"),
]);

app.use(connectLivereload());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));
app.use("/dist", express.static(join(__dirname, "../dist")));

// Cart endpoints ---

app.get("/api/cart", async (req: Request, res: Response) => {
  try {
    const username = req.cookies.username;
    if (!username) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await db`SELECT id FROM users WHERE name = ${username}`;
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItems = await db`
      SELECT product_id FROM carts WHERE user_id = ${user[0].id}
    `;
    const productIds = cartItems.map(item => item.product_id);
    return res.json(productIds);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/cart", async (req: Request, res: Response) => {
  try {
    const username = req.cookies.username;
    const { productId } = req.body;

    if (!username) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const user = await db`SELECT id FROM users WHERE name = ${username}`;
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists
    const product = await db`SELECT id FROM products WHERE id = ${productId}`;
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add to cart (ignore if already exists)
    await db`
      INSERT INTO carts (user_id, product_id)
      VALUES (${user[0].id}, ${productId})
      ON CONFLICT (user_id, product_id) DO NOTHING
    `;

    return res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/cart", async (req: Request, res: Response) => {
  try {
    const username = req.cookies.username;
    const { productId } = req.body;

    if (!username) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const user = await db`SELECT id FROM users WHERE name = ${username}`;
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await db`
      DELETE FROM carts
      WHERE user_id = ${user[0].id} AND product_id = ${productId}
    `;

    return res.json({ message: "Removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Auth endpoints ---

app.get("/api/auth/user", async (req: Request, res: Response<{user: string | null}>) => {
  try {
    const username = req.cookies.username;
    if (!username) {
      return res.json({ user: null });
    }

    // Verify user exists in database
    const user = await db`SELECT name FROM users WHERE name = ${username}`;
    if (user.length === 0) {
      res.clearCookie("username");
      return res.json({ user: null });
    }

    return res.json({ user: username });
  } catch (error) {
    console.error("Error getting user:", error);
    return res.json({ user: null });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Name is required" });
    }

    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      return res.status(400).json({ error: "Name cannot be empty" });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({ error: "Name is too long" });
    }

    // Create user if doesn't exist
    await db`
      INSERT INTO users (name)
      VALUES (${trimmedName})
      ON CONFLICT (name) DO NOTHING
    `;

    res.cookie("username", trimmedName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    return res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/logout", (req: Request, res: Response) => {
  res.clearCookie("username");
  return res.json({ message: "Logged out successfully" });
});

// Product endpoints ---

app.get("/api/products", async (req: Request, res: Response) => {
  res.json(TSHIRT_COLLECTION);
});

// Health check endpoint ---

app.get("/health", (req: Request, res: Response) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ---

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  liveReloadServer.close();
  process.exit(0);
});
