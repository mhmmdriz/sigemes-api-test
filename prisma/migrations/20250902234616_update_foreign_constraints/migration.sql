-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rent_id_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_city_hall_pricing_id_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_guesthouse_room_pricing_id_fkey";

-- DropForeignKey
ALTER TABLE "rents" DROP CONSTRAINT "rents_renter_id_fkey";

-- DropForeignKey
ALTER TABLE "review_replies" DROP CONSTRAINT "review_replies_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "review_replies" DROP CONSTRAINT "review_replies_review_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_rent_id_fkey";

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_guesthouse_room_pricing_id_fkey" FOREIGN KEY ("guesthouse_room_pricing_id") REFERENCES "guesthouse_room_pricings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_city_hall_pricing_id_fkey" FOREIGN KEY ("city_hall_pricing_id") REFERENCES "city_hall_pricings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "rents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "rents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
