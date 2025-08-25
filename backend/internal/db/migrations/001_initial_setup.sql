-- migrate:up

BEGIN;


CREATE TYPE product_status_enum AS ENUM ('New', 'Used', 'Acondicionado');
CREATE TYPE payment_type_enum   AS ENUM ('credit', 'debit', 'other', 'transfer');


CREATE TABLE images (
    id UUID PRIMARY KEY,
    url_small_version  TEXT,
    url_medium_version TEXT,
    alt                TEXT
);

CREATE TABLE families (
    family_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE payment_method_groups (
    id UUID PRIMARY KEY
);

CREATE TABLE prices (
    id UUID PRIMARY KEY,
    value NUMERIC(18,2) NOT NULL,
    currency_symbol VARCHAR(10),
    currency_id VARCHAR(10)
);

-- sellers references images (image_id)
CREATE TABLE sellers (
    seller_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    reputation VARCHAR(50),
    number_of_products INTEGER DEFAULT 0,
    number_of_sales INTEGER DEFAULT 0,
    number_of_followers INTEGER DEFAULT 0,
    category_description VARCHAR(255),
    -- changed from NUMERIC(1,5) (invalid) to NUMERIC(3,2)
    general_rating NUMERIC(3,2),
    attention_description VARCHAR(255),
    puntuality_description VARCHAR(255),
    image_id UUID REFERENCES images(id) ON DELETE SET NULL
);

-- products references families
CREATE TABLE products (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    main_spec JSONB,
    secondary_spec JSONB,
    family_id UUID REFERENCES families(family_id) ON DELETE SET NULL,
    payment_group_id UUID UNIQUE REFERENCES payment_method_groups(id) ON DELETE SET NULL
);

-- user_products references products and sellers
CREATE TABLE user_products (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    seller_id  UUID NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE,
    sku VARCHAR(100)
);

-- items references user_products and prices
CREATE TABLE items (
    item_id UUID PRIMARY KEY,
    user_product_id UUID NOT NULL REFERENCES user_products(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    available_quantity INTEGER DEFAULT 0,
    product_status product_status_enum NOT NULL,
    price_id_fk UUID NOT NULL REFERENCES prices(id) ON DELETE CASCADE
);

-- link table: item_images references items and images
CREATE TABLE item_images (
    id UUID PRIMARY KEY,
    item_id  UUID NOT NULL REFERENCES items(item_id) ON DELETE CASCADE,
    image_id UUID NOT NULL REFERENCES images(id)   ON DELETE CASCADE,
    UNIQUE (item_id, image_id)
);

-- reviews references products, sellers, items (nullable)
CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    seller_id  UUID NOT NULL REFERENCES sellers(seller_id)   ON DELETE CASCADE,
    item_id    UUID REFERENCES items(item_id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    content TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- aggregated_reviews references products (usually 1–1 per product)
CREATE TABLE aggregated_reviews (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    rating_value NUMERIC(3,2),
    rating_count INTEGER DEFAULT 0
);

-- top_sellers references products
CREATE TABLE top_sellers (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating NUMERIC(5,2) CHECK (rating >= 1 AND rating <= 100),
    need_to_know_description TEXT
);

-- payment_methods references payment_method_groups and images
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY,
    group_id UUID NOT NULL REFERENCES payment_method_groups(id) ON DELETE CASCADE,
    number_of_installments INTEGER,
    interest_rate_percentage NUMERIC(5,2),
    type payment_type_enum NOT NULL,
    image_id UUID REFERENCES images(id) ON DELETE SET NULL
);

-- questions references items
CREATE TABLE questions (
    id UUID PRIMARY KEY,
    item_id UUID NOT NULL REFERENCES items(item_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- ===========================
--   Helpful Indexes
-- ===========================
CREATE INDEX idx_user_products_seller  ON user_products(seller_id);
CREATE INDEX idx_user_products_product ON user_products(product_id);

CREATE INDEX idx_items_user_product ON items(user_product_id);
CREATE INDEX idx_items_price       ON items(price_id_fk);

CREATE INDEX idx_item_images_item  ON item_images(item_id);
CREATE INDEX idx_item_images_image ON item_images(image_id);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_seller  ON reviews(seller_id);

CREATE INDEX idx_questions_item ON questions(item_id);

COMMIT;

-- migrate:down
BEGIN;

-- Drop dependents first (reverse order of creation / FK dependencies)
DROP INDEX IF EXISTS idx_questions_item;
DROP TABLE IF EXISTS questions;

DROP TABLE IF EXISTS payment_methods;

DROP TABLE IF EXISTS top_sellers;

DROP TABLE IF EXISTS aggregated_reviews;

DROP INDEX IF EXISTS idx_reviews_seller;
DROP INDEX IF EXISTS idx_reviews_product;
DROP TABLE IF EXISTS reviews;

DROP INDEX IF EXISTS idx_item_images_image;
DROP INDEX IF EXISTS idx_item_images_item;
DROP TABLE IF EXISTS item_images;

DROP INDEX IF EXISTS idx_items_price;
DROP INDEX IF EXISTS idx_items_user_product;
DROP TABLE IF EXISTS items;

DROP INDEX IF EXISTS idx_user_products_product;
DROP INDEX IF EXISTS idx_user_products_seller;
DROP TABLE IF EXISTS user_products;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS sellers;

DROP TABLE IF EXISTS prices;

DROP TABLE IF EXISTS payment_method_groups;

DROP TABLE IF EXISTS families;

DROP TABLE IF EXISTS images;

-- Enums last
DROP TYPE IF EXISTS payment_type_enum;
DROP TYPE IF EXISTS product_status_enum;

COMMIT;
