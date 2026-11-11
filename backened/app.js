import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import productdata from './productdata.js';
import homeCarouseldata from './homeCarouseldata.js';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productDataPath = path.join(__dirname, 'productdata.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper to format PostgreSQL row to frontend product format
function formatProduct(row) {
  const price = Number(row.price);
  const originalPrice = Number(row.original_price ?? row.price);
  const discountPercent = Number(row.discount_percent || 0);

  return {
    id: Number(row.id),
    name: row.name,
    subname: row.subname,
    brand: row.brand,
    category: row.category,
    price: price,
    originalPrice: originalPrice,
    discount: discountPercent > 0 ? `${discountPercent}% OFF` : 'Special Deal',
    discountPercent: discountPercent,
    platform: row.platform,
    affiliateUrl: row.affiliate_url,
    imageUrl: row.image_url,
    badge: row.badge,
    volume: row.volume,
    rating: Number(row.rating || 4.8),
    reviewsCount: Number(row.reviews_count || 0),
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

// Helper to save productdata to productdata.js as local backup
function saveProductData() {
  try {
    const fileContent = `const productdata = ${JSON.stringify(productdata, null, 4)};\n\nexport default productdata;\n`;
    fs.writeFileSync(productDataPath, fileContent, 'utf-8');
  } catch (err) {
    console.error('Error writing to productdata.js backup:', err.message);
  }
}

// Auto-seed initial data from productdata.js if table is empty
async function seedInitialDataIfEmpty() {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM products');
    const count = parseInt(res.rows[0].count, 10);
    if (count === 0 && Array.isArray(productdata) && productdata.length > 0) {
      console.log('📦 Products table is empty. Seeding initial products from productdata.js...');
      for (const p of productdata) {
        const priceNum = Number(p.price) || 0;
        const origPriceNum = Number(p.originalPrice || priceNum);
        let disc = 0;
        if (typeof p.discount === 'string') {
          const match = p.discount.match(/\d+/);
          if (match) disc = parseInt(match[0], 10);
        } else if (typeof p.discount === 'number') {
          disc = Math.round(p.discount);
        }

        await pool.query(
          `INSERT INTO products (
            name, subname, brand, category, price, original_price, discount_percent,
            platform, affiliate_url, image_url, badge, volume, rating, reviews_count, description
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
          [
            p.name || 'Beauty',
            p.subname || 'Affiliate Product',
            p.brand || 'Featured Brand',
            p.category || 'General',
            priceNum,
            origPriceNum >= priceNum ? origPriceNum : priceNum,
            Math.min(100, Math.max(0, disc)),
            p.platform || 'Amazon',
            p.affiliateUrl || 'https://www.amazon.in/',
            p.imageUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
            p.badge || (p.platform === 'Flipkart' ? 'Flipkart Assured' : "Amazon's Choice"),
            p.volume || 'Standard',
            Number(p.rating) || 4.8,
            Number(p.reviewsCount) || 120,
            p.description || ''
          ]
        );
      }
      console.log('✅ Seeded initial products into PostgreSQL successfully!');
    }
  } catch (err) {
    console.error('Error checking/seeding products:', err.message);
  }
}

app.get('/', (req, res) => {
  res.send('Shraddha Enterprise Affiliate Store API is running');
});

// GET all products from PostgreSQL
app.get('/api/productData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    const products = result.rows.map(formatProduct);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products from database:', err.message);
    // Graceful fallback to local cache
    res.json(productdata);
  }
});

// POST add new affiliate product (from Admin)
app.post('/api/products', async (req, res) => {
  try {
    const {
      name,
      subname,
      brand,
      category,
      price,
      originalPrice,
      discount,
      platform,
      affiliateUrl,
      imageUrl,
      badge,
      volume,
      rating,
      reviewsCount,
      description
    } = req.body;

    const priceNum = Number(price) || 0;
    const origPriceNum = Number(originalPrice) || priceNum;
    const finalOrigPrice = origPriceNum >= priceNum ? origPriceNum : priceNum;

    let discountPercent = 0;
    if (typeof discount === 'number') {
      discountPercent = Math.round(discount);
    } else if (typeof discount === 'string') {
      const match = discount.match(/\d+/);
      if (match) discountPercent = parseInt(match[0], 10);
    } else if (finalOrigPrice > priceNum) {
      discountPercent = Math.round(((finalOrigPrice - priceNum) / finalOrigPrice) * 100);
    }
    discountPercent = Math.min(100, Math.max(0, discountPercent));

    const selectedPlatform = platform || 'Amazon';
    const finalName = name || category || 'Beauty';
    const finalSubname = subname || 'New Affiliate Product';
    const finalBrand = brand || 'Popular Brand';
    const finalCategory = category || 'General';
    const finalAffiliateUrl = affiliateUrl || (selectedPlatform === 'Flipkart' ? 'https://www.flipkart.com/' : 'https://www.amazon.in/');
    const finalImageUrl = imageUrl || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500';
    const finalBadge = badge || (selectedPlatform === 'Flipkart' ? 'Flipkart Assured' : "Amazon's Choice");
    const finalVolume = volume || 'Standard';
    const finalRating = Number(rating) || 4.8;
    const finalReviewsCount = Number(reviewsCount) || 120;
    const finalDescription = description || `Top recommended deal found on ${selectedPlatform}`;

    const queryText = `
      INSERT INTO products (
        name, subname, brand, category, price, original_price, discount_percent,
        platform, affiliate_url, image_url, badge, volume, rating, reviews_count, description
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `;

    const values = [
      finalName,
      finalSubname,
      finalBrand,
      finalCategory,
      priceNum,
      finalOrigPrice,
      discountPercent,
      selectedPlatform,
      finalAffiliateUrl,
      finalImageUrl,
      finalBadge,
      finalVolume,
      finalRating,
      finalReviewsCount,
      finalDescription
    ];

    const result = await pool.query(queryText, values);
    const newProduct = formatProduct(result.rows[0]);

    // Update local cache
    productdata.unshift(newProduct);
    saveProductData();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error inserting product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE product (from Admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount > 0) {
      const index = productdata.findIndex((p) => Number(p.id) === id);
      if (index !== -1) {
        productdata.splice(index, 1);
        saveProductData();
      }
      res.json({ success: true, deleted: formatProduct(result.rows[0]) });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Carousel images
app.get('/api/homeCarouseldata', (req, res) => {
  res.json(homeCarouseldata);
});

app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`);
  await seedInitialDataIfEmpty();
});

export default app;
