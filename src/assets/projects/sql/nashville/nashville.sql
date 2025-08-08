-- Nashville housing data cleaning
-- Comprehensive data cleaning process for Nashville housing dataset

-- Initial data exploration
SELECT COUNT(*) as total_rows FROM housing_data;
SELECT * FROM housing_data LIMIT 10;

-- Check for duplicates based on address
SELECT address, COUNT(*) as duplicate_count
FROM housing_data
GROUP BY address
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- Removing duplicates using ROW_NUMBER() window function
DELETE FROM housing_data WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY address ORDER BY id) as rn
    FROM housing_data
  ) t WHERE t.rn > 1
);

-- Check for missing values
SELECT 
    COUNT(*) as total_rows,
    COUNT(address) as address_count,
    COUNT(sale_price) as price_count,
    COUNT(sale_date) as date_count
FROM housing_data;

-- Handle missing sale prices
UPDATE housing_data 
SET sale_price = NULL 
WHERE sale_price = 0 OR sale_price = '';

-- Remove records with missing critical data
DELETE FROM housing_data 
WHERE address IS NULL OR sale_price IS NULL;

-- Standardize address format
UPDATE housing_data 
SET address = UPPER(TRIM(address));

-- Convert sale price to numeric format
UPDATE housing_data 
SET sale_price = CAST(REPLACE(REPLACE(sale_price, '$', ''), ',', '') AS DECIMAL(10,2))
WHERE sale_price REGEXP '^[0-9,]+$';

-- Remove outliers (prices too high or too low)
DELETE FROM housing_data 
WHERE sale_price < 10000 OR sale_price > 1000000;

-- Standardize sale date format
UPDATE housing_data 
SET sale_date = STR_TO_DATE(sale_date, '%M %d, %Y')
WHERE sale_date IS NOT NULL;

-- Final data quality check
SELECT 
    COUNT(*) as final_row_count,
    MIN(sale_price) as min_price,
    MAX(sale_price) as max_price,
    AVG(sale_price) as avg_price
FROM housing_data;
