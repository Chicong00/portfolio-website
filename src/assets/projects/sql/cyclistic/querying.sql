-- Member vs Casual Total Rides and Average Trip Duration
SELECT 
    member_casual,
    COUNT(*) as total_rides,
    AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) as avg_duration_minutes
FROM cyclistic.cyclisticmain
GROUP BY member_casual;

-- Member vs Casual Rides per Different Ride Types and Average Trip Duration
SELECT 
    member_casual,
    rideable_type,
    COUNT(*) as rides_count,
    AVG(TIMESTAMPDIFF(MINUTE, started_at, ended_at)) as avg_duration_minutes
FROM cyclistic.cyclisticmain
GROUP BY member_casual, rideable_type
ORDER BY member_casual, rides_count DESC;

-- Member vs Casual Rides Per Month
SELECT 
    member_casual,
    DATE_FORMAT(started_at, '%Y-%m') as month,
    COUNT(*) as rides_count
FROM cyclistic.cyclisticmain
GROUP BY member_casual, DATE_FORMAT(started_at, '%Y-%m')
ORDER BY month, member_casual;

-- Member vs Casual Rides Per Weekday
SELECT 
    member_casual,
    DAYNAME(started_at) as weekday,
    COUNT(*) as rides_count
FROM cyclistic.cyclisticmain
GROUP BY member_casual, DAYNAME(started_at)
ORDER BY FIELD(DAYNAME(started_at), 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- Peak Hours Analysis
SELECT 
    member_casual,
    HOUR(started_at) as hour_of_day,
    COUNT(*) as rides_count
FROM cyclistic.cyclisticmain
GROUP BY member_casual, HOUR(started_at)
ORDER BY member_casual, hour_of_day;

-- Top 10 Start Stations for Each User Type
SELECT 
    member_casual,
    start_station_name,
    COUNT(*) as rides_count
FROM cyclistic.cyclisticmain
WHERE start_station_name IS NOT NULL
GROUP BY member_casual, start_station_name
HAVING COUNT(*) > 100
ORDER BY member_casual, rides_count DESC
LIMIT 10;
