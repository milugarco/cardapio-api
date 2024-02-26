/*
  Warnings:

  - You are about to drop the `Config` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Config";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ConfigPrinter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "print" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ConfigTables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "configTablesId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "alreadyPay" INTEGER DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Sales_configTablesId_fkey" FOREIGN KEY ("configTablesId") REFERENCES "ConfigTables" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SaleProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productsId" INTEGER NOT NULL,
    "salesId" INTEGER NOT NULL,
    "obs" TEXT,
    "value" INTEGER NOT NULL,
    CONSTRAINT "SaleProducts_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleProducts_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SaleProductComplements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "saleProductId" INTEGER NOT NULL,
    "complementsId" INTEGER NOT NULL,
    CONSTRAINT "SaleProductComplements_saleProductId_fkey" FOREIGN KEY ("saleProductId") REFERENCES "SaleProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleProductComplements_complementsId_fkey" FOREIGN KEY ("complementsId") REFERENCES "Complements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupsId" INTEGER,
    "configId" INTEGER,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" DECIMAL NOT NULL,
    CONSTRAINT "Products_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Products_configId_fkey" FOREIGN KEY ("configId") REFERENCES "ConfigPrinter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("configId", "description", "groupsId", "id", "name", "value") SELECT "configId", "description", "groupsId", "id", "name", "value" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
