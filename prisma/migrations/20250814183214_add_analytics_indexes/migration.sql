-- CreateEnum
CREATE TYPE "public"."AttemptStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED');

-- DropIndex
DROP INDEX "public"."Customer_email_businessId_key";

-- CreateTable
CREATE TABLE "public"."PaymentAttempt" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "provider" "public"."PaymentProvider" NOT NULL,
    "providerRef" TEXT,
    "idempotencyKey" TEXT,
    "status" "public"."AttemptStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "raw" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebhookEvent" (
    "id" TEXT NOT NULL,
    "provider" "public"."PaymentProvider" NOT NULL,
    "externalId" TEXT NOT NULL,
    "signature" TEXT,
    "payload" JSONB NOT NULL,
    "processedAt" TIMESTAMP(3),
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PaymentAttempt_paymentId_idx" ON "public"."PaymentAttempt"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookEvent_provider_externalId_key" ON "public"."WebhookEvent"("provider", "externalId");

-- CreateIndex
CREATE INDEX "Customer_businessId_createdAt_idx" ON "public"."Customer"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "Customer_businessId_status_idx" ON "public"."Customer"("businessId", "status");

-- CreateIndex
CREATE INDEX "Customer_createdAt_idx" ON "public"."Customer"("createdAt");

-- CreateIndex
CREATE INDEX "Payment_businessId_createdAt_idx" ON "public"."Payment"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_businessId_status_idx" ON "public"."Payment"("businessId", "status");

-- CreateIndex
CREATE INDEX "Payment_businessId_provider_idx" ON "public"."Payment"("businessId", "provider");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "public"."Payment"("createdAt");

-- CreateIndex
CREATE INDEX "PaymentLink_businessId_createdAt_idx" ON "public"."PaymentLink"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentLink_businessId_status_idx" ON "public"."PaymentLink"("businessId", "status");

-- CreateIndex
CREATE INDEX "PaymentLink_createdAt_idx" ON "public"."PaymentLink"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."PaymentAttempt" ADD CONSTRAINT "PaymentAttempt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
