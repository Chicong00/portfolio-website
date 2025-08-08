-- COVID-19 data analysis
-- Exploratory analysis of COVID-19 pandemic data

-- Global daily cases and deaths
SELECT 
    date,
    SUM(new_cases) as global_new_cases,
    SUM(new_deaths) as global_new_deaths,
    SUM(total_cases) as global_total_cases,
    SUM(total_deaths) as global_total_deaths
FROM covid_data
WHERE continent IS NOT NULL
GROUP BY date
ORDER BY date;

-- Top 10 countries by total cases
SELECT 
    location,
    MAX(total_cases) as total_cases,
    MAX(total_deaths) as total_deaths,
    ROUND(MAX(total_deaths) * 100.0 / MAX(total_cases), 2) as mortality_rate
FROM covid_data
WHERE continent IS NOT NULL
  AND total_cases IS NOT NULL
GROUP BY location
ORDER BY total_cases DESC
LIMIT 10;

-- Continent-wise analysis
SELECT 
    continent,
    SUM(new_cases) as total_new_cases,
    SUM(new_deaths) as total_new_deaths,
    ROUND(SUM(new_deaths) * 100.0 / SUM(new_cases), 2) as mortality_rate
FROM covid_data
WHERE continent IS NOT NULL
GROUP BY continent
ORDER BY total_new_cases DESC;

-- Monthly trends
SELECT 
    DATE_FORMAT(date, '%Y-%m') as month,
    SUM(new_cases) as monthly_cases,
    SUM(new_deaths) as monthly_deaths
FROM covid_data
WHERE continent IS NOT NULL
GROUP BY DATE_FORMAT(date, '%Y-%m')
ORDER BY month;

-- Vaccination analysis
SELECT 
    location,
    MAX(people_vaccinated) as total_vaccinated,
    MAX(people_fully_vaccinated) as fully_vaccinated,
    MAX(population) as population,
    ROUND(MAX(people_fully_vaccinated) * 100.0 / MAX(population), 2) as vaccination_rate
FROM covid_data
WHERE continent IS NOT NULL
  AND people_fully_vaccinated IS NOT NULL
GROUP BY location
HAVING vaccination_rate > 50
ORDER BY vaccination_rate DESC;

-- Case fatality rate by country
SELECT 
    location,
    MAX(total_cases) as total_cases,
    MAX(total_deaths) as total_deaths,
    ROUND(MAX(total_deaths) * 100.0 / MAX(total_cases), 2) as case_fatality_rate
FROM covid_data
WHERE continent IS NOT NULL
  AND total_cases > 10000
GROUP BY location
ORDER BY case_fatality_rate DESC
LIMIT 20;
