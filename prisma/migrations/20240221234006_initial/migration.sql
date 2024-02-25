-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupsId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" DECIMAL NOT NULL,
    CONSTRAINT "Products_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "Groups" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Complements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "ProductComplements" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productsId" INTEGER NOT NULL,
    "complementsId" INTEGER NOT NULL,
    CONSTRAINT "ProductComplements_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductComplements_complementsId_fkey" FOREIGN KEY ("complementsId") REFERENCES "Complements" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
