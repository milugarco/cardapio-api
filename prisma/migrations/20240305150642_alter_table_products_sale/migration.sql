-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SaleProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productsId" INTEGER NOT NULL,
    "salesId" INTEGER NOT NULL,
    "obs" TEXT,
    "value" INTEGER NOT NULL,
    "isPrint" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "SaleProducts_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleProducts_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SaleProducts" ("id", "obs", "productsId", "salesId", "value") SELECT "id", "obs", "productsId", "salesId", "value" FROM "SaleProducts";
DROP TABLE "SaleProducts";
ALTER TABLE "new_SaleProducts" RENAME TO "SaleProducts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
