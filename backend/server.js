const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Apple", price: 120, category: "Fruits", image: "apple.jpg", description: "Fresh red apples" },
  { id: 2, name: "Banana", price: 60, category: "Fruits", image: "banana.jpg", description: "Organic bananas" },
  { id: 3, name: "Tomato", price: 40, category: "Vegetables", image: "tomato.jpg", description: "Farm fresh tomatoes" },
  { id: 4, name: "Milk", price: 55, category: "Dairy", image: "milk.jpg", description: "Pure cow milk 1L" },
  { id: 5, name: "Bread", price: 45, category: "Bakery", image: "bread.jpg", description: "Whole wheat bread" },
  { id: 6, name: "Chips", price: 30, category: "Snacks", image: "chips.jpg", description: "Crispy potato chips" }
];

let cart = [];

app.get("/", (req, res) => {
  res.send("Grocery Backend Running");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  const product = req.body;
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.json({ message: "Added to cart" });
});

app.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.json({ message: "Removed from cart" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});