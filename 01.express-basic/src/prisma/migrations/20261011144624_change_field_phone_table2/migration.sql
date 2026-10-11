/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `phone` table. All the data in the column will be lost.
  - Added the required column `phone` to the `phone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phone" 
RENAME COLUMN "phoneNumber" to "phone";

ALTER TABLE "phone"
ALTER COLUMN "phone" TYPE TEXT;

ALTER TABLE "phone"
ADD COLUMN  "status" BOOLEAN NOT NULL DEFAULT true;