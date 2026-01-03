-- migration to create provider_result table

CREATE TABLE provider_result (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  query_id UUID NOT NULL REFERENCES ioc_query(id) ON DELETE CASCADE,
  
  provider_name VARCHAR(100) NOT NULL,
  result TEXT NOT NULL,
  raw_response TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE INDEX idx_provider_result_query_id ON provider_result(query_id);
CREATE INDEX idx_provider_result_provider_name ON provider_result(provider_name);
CREATE INDEX idx_provider_result_created_at ON provider_result(created_at);
