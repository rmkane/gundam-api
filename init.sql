-- Create Series table
CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year_start INTEGER,
    year_end INTEGER,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Pilot table
CREATE TABLE pilot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    codename VARCHAR(50),
    affiliation VARCHAR(100),
    series_id INTEGER REFERENCES series(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Mobile Suit table
CREATE TABLE mobile_suit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model_number VARCHAR(50),
    manufacturer VARCHAR(100),
    height DECIMAL(5,2), -- in meters
    weight DECIMAL(6,2), -- in metric tons
    armor_material VARCHAR(50),
    power_plant VARCHAR(100),
    series_id INTEGER REFERENCES series(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

-- Add series data
INSERT INTO series (name, year_start, year_end, description) VALUES
    ('Mobile Suit Gundam', 1979, 1980, 'The original Gundam series'),
    ('Mobile Suit Zeta Gundam', 1985, 1986, 'The second main Gundam series'),
    ('Mobile Suit Gundam ZZ', 1986, 1987, 'The third main Gundam series');

-- Add pilots data
INSERT INTO pilot (name, codename, affiliation, series_id) VALUES
    -- Mobile Suit Gundam
    ('Amuro Ray', 'White Base', 'Earth Federation', 1),
    ('Char Aznable', 'Red Comet', 'Zeon', 1),
    ('Sayla Mass', 'White Base', 'Earth Federation', 1),
    ('Ramba Ral', 'Blue Giant', 'Zeon', 1),
    ('M''Quve', 'Zeon', 'Zeon', 1),
    -- Zeta Gundam
    ('Kamille Bidan', 'AEUG', 'AEUG', 2),
    ('Quattro Bajeena', 'AEUG', 'AEUG', 2),
    ('Emma Sheen', 'AEUG', 'AEUG', 2),
    ('Haman Karn', 'Axis', 'Axis', 2),
    ('Paptimus Scirocco', 'Titans', 'Titans', 2),
    -- ZZ Gundam
    ('Judau Ashta', 'AEUG', 'AEUG', 3),
    ('Roux Louka', 'AEUG', 'AEUG', 3),
    ('Elpeo Ple', 'Axis', 'Axis', 3),
    ('Glemy Toto', 'Axis', 'Axis', 3),
    ('Mashymre Cello', 'Axis', 'Axis', 3);

-- Add mobile suits data
INSERT INTO mobile_suit (name, model_number, manufacturer, height, weight, armor_material, power_plant, series_id) VALUES
    -- Mobile Suit Gundam
    ('RX-78-2 Gundam', 'RX-78-2', 'Earth Federation', 18.0, 43.4, 'Luna Titanium', 'Minovsky Ultracompact Fusion Reactor', 1),
    ('MS-06S Zaku II', 'MS-06S', 'Zeon', 17.5, 56.2, 'Super High Tensile Steel', 'Minovsky Ultracompact Fusion Reactor', 1),
    ('MS-07B Gouf', 'MS-07B', 'Zeon', 18.2, 58.5, 'Super High Tensile Steel', 'Minovsky Ultracompact Fusion Reactor', 1),
    ('MS-09 Dom', 'MS-09', 'Zeon', 18.5, 62.6, 'Super High Tensile Steel', 'Minovsky Ultracompact Fusion Reactor', 1),
    ('MSM-07 Z''Gok', 'MSM-07', 'Zeon', 18.4, 65.1, 'Super High Tensile Steel', 'Minovsky Ultracompact Fusion Reactor', 1),
    -- Zeta Gundam
    ('MSZ-006 Zeta Gundam', 'MSZ-006', 'AEUG', 19.85, 28.7, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 2),
    ('MSN-00100 Hyaku Shiki', 'MSN-00100', 'AEUG', 19.2, 35.0, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 2),
    ('RX-178 Gundam Mk-II', 'RX-178', 'Titans', 19.6, 33.4, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 2),
    ('PMX-003 The O', 'PMX-003', 'Titans', 24.8, 57.2, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 2),
    ('AMX-004 Qubeley', 'AMX-004', 'Axis', 18.9, 35.2, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 2),
    -- ZZ Gundam
    ('MSZ-010 ZZ Gundam', 'MSZ-010', 'AEUG', 22.11, 32.7, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 3),
    ('MSZ-009M2 MSZ-009M2', 'MSZ-009M2', 'AEUG', 19.8, 28.6, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 3),
    ('AMX-014 Doven Wolf', 'AMX-014', 'Axis', 22.0, 36.8, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 3),
    ('AMX-015 Geymalk', 'AMX-015', 'Axis', 25.18, 42.1, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 3),
    ('AMX-107 Bawoo', 'AMX-107', 'Axis', 18.5, 38.7, 'Gundarium Gamma', 'Minovsky Ultracompact Fusion Reactor', 3);

-- Add pilot-mobile suit relationships
INSERT INTO pilot_mobile_suit (pilot_id, mobile_suit_id) VALUES
    -- Mobile Suit Gundam
    (1, 1), -- Amuro - RX-78-2
    (2, 2), -- Char - Zaku II
    (3, 1), -- Sayla - RX-78-2
    (4, 3), -- Ramba - Gouf
    (5, 4), -- M'Quve - Dom
    -- Zeta Gundam
    (6, 6), -- Kamille - Zeta
    (7, 7), -- Quattro - Hyaku Shiki
    (8, 8), -- Emma - Mk-II
    (9, 10), -- Haman - Qubeley
    (10, 9), -- Scirocco - The O
    -- ZZ Gundam
    (11, 11), -- Judau - ZZ
    (12, 12), -- Roux - MSZ-009M2
    (13, 13), -- Ple - Doven Wolf
    (14, 14), -- Glemy - Geymalk
    (15, 15); -- Mashymre - Bawoo 
