/*
  Warnings:

  - Added the required column `name` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "print" TEXT NOT NULL
);
INSERT INTO "new_Config" ("id", "print") SELECT "id", "print" FROM "Config";
DROP TABLE "Config";
ALTER TABLE "new_Config" RENAME TO "Config";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
