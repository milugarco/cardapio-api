-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupsId" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" DECIMAL NOT NULL,
    CONSTRAINT "Products_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("description", "groupsId", "id", "name", "value") SELECT "description", "groupsId", "id", "name", "value" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
