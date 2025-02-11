/*
  Warnings:

  - Added the required column `thumbnail` to the `YouTubeVideo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_YouTubeVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "member" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL
);
INSERT INTO "new_YouTubeVideo" ("date", "id", "member", "status", "title") SELECT "date", "id", "member", "status", "title" FROM "YouTubeVideo";
DROP TABLE "YouTubeVideo";
ALTER TABLE "new_YouTubeVideo" RENAME TO "YouTubeVideo";
CREATE UNIQUE INDEX "YouTubeVideo_id_key" ON "YouTubeVideo"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
