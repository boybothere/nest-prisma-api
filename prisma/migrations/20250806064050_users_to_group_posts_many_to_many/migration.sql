-- CreateTable
CREATE TABLE "public"."GroupPosts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GroupPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UsersToGroupPosts" (
    "userId" INTEGER NOT NULL,
    "groupPostId" INTEGER NOT NULL,

    CONSTRAINT "UsersToGroupPosts_pkey" PRIMARY KEY ("userId","groupPostId")
);

-- AddForeignKey
ALTER TABLE "public"."UsersToGroupPosts" ADD CONSTRAINT "UsersToGroupPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsersToGroupPosts" ADD CONSTRAINT "UsersToGroupPosts_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "public"."GroupPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
