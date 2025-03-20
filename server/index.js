import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory products database
let products = [
  {
    id: '1',
    name: 'Modern Desk Lamp',
    description: 'Sleek LED desk lamp with adjustable brightness and color temperature.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones with 30-hour battery life.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
  },
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const product = {
    id: Date.now().toString(),
    ...req.body
  };
  products.push(product);
  res.status(201).json(product);
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    id
  };

  res.json(products[productIndex]);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});