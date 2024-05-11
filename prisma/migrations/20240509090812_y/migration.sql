/*
  Warnings:

  - You are about to drop the column `task` on the `Checklist` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "cardsId" INTEGER,
    CONSTRAINT "Checklist_cardsId_fkey" FOREIGN KEY ("cardsId") REFERENCES "Cards" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Checklist" ("cardsId", "id", "isFinished", "title") SELECT "cardsId", "id", "isFinished", "title" FROM "Checklist";
DROP TABLE "Checklist";
ALTER TABLE "new_Checklist" RENAME TO "Checklist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
