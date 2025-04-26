CREATE TABLE "mobile_suit" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"model_number" varchar(50),
	"manufacturer" varchar(100),
	"height" real,
	"weight" real,
	"armor_material" varchar(50),
	"power_plant" varchar(100),
	"series_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pilot" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"codename" varchar(50),
	"affiliation" varchar(100),
	"series_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pilot_mobile_suit" (
	"pilot_id" integer,
	"mobile_suit_id" integer,
	CONSTRAINT "pilot_mobile_suit_pilot_id_mobile_suit_id_pk" PRIMARY KEY("pilot_id","mobile_suit_id")
);
--> statement-breakpoint
CREATE TABLE "series" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"year_start" integer,
	"year_end" integer,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "mobile_suit" ADD CONSTRAINT "mobile_suit_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pilot" ADD CONSTRAINT "pilot_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pilot_mobile_suit" ADD CONSTRAINT "pilot_mobile_suit_pilot_id_pilot_id_fk" FOREIGN KEY ("pilot_id") REFERENCES "public"."pilot"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pilot_mobile_suit" ADD CONSTRAINT "pilot_mobile_suit_mobile_suit_id_mobile_suit_id_fk" FOREIGN KEY ("mobile_suit_id") REFERENCES "public"."mobile_suit"("id") ON DELETE no action ON UPDATE no action;