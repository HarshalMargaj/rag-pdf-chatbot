-- DropForeignKey
ALTER TABLE "DocumentChunks" DROP CONSTRAINT "DocumentChunks_documentId_fkey";

-- CreateIndex
CREATE INDEX "DocumentChunks_documentId_idx" ON "DocumentChunks"("documentId");

-- AddForeignKey
ALTER TABLE "DocumentChunks" ADD CONSTRAINT "DocumentChunks_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
