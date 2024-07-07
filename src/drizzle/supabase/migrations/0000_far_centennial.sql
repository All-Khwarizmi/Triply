CREATE TABLE IF NOT EXISTS "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "trips_key_unique" UNIQUE("key")
);
