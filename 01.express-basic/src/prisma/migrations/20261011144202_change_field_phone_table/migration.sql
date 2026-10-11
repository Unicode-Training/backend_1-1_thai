/*
  Warnings:

  - You are about to drop the column `phone` on the `phone` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `phone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "phone" DROP COLUMN "phone",
-- ADD COLUMN     "phoneNumber" VARCHAR(15) NOT NULL;

ALTER TABLE "phone" 
RENAME COLUMN "phone" to "phoneNumber";

ALTER TABLE "phone"
ALTER COLUMN "phoneNumber" TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);
