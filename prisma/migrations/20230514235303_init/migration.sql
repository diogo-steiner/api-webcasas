-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(16) NOT NULL,
    "lastName" VARCHAR(16) NOT NULL,
    "email" VARCHAR(48) NOT NULL,
    "password" TEXT NOT NULL,
    "userToken" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "avatarUrl" TEXT,
    "updatedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(72) NOT NULL,
    "description" VARCHAR(900) NOT NULL,
    "numberRooms" SMALLINT NOT NULL,
    "numberBathrooms" SMALLINT NOT NULL,
    "numberGarage" SMALLINT NOT NULL,
    "propertyType" VARCHAR(16) NOT NULL,
    "isSale" BOOLEAN NOT NULL DEFAULT true,
    "isInCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasPoolProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasAirConditioningProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasGrillProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasFurnitureProperty" BOOLEAN NOT NULL DEFAULT false,
    "hasPollCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasSecurity24hCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasGymCondo" BOOLEAN NOT NULL DEFAULT false,
    "hasPartyHallCondo" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(12,2) NOT NULL,
    "priceCondo" DECIMAL(12,2),
    "isCondoPriceIncluded" BOOLEAN NOT NULL DEFAULT false,
    "state" VARCHAR(26) NOT NULL,
    "city" VARCHAR(26) NOT NULL,
    "contact" VARCHAR(11) NOT NULL,
    "isDisplayContact" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "viewsCounter" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertiesPhotos" (
    "id" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "PropertiesPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userToken_key" ON "Users"("userToken");

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertiesPhotos" ADD CONSTRAINT "PropertiesPhotos_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
