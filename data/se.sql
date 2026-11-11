CREATE TABLE products (
    -- Auto-incrementing 64-bit integer (supports large values and auto-generation)
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    name VARCHAR(255) NOT NULL,
    subname VARCHAR(255),
    brand VARCHAR(100),
    category VARCHAR(50) NOT NULL,
    
    -- Monetary & discount values
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10, 2) CHECK (original_price >= price),
    discount_percent INT DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
    
    -- Affiliate specific details
    platform VARCHAR(50) NOT NULL DEFAULT 'Amazon', -- 'Amazon', 'Flipkart', etc.
    affiliate_url TEXT NOT NULL,
    image_url TEXT NOT NULL,
    badge VARCHAR(50),                              -- 'Amazon''s Choice', 'Flipkart Assured'
    volume VARCHAR(50) DEFAULT 'Standard',
    
    -- Ratings & Reviews (used in your frontend/backend)
    rating NUMERIC(2, 1) DEFAULT 4.5 CHECK (rating BETWEEN 0 AND 5),
    reviews_count INT DEFAULT 0 CHECK (reviews_count >= 0),
    
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);