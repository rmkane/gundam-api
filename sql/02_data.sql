-- Gundam Series Data

-- Universes
INSERT INTO universe (name, abbreviation) VALUES
    ('Universal Century', 'UC'),
    ('Future Century', 'FC'),
    ('After Colony', 'AC'),
    ('After War', 'AW'),
    ('Correct Century', 'CC'),
    ('Cosmic Era', 'CE'),
    ('Anno Domini', 'AD'),
    ('Advanced Generation', 'AG'),
    ('Build Fighters', 'BF'),
    ('Post Disaster', 'PD'),
    ('Build Divers', 'BD'),
    ('Ad Stella', 'AS');

-- Studios
INSERT INTO studio (name) VALUES ('Sunrise');

-- Directors
INSERT INTO director (name) VALUES
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

-- Insert series data
INSERT INTO series (
    name,
    description,
    abbreviation,
    year_start,
    year_end,
    universe_id,
    studio_id,
    director_id,
    format,
    status,
    type
) VALUES
    (
        'Mobile Suit Gundam',
        'The original series that introduced the concept of mobile suits and the conflict between Earth Federation and Principality of Zeon.',
        'MSG',
        1979,
        1980,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Zeta Gundam',
        'A new conflict emerges as the Titans rise to power, leading to the formation of the AEUG resistance movement.',
        'Zeta / Z',
        1985,
        1986,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam ZZ',
        'Following the events of Zeta Gundam, a new group of pilots must face the remnants of the Axis forces.',
        'ZZ / ZZG',
        1986,
        1987,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam: Char''s Counterattack',
        'The final confrontation between Amuro Ray and Char Aznable as they battle over the future of Earth and space colonies.',
        'CCA',
        1988,
        1988,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'Movie',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam 0080: War in the Pocket',
        'A young boy''s perspective on the One Year War as he befriends a Zeon pilot during a secret operation.',
        '0080',
        1989,
        1989,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Fumihiko Takayama'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam F91',
        'Set 30 years after Char''s Counterattack, a new conflict arises between the Earth Federation and the Crossbone Vanguard.',
        'F91',
        1991,
        1991,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'Movie',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam 0083: Stardust Memory',
        'A special forces unit must prevent a stolen Gundam from being used to drop a colony on Earth.',
        '0083',
        1991,
        1992,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Mitsuko Kase'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Victory Gundam',
        'In the late Universal Century, a young boy joins the League Militaire to fight against the oppressive Zanscare Empire.',
        'V',
        1993,
        1994,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Fighter G Gundam',
        'In a world where nations settle their differences through Gundam battles, a young fighter seeks to become the champion.',
        'G',
        1994,
        1995,
        (SELECT id FROM universe WHERE name = 'Future Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yasuhiro Imagawa'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam Wing',
        'Five young pilots are sent to Earth to fight against the oppressive United Earth Sphere Alliance.',
        'GW',
        1995,
        1996,
        (SELECT id FROM universe WHERE name = 'After Colony'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Masashi Ikeda'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Gundam Wing: Endless Waltz',
        'A year after the events of Gundam Wing, the peace is threatened by a new conflict involving the Mariemaia Army.',
        'EW',
        1997,
        1997,
        (SELECT id FROM universe WHERE name = 'After Colony'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yasuhiro Imagawa'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'After War Gundam X',
        'In a post-apocalyptic world, a young man pilots the Gundam X to protect a mysterious girl with special abilities.',
        'X',
        1996,
        1996,
        (SELECT id FROM universe WHERE name = 'After War'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Shinji Takamatsu'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Turn A Gundam',
        'In a world where technology has regressed, a mysterious Gundam is discovered that could change everything.',
        'Turn A',
        1999,
        2000,
        (SELECT id FROM universe WHERE name = 'Correct Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshiyuki Tomino'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam SEED',
        'A conflict between Coordinators and Naturals escalates as a young Coordinator finds himself piloting a prototype Gundam.',
        'SEED',
        2002,
        2003,
        (SELECT id FROM universe WHERE name = 'Cosmic Era'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Mitsuo Fukuda'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam SEED Destiny',
        'As tensions rise between Earth and PLANT, a new generation of pilots must face the consequences of war.',
        'SEED Destiny',
        2004,
        2005,
        (SELECT id FROM universe WHERE name = 'Cosmic Era'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Mitsuo Fukuda'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam 00',
        'In a world divided by three major powers, Celestial Being aims to end all wars through armed intervention.',
        '00',
        2007,
        2009,
        (SELECT id FROM universe WHERE name = 'Anno Domini'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Seiji Mizushima'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam Unicorn',
        'A young man discovers a mysterious mobile suit that could reveal the truth about a hidden Universal Century secret.',
        'Unicorn',
        2010,
        2014,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Kazuhiro Furuhashi'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam AGE',
        'A war spanning three generations as humanity faces the mysterious UE threat and uncovers its true nature.',
        'AGE',
        2011,
        2012,
        (SELECT id FROM universe WHERE name = 'Advanced Generation'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Susumu Yamaguchi'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Gundam Build Fighters',
        'A young boy enters the world of Gunpla Battle, where plastic model kits come to life in virtual combat.',
        'GBF',
        2013,
        2014,
        (SELECT id FROM universe WHERE name = 'Build Fighters'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Kenji Nagasaki'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Gundam Build Fighters Try',
        'A new generation of Gunpla fighters compete in team battles to become the national champions.',
        'GBFT',
        2014,
        2015,
        (SELECT id FROM universe WHERE name = 'Build Fighters'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Kenji Nagasaki'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Mobile Suit Gundam: Iron-Blooded Orphans',
        'A group of child soldiers fight for independence while protecting a young girl who could change the world.',
        'IBO',
        2015,
        2017,
        (SELECT id FROM universe WHERE name = 'Post Disaster'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Tatsuyuki Nagai'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Mobile Suit Gundam Thunderbolt',
        'Two ace pilots face off in the Thunderbolt Sector, a dangerous battlefield filled with debris and lightning.',
        'Thunderbolt',
        2015,
        2017,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Kou Matsuo'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The Origin',
        'The story of how the One Year War began, focusing on the early days of Char Aznable and the rise of Zeon.',
        'Origin',
        2015,
        2018,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshikazu Yasuhiko'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Gundam Build Divers',
        'In a virtual world, players compete in Gunpla battles while uncovering the mysteries of the GBN system.',
        'GBD',
        2018,
        2018,
        (SELECT id FROM universe WHERE name = 'Build Divers'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Shinya Watada'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Mobile Suit Gundam Narrative',
        'A special forces unit hunts for a mysterious mobile suit that could change the course of Universal Century history.',
        'NT',
        2018,
        2018,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshizumi Toshikazu'),
        'Movie',
        'Completed',
        'Side Story'
    ),
    (
        'Gundam Build Divers Re:RISE',
        'A new team of divers must face a mysterious threat that could affect both the virtual and real worlds.',
        'GBDR',
        2019,
        2020,
        (SELECT id FROM universe WHERE name = 'Build Divers'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Shinya Watada'),
        'TV',
        'Completed',
        'Build Series'
    ),
    (
        'Mobile Suit Gundam: Hathaway',
        'A former Federation pilot leads a terrorist organization in a new conflict against Earth''s government.',
        'Hathaway',
        2021,
        NULL,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Shukou Murase'),
        'Movie',
        'Ongoing',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: Cucuruz Doan''s Island',
        'A special mission to a mysterious island where a Zeon pilot is said to be hiding with a group of children.',
        'Doan''s Island',
        2022,
        2022,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshikazu Yasuhiko'),
        'Movie',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The Witch from Mercury',
        'A young girl enrolls in a school for mobile suit pilots, where she must face various challenges and mysteries.',
        'WfM',
        2022,
        2023,
        (SELECT id FROM universe WHERE name = 'Ad Stella'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Hiroshi Kobayashi'),
        'TV',
        'Completed',
        'Main Series'
    ),
    (
        'Gundam SEED FREEDOM',
        'A new conflict emerges in the Cosmic Era as old enemies return and new threats appear.',
        'SEED Freedom',
        2024,
        2024,
        (SELECT id FROM universe WHERE name = 'Cosmic Era'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Mitsuo Fukuda'),
        'Movie',
        'Announced',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam Requiem for Vengeance',
        'A new story set during the One Year War, focusing on the European front and its unique mobile suit battles.',
        'RFV',
        2024,
        2024,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Erasmus Brosdau'),
        'OVA',
        'Announced',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The 08th MS Team',
        'A ground-based mobile suit team fights in the jungles of Southeast Asia during the One Year War.',
        '08th MS Team',
        1996,
        1999,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Takeyuki Kanda'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam MS IGLOO',
        'A series of experimental weapons and mobile suits are tested during the One Year War.',
        'MS IGLOO',
        2004,
        2009,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Takashi Imanishi'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam 00: A Wakening of the Trailblazer',
        'Celestial Being faces a new threat from beyond Earth as mysterious alien entities appear.',
        '00 Movie',
        2010,
        2010,
        (SELECT id FROM universe WHERE name = 'Anno Domini'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Seiji Mizushima'),
        'Movie',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam Unicorn RE:0096',
        'A TV recompilation of the Unicorn OVA series, following the search for Laplace''s Box.',
        'Unicorn RE:0096',
        2016,
        2016,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Kazuhiro Furuhashi'),
        'TV',
        'Completed',
        'Compilation'
    ),
    (
        'Mobile Suit Gundam: Twilight Axis',
        'A short story set after the events of Unicorn, following the search for a missing mobile suit.',
        'Twilight Axis',
        2017,
        2017,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Seiji Mizushima'),
        'OVA',
        'Completed',
        'Side Story'
    ),
    (
        'Mobile Suit Gundam: The Origin - Advent of the Red Comet',
        'A TV recompilation of The Origin OVA series, focusing on Char Aznable''s rise to power.',
        'Origin Red Comet',
        2019,
        2019,
        (SELECT id FROM universe WHERE name = 'Universal Century'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Yoshikazu Yasuhiko'),
        'TV',
        'Completed',
        'Compilation'
    ),
    (
        'Mobile Suit Gundam: The Witch from Mercury - Prologue',
        'A prequel to The Witch from Mercury, revealing the events that led to the main story.',
        'WfM Prologue',
        2022,
        2022,
        (SELECT id FROM universe WHERE name = 'Ad Stella'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Hiroshi Kobayashi'),
        'Special',
        'Completed',
        'Prologue'
    ),
    (
        'Mobile Suit Gundam: The Witch from Mercury - Special Edition',
        'A compilation of the first season of The Witch from Mercury with additional scenes.',
        'WfM Special',
        2023,
        2023,
        (SELECT id FROM universe WHERE name = 'Ad Stella'),
        (SELECT id FROM studio WHERE name = 'Sunrise'),
        (SELECT id FROM director WHERE name = 'Hiroshi Kobayashi'),
        'Special',
        'Completed',
        'Compilation'
    );

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
