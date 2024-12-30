-- CreateTable
CREATE TABLE "YouTubeVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "member" TEXT NOT NULL,
    "clipper" TEXT,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeVideo_id_key" ON "YouTubeVideo"("id");
