-- AlterTable
ALTER TABLE "user" ADD COLUMN     "image" VARCHAR(255),
ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
