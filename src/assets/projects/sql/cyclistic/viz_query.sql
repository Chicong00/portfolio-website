-- Visualization queries for Cyclistic Bike Share Analysis

-- Monthly Trends for Dashboard
SELECT 
    DATE_FORMAT(started_at, '%Y-%m') as month,
    member_casual,
    COUNT(*) as rides_count,
    AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) as avg_duration
FROM cyclistic.cyclisticmain
GROUP BY DATE_FORMAT(started_at, '%Y-%m'), member_casual
ORDER BY month;

-- Ride Type Distribution
SELECT 
    rideable_type,
    member_casual,
    COUNT(*) as rides_count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY member_casual), 2) as percentage
FROM cyclistic.cyclisticmain
GROUP BY rideable_type, member_casual
ORDER BY member_casual, rides_count DESC;

-- Hourly Usage Pattern
SELECT 
    HOUR(started_at) as hour_of_day,
    member_casual,
    COUNT(*) as rides_count
FROM cyclistic.cyclisticmain
GROUP BY HOUR(started_at), member_casual
ORDER BY hour_of_day, member_casual;

-- Weekday vs Weekend Analysis
SELECT 
    CASE 
        WHEN DAYOFWEEK(started_at) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END as day_type,
    member_casual,
    COUNT(*) as rides_count,
    AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) as avg_duration
FROM cyclistic.cyclisticmain
GROUP BY 
    CASE 
        WHEN DAYOFWEEK(started_at) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday'
    END,
    member_casual;

-- Top Stations for Map Visualization
SELECT 
    start_station_name,
    start_lat,
    start_lng,
    member_casual,
    COUNT(*) as rides_count
FROM cyclistic.cyclisticmain
WHERE start_station_name IS NOT NULL
  AND start_lat IS NOT NULL
  AND start_lng IS NOT NULL
GROUP BY start_station_name, start_lat, start_lng, member_casual
HAVING COUNT(*) > 50
ORDER BY rides_count DESC
LIMIT 20;
