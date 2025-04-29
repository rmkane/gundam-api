-- Gundam Series Data
-- Created: 2024-03-19

-- Insert series data
INSERT INTO series (
    name,
    abbreviation,
    start_year,
    end_year,
    universe_id,
    studio_id,
    director_id,
    format,
    status,
    type
) VALUES
    (
        'Mobile Suit Gundam',
        'MSG',
        1979,
        1980,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Zeta Gundam',
        'Zeta / Z',
        1985,
        1986,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam ZZ',
        'ZZ',
        1986,
        1987,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam: Char''s Counterattack',
        'CCA',
        1988,
        1988,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'Movie',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam 0080: War in the Pocket',
        '0080',
        1989,
        1989,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Fumihiko Takayama'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam F91',
        'F91',
        1991,
        1991,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'Movie',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam 0083: Stardust Memory',
        '0083',
        1991,
        1992,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Mitsuko Kase'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Victory Gundam',
        'V',
        1993,
        1994,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Fighter G Gundam',
        'G',
        1994,
        1995,
        (SELECT id FROM universes WHERE name = 'Future Century (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yasuhiro Imagawa'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam Wing',
        'GW',
        1995,
        1996,
        (SELECT id FROM universes WHERE name = 'After Colony (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Masashi Ikeda'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Gundam Wing: Endless Waltz',
        'EW',
        1997,
        1997,
        (SELECT id FROM universes WHERE name = 'After Colony (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yasuhiro Imagawa'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'After War Gundam X',
        'X',
        1996,
        1996,
        (SELECT id FROM universes WHERE name = 'After War (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Shinji Takamatsu'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Turn A Gundam',
        'Turn A',
        1999,
        2000,
        (SELECT id FROM universes WHERE name = 'Correct Century (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam SEED',
        'SEED',
        2002,
        2003,
        (SELECT id FROM universes WHERE name = 'Cosmic Era (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Mitsuo Fukuda'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam SEED Destiny',
        'Destiny',
        2004,
        2005,
        (SELECT id FROM universes WHERE name = 'Cosmic Era (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Mitsuo Fukuda'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam 00',
        '00',
        2007,
        2009,
        (SELECT id FROM universes WHERE name = 'Anno Domini (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Seiji Mizushima'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam Unicorn',
        'Unicorn',
        2010,
        2014,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Kazuhiro Furuhashi'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam AGE',
        'AGE',
        2011,
        2012,
        (SELECT id FROM universes WHERE name = 'Advanced Generation (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Susumu Yamaguchi'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Gundam Build Fighters',
        'GBF',
        2013,
        2014,
        (SELECT id FROM universes WHERE name = 'Build Fighters (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Kenji Nagasaki'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Gundam Build Fighters Try',
        'GBFT',
        2014,
        2015,
        (SELECT id FROM universes WHERE name = 'Build Fighters (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Kenji Nagasaki'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Mobile Suit Gundam: Iron-Blooded Orphans',
        'IBO',
        2015,
        2017,
        (SELECT id FROM universes WHERE name = 'Post Disaster (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Tatsuyuki Nagai'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam Thunderbolt',
        'Thunderbolt',
        2015,
        2017,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Kou Matsuo'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The Origin',
        'Origin',
        2015,
        2018,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshikazu Yasuhiko'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Gundam Build Divers',
        'GBD',
        2018,
        2018,
        (SELECT id FROM universes WHERE name = 'Build Divers (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Shinya Watada'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Mobile Suit Gundam Narrative',
        'NT',
        2018,
        2018,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshizumi Toshikazu'),
        'Movie',
        'Completed',
        'Side Story'
    ),
    (
        'Gundam Build Divers Re:RISE',
        'GBDR',
        2019,
        2020,
        (SELECT id FROM universes WHERE name = 'Build Divers (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Shinya Watada'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Mobile Suit Gundam: Hathaway',
        'Hathaway',
        2021,
        NULL,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Shukou Murase'),
        'Movie',
        'Ongoing',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: Cucuruz Doan''s Island',
        'Doan''s Island',
        2022,
        2022,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshikazu Yasuhiko'),
        'Movie',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The Witch from Mercury',
        'WfM',
        2022,
        2023,
        (SELECT id FROM universes WHERE name = 'Ad Stella (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Hiroshi Kobayashi'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Gundam SEED FREEDOM',
        'SEED Freedom',
        2024,
        2024,
        (SELECT id FROM universes WHERE name = 'Cosmic Era (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Mitsuo Fukuda'),
        'Movie',
        'Announced',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam Requiem for Vengeance',
        'RFV',
        2024,
        2024,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Erasmus Brosdau'),
        'OVA',
        'Announced',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The 08th MS Team',
        '08th MS Team',
        1996,
        1999,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Takeyuki Kanda'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam MS IGLOO',
        'MS IGLOO',
        2004,
        2009,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Takashi Imanishi'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam 00: A Wakening of the Trailblazer',
        '00 Movie',
        2010,
        2010,
        (SELECT id FROM universes WHERE name = 'Anno Domini (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Seiji Mizushima'),
        'Movie',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam Unicorn RE:0096',
        'Unicorn RE:0096',
        2016,
        2016,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Kazuhiro Furuhashi'),
        'TV',
        'Completed',
        'Compilation'
    ),
    (
        'Mobile Suit Gundam: Twilight Axis',
        'Twilight Axis',
        2017,
        2017,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Seiji Mizushima'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The Origin - Advent of the Red Comet',
        'Origin Red Comet',
        2019,
        2019,
        (SELECT id FROM universes WHERE name = 'UC'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Yoshikazu Yasuhiko'),
        'TV',
        'Completed',
        'Compilation'
    ),
    (
        'Mobile Suit Gundam: The Witch from Mercury - Prologue',
        'WfM Prologue',
        2022,
        2022,
        (SELECT id FROM universes WHERE name = 'Ad Stella (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Hiroshi Kobayashi'),
        'Special',
        'Completed',
        'Prologue'
    ),
    (
        'Mobile Suit Gundam: The Witch from Mercury - Special Edition',
        'WfM Special',
        2023,
        2023,
        (SELECT id FROM universes WHERE name = 'Ad Stella (AU)'),
        (SELECT id FROM studios WHERE name = 'Sunrise'),
        (SELECT id FROM directors WHERE name = 'Hiroshi Kobayashi'),
        'Special',
        'Completed',
        'Compilation'
    );

-- Insert episode data for TV series
INSERT INTO episodes (series_id, episode_number, runtime_minutes)
SELECT 
    s.id,
    generate_series(1, 
        CASE 
            WHEN s.name = 'Mobile Suit Gundam' THEN 43
            WHEN s.name = 'Mobile Suit Zeta Gundam' THEN 50
            WHEN s.name = 'Mobile Suit Gundam ZZ' THEN 47
            WHEN s.name = 'Mobile Suit Victory Gundam' THEN 51
            WHEN s.name = 'Mobile Fighter G Gundam' THEN 49
            WHEN s.name = 'Mobile Suit Gundam Wing' THEN 49
            WHEN s.name = 'After War Gundam X' THEN 39
            WHEN s.name = 'Turn A Gundam' THEN 50
            WHEN s.name = 'Mobile Suit Gundam SEED' THEN 50
            WHEN s.name = 'Mobile Suit Gundam SEED Destiny' THEN 50
            WHEN s.name = 'Mobile Suit Gundam 00' THEN 50
            WHEN s.name = 'Mobile Suit Gundam AGE' THEN 49
            WHEN s.name = 'Gundam Build Fighters' THEN 25
            WHEN s.name = 'Gundam Build Fighters Try' THEN 25
            WHEN s.name = 'Mobile Suit Gundam: Iron-Blooded Orphans' THEN 50
            WHEN s.name = 'Gundam Build Divers' THEN 25
            WHEN s.name = 'Gundam Build Divers Re:RISE' THEN 26
            WHEN s.name = 'Mobile Suit Gundam: The Witch from Mercury' THEN 24
            WHEN s.name = 'Mobile Suit Gundam Unicorn RE:0096' THEN 22
            WHEN s.name = 'Mobile Suit Gundam: The Origin - Advent of the Red Comet' THEN 13
            ELSE 1
        END
    ),
    CASE 
        WHEN s.format = 'TV' THEN 24
        WHEN s.format = 'OVA' THEN 30
        WHEN s.format = 'Movie' THEN 120
        WHEN s.format = 'Special' THEN 90
        ELSE 24
    END
FROM series s
WHERE s.format IN ('TV', 'OVA', 'Special'); 
