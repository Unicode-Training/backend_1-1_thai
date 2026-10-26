/*
  Warnings:

  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" 
RENAME COLUMN "fullName" to "name";

-- ALTER TABLE "users"
-- ALTER COLUMN "name" TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "users_courses" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
