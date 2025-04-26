-- Cleanup script for removing soft-deleted records
-- Run this script as an admin task to permanently remove deleted records

-- First, remove pilot-mobile suit relationships for deleted pilots
DELETE FROM pilot_mobile_suit
WHERE pilot_id IN (
    SELECT id FROM pilot WHERE deleted_at IS NOT NULL
);

-- Remove pilot-mobile suit relationships for deleted mobile suits
DELETE FROM pilot_mobile_suit
WHERE mobile_suit_id IN (
    SELECT id FROM mobile_suit WHERE deleted_at IS NOT NULL
);

-- Remove pilots from deleted series
DELETE FROM pilot
WHERE series_id IN (
    SELECT id FROM series WHERE deleted_at IS NOT NULL
);

-- Remove mobile suits from deleted series
DELETE FROM mobile_suit
WHERE series_id IN (
    SELECT id FROM series WHERE deleted_at IS NOT NULL
);

-- Finally, remove the soft-deleted records
DELETE FROM pilot WHERE deleted_at IS NOT NULL;
DELETE FROM mobile_suit WHERE deleted_at IS NOT NULL;
DELETE FROM series WHERE deleted_at IS NOT NULL; 
