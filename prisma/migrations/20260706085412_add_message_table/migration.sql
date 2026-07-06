-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant');

-- DropIndex
DROP INDEX "documentchunks_embedding_idx";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "parts" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Message_documentId_idx" ON "Message"("documentId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
