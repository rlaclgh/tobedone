/*
  Warnings:

  - Added the required column `notice_count` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notice_interval` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "notice_count" INTEGER NOT NULL,
ADD COLUMN     "notice_interval" INTEGER NOT NULL;
