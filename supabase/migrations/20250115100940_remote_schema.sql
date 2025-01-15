

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "drizzle";


ALTER SCHEMA "drizzle" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";






CREATE TYPE "public"."activity_type" AS ENUM (
    'forest',
    'city',
    'plage'
);


ALTER TYPE "public"."activity_type" OWNER TO "postgres";


CREATE TYPE "public"."activity_visibility" AS ENUM (
    'private',
    'public'
);


ALTER TYPE "public"."activity_visibility" OWNER TO "postgres";


CREATE TYPE "public"."dog_dominance" AS ENUM (
    'neutral',
    'dominant',
    'dominated'
);


ALTER TYPE "public"."dog_dominance" OWNER TO "postgres";


CREATE TYPE "public"."dog_sex" AS ENUM (
    'male',
    'female'
);


ALTER TYPE "public"."dog_sex" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
    "id" integer NOT NULL,
    "hash" "text" NOT NULL,
    "created_at" bigint
);


ALTER TABLE "drizzle"."__drizzle_migrations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "drizzle"."__drizzle_migrations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "drizzle"."__drizzle_migrations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "drizzle"."__drizzle_migrations_id_seq" OWNED BY "drizzle"."__drizzle_migrations"."id";



CREATE TABLE IF NOT EXISTS "public"."activities" (
    "id" integer NOT NULL,
    "creator_id" integer,
    "place" character varying(50),
    "visibility" "public"."activity_visibility" NOT NULL,
    "type" "public"."activity_type" NOT NULL,
    "date" timestamp without time zone NOT NULL,
    "duration" character varying(50),
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."activities" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."activities_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activities_id_seq" OWNED BY "public"."activities"."id";



CREATE TABLE IF NOT EXISTS "public"."behavors" (
    "id" integer NOT NULL,
    "name" character varying(50) NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."behavors" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."behavors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."behavors_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."behavors_id_seq" OWNED BY "public"."behavors"."id";



CREATE TABLE IF NOT EXISTS "public"."breeds" (
    "id" integer NOT NULL,
    "name" character varying(50) NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."breeds" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."breeds_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."breeds_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."breeds_id_seq" OWNED BY "public"."breeds"."id";



CREATE TABLE IF NOT EXISTS "public"."customers" (
    "stripe_customer_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid"
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."dog_behaviors" (
    "id" integer NOT NULL,
    "dog_id" integer,
    "behavor_id" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."dog_behaviors" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."dog_behaviors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."dog_behaviors_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."dog_behaviors_id_seq" OWNED BY "public"."dog_behaviors"."id";



CREATE TABLE IF NOT EXISTS "public"."dogs" (
    "id" integer NOT NULL,
    "owner_id" integer,
    "name" character varying(50) NOT NULL,
    "description" character varying(200),
    "dominance" "public"."dog_dominance",
    "sex" "public"."dog_sex",
    "age" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "breed_id" integer
);


ALTER TABLE "public"."dogs" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."dogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."dogs_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."dogs_id_seq" OWNED BY "public"."dogs"."id";



CREATE TABLE IF NOT EXISTS "public"."formations" (
    "id" integer NOT NULL,
    "animator_name" character varying,
    "price" integer,
    "description" character varying,
    "place" character varying(50),
    "date" timestamp without time zone,
    "participant_limit" integer,
    "duration" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."formations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."formations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."formations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."formations_id_seq" OWNED BY "public"."formations"."id";



CREATE TABLE IF NOT EXISTS "public"."medical_form" (
    "id" integer NOT NULL,
    "dog_id" integer
);


ALTER TABLE "public"."medical_form" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."medical_form_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."medical_form_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."medical_form_id_seq" OWNED BY "public"."medical_form"."id";



CREATE TABLE IF NOT EXISTS "public"."opinions" (
    "id" integer NOT NULL,
    "user_id" integer,
    "formation_id" integer,
    "grade" integer,
    "description" character varying(200),
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."opinions" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."opinions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."opinions_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."opinions_id_seq" OWNED BY "public"."opinions"."id";



CREATE TABLE IF NOT EXISTS "public"."purchases" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "product_id" "text" NOT NULL,
    "price_id" "text" NOT NULL,
    "payment_intent_id" "text" NOT NULL,
    "status" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"())
);


ALTER TABLE "public"."purchases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" integer NOT NULL,
    "name" character varying(50) NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."roles" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."roles_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."roles_id_seq" OWNED BY "public"."roles"."id";



CREATE TABLE IF NOT EXISTS "public"."steps" (
    "id" integer NOT NULL,
    "activity_id" integer,
    "place" character varying(50),
    "estimated_hour" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."steps" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."steps_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."steps_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."steps_id_seq" OWNED BY "public"."steps"."id";



CREATE TABLE IF NOT EXISTS "public"."user_activities" (
    "id" integer NOT NULL,
    "user_id" integer,
    "activity_id" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_activities" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."user_activities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."user_activities_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."user_activities_id_seq" OWNED BY "public"."user_activities"."id";



CREATE TABLE IF NOT EXISTS "public"."user_formations" (
    "id" integer NOT NULL,
    "user_id" integer,
    "formation_id" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_formations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."user_formations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."user_formations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."user_formations_id_seq" OWNED BY "public"."user_formations"."id";



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL,
    "role_id" integer,
    "age" integer,
    "place" character varying(50),
    "description" character varying(200),
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "first_name" character varying(50),
    "last_name" character varying(50),
    "uid" "uuid" NOT NULL,
    "onBoarding" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."users_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";



ALTER TABLE ONLY "drizzle"."__drizzle_migrations" ALTER COLUMN "id" SET DEFAULT "nextval"('"drizzle"."__drizzle_migrations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activities" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activities_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."behavors" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."behavors_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."breeds" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."breeds_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."dog_behaviors" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."dog_behaviors_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."dogs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."dogs_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."formations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."formations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."medical_form" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."medical_form_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."opinions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."opinions_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."roles" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."roles_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."steps" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."steps_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."user_activities" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."user_activities_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."user_formations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."user_formations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");



ALTER TABLE ONLY "drizzle"."__drizzle_migrations"
    ADD CONSTRAINT "__drizzle_migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activities"
    ADD CONSTRAINT "activities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."behavors"
    ADD CONSTRAINT "behavors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."breeds"
    ADD CONSTRAINT "breeds_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."dog_behaviors"
    ADD CONSTRAINT "dog_behaviors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."dogs"
    ADD CONSTRAINT "dogs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."formations"
    ADD CONSTRAINT "formations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."medical_form"
    ADD CONSTRAINT "medical_form_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."opinions"
    ADD CONSTRAINT "opinions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_user_id_product_id_key" UNIQUE ("user_id", "product_id");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."steps"
    ADD CONSTRAINT "steps_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_activities"
    ADD CONSTRAINT "user_activities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_formations"
    ADD CONSTRAINT "user_formations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_uid_key" UNIQUE ("uid");



ALTER TABLE ONLY "public"."activities"
    ADD CONSTRAINT "activities_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."dog_behaviors"
    ADD CONSTRAINT "dog_behaviors_behavor_id_behavors_id_fk" FOREIGN KEY ("behavor_id") REFERENCES "public"."behavors"("id");



ALTER TABLE ONLY "public"."dog_behaviors"
    ADD CONSTRAINT "dog_behaviors_dog_id_dogs_id_fk" FOREIGN KEY ("dog_id") REFERENCES "public"."dogs"("id");



ALTER TABLE ONLY "public"."dogs"
    ADD CONSTRAINT "dogs_breed_id_breeds_id_fk" FOREIGN KEY ("breed_id") REFERENCES "public"."breeds"("id");



ALTER TABLE ONLY "public"."dogs"
    ADD CONSTRAINT "dogs_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."medical_form"
    ADD CONSTRAINT "medical_form_dog_id_dogs_id_fk" FOREIGN KEY ("dog_id") REFERENCES "public"."dogs"("id");



ALTER TABLE ONLY "public"."opinions"
    ADD CONSTRAINT "opinions_formation_id_formations_id_fk" FOREIGN KEY ("formation_id") REFERENCES "public"."formations"("id");



ALTER TABLE ONLY "public"."opinions"
    ADD CONSTRAINT "opinions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."purchases"
    ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."steps"
    ADD CONSTRAINT "steps_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id");



ALTER TABLE ONLY "public"."user_activities"
    ADD CONSTRAINT "user_activities_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id");



ALTER TABLE ONLY "public"."user_activities"
    ADD CONSTRAINT "user_activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."user_formations"
    ADD CONSTRAINT "user_formations_formation_id_formations_id_fk" FOREIGN KEY ("formation_id") REFERENCES "public"."formations"("id");



ALTER TABLE ONLY "public"."user_formations"
    ADD CONSTRAINT "user_formations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id");



ALTER TABLE "public"."activities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."behavors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."breeds" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."dog_behaviors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."dogs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."formations" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "get - users" ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "get-behaviors" ON "public"."behavors" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "get-breeds" ON "public"."breeds" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "get-dog_behaviors" ON "public"."dog_behaviors" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "get-dogs" ON "public"."dogs" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "insert-dog" ON "public"."dogs" FOR INSERT TO "authenticated" WITH CHECK (true);



ALTER TABLE "public"."medical_form" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."opinions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."steps" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_activities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_formations" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."users";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



























































































































































































































































































































GRANT ALL ON TABLE "public"."activities" TO "anon";
GRANT ALL ON TABLE "public"."activities" TO "authenticated";
GRANT ALL ON TABLE "public"."activities" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activities_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."behavors" TO "anon";
GRANT ALL ON TABLE "public"."behavors" TO "authenticated";
GRANT ALL ON TABLE "public"."behavors" TO "service_role";



GRANT ALL ON SEQUENCE "public"."behavors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."behavors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."behavors_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."breeds" TO "anon";
GRANT ALL ON TABLE "public"."breeds" TO "authenticated";
GRANT ALL ON TABLE "public"."breeds" TO "service_role";



GRANT ALL ON SEQUENCE "public"."breeds_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."breeds_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."breeds_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON TABLE "public"."dog_behaviors" TO "anon";
GRANT ALL ON TABLE "public"."dog_behaviors" TO "authenticated";
GRANT ALL ON TABLE "public"."dog_behaviors" TO "service_role";



GRANT ALL ON SEQUENCE "public"."dog_behaviors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."dog_behaviors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."dog_behaviors_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."dogs" TO "anon";
GRANT ALL ON TABLE "public"."dogs" TO "authenticated";
GRANT ALL ON TABLE "public"."dogs" TO "service_role";



GRANT ALL ON SEQUENCE "public"."dogs_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."dogs_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."dogs_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."formations" TO "anon";
GRANT ALL ON TABLE "public"."formations" TO "authenticated";
GRANT ALL ON TABLE "public"."formations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."formations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."formations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."formations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."medical_form" TO "anon";
GRANT ALL ON TABLE "public"."medical_form" TO "authenticated";
GRANT ALL ON TABLE "public"."medical_form" TO "service_role";



GRANT ALL ON SEQUENCE "public"."medical_form_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."medical_form_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."medical_form_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."opinions" TO "anon";
GRANT ALL ON TABLE "public"."opinions" TO "authenticated";
GRANT ALL ON TABLE "public"."opinions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."opinions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."opinions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."opinions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."purchases" TO "anon";
GRANT ALL ON TABLE "public"."purchases" TO "authenticated";
GRANT ALL ON TABLE "public"."purchases" TO "service_role";



GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";



GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."roles_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."steps" TO "anon";
GRANT ALL ON TABLE "public"."steps" TO "authenticated";
GRANT ALL ON TABLE "public"."steps" TO "service_role";



GRANT ALL ON SEQUENCE "public"."steps_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."steps_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."steps_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_activities" TO "anon";
GRANT ALL ON TABLE "public"."user_activities" TO "authenticated";
GRANT ALL ON TABLE "public"."user_activities" TO "service_role";



GRANT ALL ON SEQUENCE "public"."user_activities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_activities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_activities_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_formations" TO "anon";
GRANT ALL ON TABLE "public"."user_formations" TO "authenticated";
GRANT ALL ON TABLE "public"."user_formations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."user_formations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_formations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_formations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
