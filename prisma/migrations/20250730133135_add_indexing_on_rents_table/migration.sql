-- CreateIndex
CREATE INDEX "idx_rent_guesthouse_date" ON "rents"("guesthouse_room_pricing_id", "start_date", "end_date");

-- CreateIndex
CREATE INDEX "idx_rent_cityhall_date" ON "rents"("city_hall_pricing_id", "start_date", "end_date");
