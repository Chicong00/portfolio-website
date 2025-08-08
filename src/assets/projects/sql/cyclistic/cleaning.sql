-- Data cleaning process for Cyclistic Bike Share Analysis
-- 12 months of data (June 2023- May 2024) was imported
-- Total 5743278 rows imported

-- P.S. Even though deleting data is not a good practice,
-- but this dataset had a lot of unusable and irrelevant data

-- Initial data exploration
SELECT * FROM cyclistic.cyclisticmain;

-- Checking for ride_id with more or less than 16 characters
SELECT ride_id, length(ride_id)
FROM cyclistic.cyclisticmain
WHERE length(ride_id) ≠ 16;

-- Removing the odd ride_id's, 3865 rows deleted
DELETE
FROM cyclistic.cyclisticmain
WHERE length(ride_id) ≠ 16;

-- 3 different ride types, electric_bike, classic_bike and docked_bike
SELECT DISTINCT rideable_type
FROM cyclistic.cyclisticmain;

-- Trying to find unusual lengths of ridetime
SELECT ride_id, started_at, ended_at, 
       TIMESTAMPDIFF(MINUTE, started_at, ended_at) AS time_difference
FROM cyclistic.cyclisticmain
WHERE TIMESTAMPDIFF(MINUTE, started_at, ended_at) < 0 
   OR TIMESTAMPDIFF(MINUTE, started_at, ended_at) > 1440;

-- Remove rides with negative or extremely long durations
DELETE FROM cyclistic.cyclisticmain
WHERE TIMESTAMPDIFF(MINUTE, started_at, ended_at) < 0 
   OR TIMESTAMPDIFF(MINUTE, started_at, ended_at) > 1440;

-- Check for missing values in critical columns
SELECT COUNT(*) as total_rows,
       COUNT(ride_id) as ride_id_count,
       COUNT(started_at) as started_at_count,
       COUNT(ended_at) as ended_at_count,
       COUNT(member_casual) as member_casual_count
FROM cyclistic.cyclisticmain;

-- Remove rows with missing critical data
DELETE FROM cyclistic.cyclisticmain
WHERE ride_id IS NULL 
   OR started_at IS NULL 
   OR ended_at IS NULL 
   OR member_casual IS NULL;

-- Final data quality check
SELECT COUNT(*) as final_row_count
FROM cyclistic.cyclisticmain;
