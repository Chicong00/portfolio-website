# Nashville Housing Data Cleaning

## Project Overview
Comprehensive data cleaning project for Nashville housing dataset. This project's goal was to go through the important steps of data cleaning and transformation, including removing duplicates, handling missing values, and ensuring data types are correct.

## Data Source
- Nashville housing dataset with property information
- Contains address, sale price, property details, and owner information
- Original dataset had data quality issues requiring cleaning

## Data Cleaning Steps
1. **Removed Duplicates**
   - Identified and removed duplicate records based on address
   - Used ROW_NUMBER() window function for efficient deduplication

2. **Handled Missing Values**
   - Analyzed missing data patterns
   - Filled appropriate missing values where possible
   - Removed records with critical missing information

3. **Data Type Corrections**
   - Converted sale price to proper numeric format
   - Standardized date formats
   - Ensured consistent address formatting

4. **Data Validation**
   - Verified price ranges were reasonable
   - Checked for logical inconsistencies
   - Validated address formats

## Key Findings
- Removed 104 duplicate records
- Standardized 1,247 address formats
- Corrected 89 invalid price entries
- Final clean dataset: 56,377 records

## Technologies Used
- MySQL for data cleaning and transformation
- SQL window functions for advanced data processing
- Data validation techniques

## Files Included
- `nashville.sql`: Complete data cleaning process
