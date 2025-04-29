-- Gundam API Database Schema

-- Universes table
CREATE TABLE universe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    abbreviation VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Studios table
CREATE TABLE studio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    founded_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Directors table
CREATE TABLE director (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    birth_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Series table (main table)
CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    abbreviation VARCHAR(50) NOT NULL,
    year_start INTEGER NOT NULL,
    year_end INTEGER,
    universe_id INTEGER,
    studio_id INTEGER,
    director_id INTEGER,
    format VARCHAR(20) NOT NULL CHECK (format IN ('TV', 'OVA', 'Movie', 'Special')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Completed', 'Ongoing', 'Announced')),
    type VARCHAR(50) NOT NULL CHECK (type IN ('Main Series', 'Side Story', 'Build Series', 'Compilation', 'Prologue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Pilots table
CREATE TABLE pilot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    codename VARCHAR(100),
    affiliation VARCHAR(100),
    series_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Mobile Suits table
CREATE TABLE mobile_suit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model_number VARCHAR(50),
    manufacturer VARCHAR(100),
    height REAL,
    weight REAL,
    armor_material VARCHAR(100),
    power_plant VARCHAR(100),
    series_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Pilot-Mobile Suit relationships
CREATE TABLE pilot_mobile_suit (
    id SERIAL PRIMARY KEY,
    pilot_id INTEGER,
    mobile_suit_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Add foreign key constraints
ALTER TABLE series
    ADD CONSTRAINT fk_series_universe
    FOREIGN KEY (universe_id)
    REFERENCES universe(id);

ALTER TABLE series
    ADD CONSTRAINT fk_series_studio
    FOREIGN KEY (studio_id)
    REFERENCES studio(id);

ALTER TABLE series
    ADD CONSTRAINT fk_series_director
    FOREIGN KEY (director_id)
    REFERENCES director(id);

ALTER TABLE pilot
    ADD CONSTRAINT fk_pilot_series
    FOREIGN KEY (series_id)
    REFERENCES series(id);

ALTER TABLE mobile_suit
    ADD CONSTRAINT fk_mobile_suit_series
    FOREIGN KEY (series_id)
    REFERENCES series(id);

ALTER TABLE pilot_mobile_suit
    ADD CONSTRAINT fk_pilot_mobile_suit_pilot
    FOREIGN KEY (pilot_id)
    REFERENCES pilot(id);

ALTER TABLE pilot_mobile_suit
    ADD CONSTRAINT fk_pilot_mobile_suit_mobile_suit
    FOREIGN KEY (mobile_suit_id)
    REFERENCES mobile_suit(id);

