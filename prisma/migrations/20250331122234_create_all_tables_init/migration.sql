-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cultivations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "cultivations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_cultivations" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "cultivationId" TEXT NOT NULL,

    CONSTRAINT "contact_cultivations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cultivations_name_key" ON "cultivations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "contact_cultivations_contactId_cultivationId_key" ON "contact_cultivations"("contactId", "cultivationId");

-- AddForeignKey
ALTER TABLE "contact_cultivations" ADD CONSTRAINT "contact_cultivations_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_cultivations" ADD CONSTRAINT "contact_cultivations_cultivationId_fkey" FOREIGN KEY ("cultivationId") REFERENCES "cultivations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
