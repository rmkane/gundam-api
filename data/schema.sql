-- Gundam API Database Schema
-- Created: 2024-03-19

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Universes table
CREATE TABLE universes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Studios table
CREATE TABLE studios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    founded_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Directors table
CREATE TABLE directors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    birth_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Series table (main table)
CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    abbreviation VARCHAR(50) NOT NULL,
    start_year INTEGER NOT NULL,
    end_year INTEGER,
    universe_id INTEGER REFERENCES universes(id),
    studio_id INTEGER REFERENCES studios(id),
    director_id INTEGER REFERENCES directors(id),
    format VARCHAR(20) NOT NULL CHECK (format IN ('TV', 'OVA', 'Movie', 'Special')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Completed', 'Ongoing', 'Announced')),
    type VARCHAR(50) NOT NULL CHECK (type IN ('Main Series', 'Side Story', 'Build Series', 'Compilation', 'Prologue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Episodes table
CREATE TABLE episodes (
    id SERIAL PRIMARY KEY,
    series_id INTEGER REFERENCES series(id),
    episode_number INTEGER,
    runtime_minutes INTEGER NOT NULL,
    title VARCHAR(200),
    air_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_series_universe ON series(universe_id);
CREATE INDEX idx_series_studio ON series(studio_id);
CREATE INDEX idx_series_director ON series(director_id);
CREATE INDEX idx_episodes_series ON episodes(series_id);

-- Insert base data
-- Universes
INSERT INTO universes (name) VALUES
    ('UC'),
    ('Future Century (AU)'),
    ('After Colony (AU)'),
    ('After War (AU)'),
    ('Correct Century (AU)'),
    ('Cosmic Era (AU)'),
    ('Anno Domini (AU)'),
    ('Advanced Generation (AU)'),
    ('Build Fighters (AU)'),
    ('Post Disaster (AU)'),
    ('Build Divers (AU)'),
    ('Ad Stella (AU)');

-- Studios
INSERT INTO studios (name) VALUES ('Sunrise');

-- Directors
INSERT INTO directors (name) VALUES
    ('Yoshiyuki Tomino'),
    ('Fumihiko Takayama'),
    ('Mitsuko Kase'),
    ('Yasuhiro Imagawa'),
    ('Masashi Ikeda'),
    ('Shinji Takamatsu'),
    ('Mitsuo Fukuda'),
    ('Seiji Mizushima'),
    ('Kazuhiro Furuhashi'),
    ('Susumu Yamaguchi'),
    ('Kenji Nagasaki'),
    ('Tatsuyuki Nagai'),
    ('Kou Matsuo'),
    ('Yoshikazu Yasuhiko'),
    ('Shinya Watada'),
    ('Yoshizumi Toshikazu'),
    ('Shukou Murase'),
    ('Hiroshi Kobayashi'),
    ('Erasmus Brosdau'),
    ('Takeyuki Kanda'),
    ('Takashi Imanishi');

-- Create views for common queries
CREATE VIEW series_details AS
SELECT 
    s.name,
    s.abbreviation,
    s.start_year,
    s.end_year,
    u.name as universe,
    st.name as studio,
    d.name as director,
    s.format,
    s.status,
    s.type,
    COUNT(e.id) as total_episodes,
    AVG(e.runtime_minutes) as avg_runtime
FROM series s
JOIN universes u ON s.universe_id = u.id
JOIN studios st ON s.studio_id = st.id
JOIN directors d ON s.director_id = d.id
LEFT JOIN episodes e ON s.id = e.series_id
GROUP BY s.id, u.name, st.name, d.name;

CREATE VIEW series_by_universe AS
SELECT 
    u.name as universe,
    COUNT(s.id) as total_series,
    COUNT(CASE WHEN s.format = 'TV' THEN 1 END) as tv_series,
    COUNT(CASE WHEN s.format = 'OVA' THEN 1 END) as ovas,
    COUNT(CASE WHEN s.format = 'Movie' THEN 1 END) as movies,
    COUNT(CASE WHEN s.format = 'Special' THEN 1 END) as specials
FROM universes u
LEFT JOIN series s ON u.id = s.universe_id
GROUP BY u.name;

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_series_updated_at
    BEFORE UPDATE ON series
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_episodes_updated_at
    BEFORE UPDATE ON episodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Create function to get series by universe
CREATE OR REPLACE FUNCTION get_series_by_universe(universe_name VARCHAR)
RETURNS TABLE (
    name VARCHAR,
    abbreviation VARCHAR,
    start_year INTEGER,
    end_year INTEGER,
    format VARCHAR,
    status VARCHAR,
    type VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.name,
        s.abbreviation,
        s.start_year,
        s.end_year,
        s.format,
        s.status,
        s.type
    FROM series s
    JOIN universes u ON s.universe_id = u.id
    WHERE u.name = universe_name
    ORDER BY s.start_year;
END;
$$ LANGUAGE plpgsql; 
