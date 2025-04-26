-- Create Series table
CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year_start INTEGER,
    year_end INTEGER,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create Pilot table
CREATE TABLE pilot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    codename VARCHAR(50),
    affiliation VARCHAR(100),
    series_id INTEGER REFERENCES series(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create Mobile Suit table
CREATE TABLE mobile_suit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model_number VARCHAR(50),
    manufacturer VARCHAR(100),
    height REAL, -- in meters
    weight REAL, -- in metric tons
    armor_material VARCHAR(50),
    power_plant VARCHAR(100),
    series_id INTEGER REFERENCES series(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create Pilot-Mobile Suit relationship table
CREATE TABLE pilot_mobile_suit (
    pilot_id INTEGER REFERENCES pilot(id),
    mobile_suit_id INTEGER REFERENCES mobile_suit(id),
    PRIMARY KEY (pilot_id, mobile_suit_id)
);

-- Create indexes
CREATE INDEX idx_pilot_series ON pilot(series_id);
CREATE INDEX idx_mobile_suit_series ON mobile_suit(series_id);
CREATE INDEX idx_pilot_mobile_suit_pilot ON pilot_mobile_suit(pilot_id);
CREATE INDEX idx_pilot_mobile_suit_mobile_suit ON pilot_mobile_suit(mobile_suit_id);
