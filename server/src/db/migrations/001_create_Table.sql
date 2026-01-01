-- Based on models in src/db/models/

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Represents a single IOC (Indicator of Compromise) lookup made by the system.
-- Stores UUIDs for IOCQuery,Type of IOC,threats core, and verdict after analysis.

CREATE TABLE IF NOT EXISTS public.ioc_query (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- The IOC value (IP, domain, URL, or hash)
    ioc TEXT NOT NULL,
    
    -- Type of IOC: 'ip', 'domain', 'url', or 'hash'
    type VARCHAR(10) NOT NULL CHECK (type IN ('ip', 'domain', 'url', 'hash')),
    
    -- Calculated threat score (0-100)
    score NUMERIC(5, 2),
    
    -- Final verdict: 'benign', 'suspicious', or 'malicious'
    verdict VARCHAR(20) NOT NULL CHECK (verdict IN ('benign', 'suspicious', 'malicious')),
    
    -- Timestamp fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Add comments to the table
COMMENT ON TABLE public.ioc_query IS 'Stores IOC (Indicator of Compromise) queries for threat intelligence';
COMMENT ON COLUMN public.ioc_query.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.ioc_query.ioc IS 'The IOC value: IP address, domain name, URL, or file hash';
COMMENT ON COLUMN public.ioc_query.type IS 'Type of IOC indicator';
COMMENT ON COLUMN public.ioc_query.score IS 'Calculated threat score (0-100 scale)';
COMMENT ON COLUMN public.ioc_query.verdict IS 'Final verdict after analysis';
COMMENT ON COLUMN public.ioc_query.created_at IS 'Timestamp when the query was created';

-- Create indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_ioc_query_ioc ON public.ioc_query (ioc);
CREATE INDEX IF NOT EXISTS idx_ioc_query_type ON public.ioc_query (type);
CREATE INDEX IF NOT EXISTS idx_ioc_query_verdict ON public.ioc_query (verdict);
CREATE INDEX IF NOT EXISTS idx_ioc_query_created_at ON public.ioc_query (created_at DESC);


-- Stores responses from threat intelligence providers (e.g., VirusTotal)
-- for specific IOC queries. Each query can have multiple provider results.

CREATE TABLE IF NOT EXISTS public.provider_result (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- References ioc_query.id (foreign key relationship)
    query_id UUID NOT NULL,
    
    -- Name of the threat intelligence provider (e.g., 'virus_total', 'abuseipdb')
    provider_name VARCHAR(100) NOT NULL,
    
    -- Short processed result from the provider
    result TEXT NOT NULL,
    
    
    -- Timestamp fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Foreign key constraint with cascade delete
    CONSTRAINT fk_provider_result_query FOREIGN KEY (query_id)
        REFERENCES public.ioc_query(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.provider_result IS 'Stores threat intelligence provider responses for IOC queries';
COMMENT ON COLUMN public.provider_result.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.provider_result.query_id IS 'Foreign key reference to ioc_query';
COMMENT ON COLUMN public.provider_result.provider_name IS 'Name of the threat intelligence provider';
COMMENT ON COLUMN public.provider_result.result IS 'Short processed result from the provider';
COMMENT ON COLUMN public.provider_result.created_at IS 'Timestamp when the result was saved';

-- Create indexes for foreign key and frequently queried fields
CREATE INDEX IF NOT EXISTS idx_provider_result_query_id ON public.provider_result (query_id);
CREATE INDEX IF NOT EXISTS idx_provider_result_provider_name ON public.provider_result (provider_name);
CREATE INDEX IF NOT EXISTS idx_provider_result_created_at ON public.provider_result (created_at DESC);


-- Represents cybersecurity news articles that may contain IOCs and threat information.

CREATE TABLE IF NOT EXISTS public.news_item (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Article title
    title TEXT NOT NULL,
    
    -- Short summary of the article 
    summary TEXT,
    
    -- Original article URL
    link TEXT NOT NULL UNIQUE,
    
    -- When the article was originally published 
    published_at TIMESTAMPTZ,
    
    -- IOCs extracted from the article stored as JSON array of strings
    extracted_iocs JSONB DEFAULT '[]'::jsonb,
    
    -- Timestamp fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

COMMENT ON TABLE public.news_item IS 'Stores cybersecurity news articles with extracted IOC indicators';
COMMENT ON COLUMN public.news_item.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.news_item.title IS 'Article title';
COMMENT ON COLUMN public.news_item.summary IS 'Short summary of the article content';
COMMENT ON COLUMN public.news_item.link IS 'Original article URL (must be unique)';
COMMENT ON COLUMN public.news_item.published_at IS 'Original publication timestamp of the article';
COMMENT ON COLUMN public.news_item.extracted_iocs IS 'Array of IOC indicators extracted from the article (JSON format)';
COMMENT ON COLUMN public.news_item.created_at IS 'Timestamp when this record was created in the database';

-- Create indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_news_item_title ON public.news_item USING GIN (to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_news_item_published_at ON public.news_item (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_item_created_at ON public.news_item (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_item_extracted_iocs ON public.news_item USING GIN (extracted_iocs);


