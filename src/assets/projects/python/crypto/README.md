# Crypto Data Automation

## Project Overview
Automated cryptocurrency data collection using CoinGecko API for real-time market insights and price tracking across multiple cryptocurrencies.

## Features
- **Real-time Data Collection**: Fetches live cryptocurrency data from CoinGecko API
- **Multi-coin Support**: Collects data for up to 1000+ cryptocurrencies
- **Automated Processing**: Scheduled data collection and processing
- **Data Storage**: Saves historical data for analysis
- **Market Analysis**: Provides insights on price trends and market movements

## Data Collected
- Current price in USD
- 24h price change percentage
- Market cap
- Volume
- Circulating supply
- Total supply
- Market rank

## API Usage
- **Endpoint**: CoinGecko API v3
- **Rate Limit**: 50 calls per minute
- **Data Source**: Real-time market data
- **Authentication**: API key required for higher limits

## Technologies Used
- Python 3.8+
- requests library for API calls
- pandas for data manipulation
- JSON for data parsing
- SQLite for data storage

## Files Included
- `crypto.ipynb`: Jupyter notebook with complete implementation

## Setup Instructions
1. Install required packages: `pip install requests pandas`
2. Get CoinGecko API key (optional for basic usage)
3. Run the notebook cells to start data collection

## Future Enhancements
- Add more cryptocurrency exchanges
- Implement price alerts
- Create automated trading signals
- Add machine learning for price prediction
