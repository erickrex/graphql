-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answer" TEXT NOT NULL
);