-- migration to create ioc_query table

CREATE TABLE ioc_query (
  -- Primary key with uuid
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- ip,domain etc
  ioc VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,

  score INTEGER,
  
  verdict VARCHAR(50) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_ioc_query_ioc ON ioc_query(ioc);
CREATE INDEX idx_ioc_query_type ON ioc_query(type);
CREATE INDEX idx_ioc_query_created_at ON ioc_query(created_at);
