/*
  Warnings:

  - Made the column `detail` on table `reports` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `reports` MODIFY `detail` TEXT NOT NULL;
