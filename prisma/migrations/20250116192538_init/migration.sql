-- CreateEnum
CREATE TYPE "CultureType" AS ENUM ('Agrícola', 'Pastagem', 'Silvicultura');

-- CreateEnum
CREATE TYPE "ProducerType" AS ENUM ('PF', 'PJ');

-- CreateTable
CREATE TABLE "producers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" "ProducerType" NOT NULL DEFAULT 'PF',
    "document" VARCHAR(14) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_producer" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" CHAR(2) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "producer_id" INTEGER NOT NULL,
    "total_area" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "planting_area" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "vegetation_area" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_farm" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "culture_id" INTEGER NOT NULL,
    "year" SMALLINT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_harvest" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_specie" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cultures" (
    "id" SERIAL NOT NULL,
    "type" "CultureType" NOT NULL DEFAULT 'Agrícola',
    "specie_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_culture" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_document_key" ON "producers"("document");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_culture_id_fkey" FOREIGN KEY ("culture_id") REFERENCES "cultures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultures" ADD CONSTRAINT "cultures_specie_id_fkey" FOREIGN KEY ("specie_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
