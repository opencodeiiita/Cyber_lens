-- migration to create news_item table

CREATE TABLE news_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title VARCHAR(500) NOT NULL,
  summary TEXT,

  link VARCHAR(1000) NOT NULL,

  published_at TIMESTAMP WITH TIME ZONE,

  extracted_iocs JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_news_item_title ON news_item(title);
CREATE INDEX idx_news_item_created_at ON news_item(created_at);
CREATE INDEX idx_news_item_published_at ON news_item(published_at);
