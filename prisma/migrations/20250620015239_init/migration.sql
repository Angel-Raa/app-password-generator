-- CreateTable
CREATE TABLE "Password" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "label" TEXT,
    "encryptedPassword" TEXT NOT NULL,
    "length" INTEGER NOT NULL DEFAULT 6,
    "hasLowerCase" BOOLEAN NOT NULL DEFAULT false,
    "hasUpperCase" BOOLEAN NOT NULL DEFAULT false,
    "hasNumbers" BOOLEAN NOT NULL DEFAULT false,
    "hasSymbols" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
