-- Enable pgvector extension (required to store and search vector embeddings)
create extension if not exists vector;

-- Add an embeddings column to the Document table
-- 1536 dimensions because OpenAI text-embedding-3-small uses 1536-length vectors
alter table "Document"
add column embedding vector(1536);

-- Create an HNSW index for fast similarity search
-- vector_ip_ops uses inner product distance (good for normalized embeddings / cosine similarity)
create index "document_embedding_idx"
on "Document"
using hnsw (embedding vector_ip_ops);