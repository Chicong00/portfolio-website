# Crypto Data Automation
# Python script for automated cryptocurrency data collection

import requests
import pandas as pd
import json
from datetime import datetime
import time

# API configuration
base_url = "https://api.coingecko.com/api/v3"
headers = {
    "accept": "application/json",
    "x-cg-demo-api-key": "CG-mNvSZ73GNiENGVUktW3QXEPp"
}

def fetch_crypto_data(page=1, per_page=250):
    """Fetch cryptocurrency market data from CoinGecko API"""
    url = f"{base_url}/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": per_page,
        "page": page,
        "sparkline": False
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

def collect_crypto_data(total_pages=4):
    """Collect data from multiple pages"""
    all_data = []
    
    for page in range(1, total_pages + 1):
        print(f"Fetching page {page}...")
        page_data = fetch_crypto_data(page=page)
        all_data.extend(page_data)
        print(f"Page {page} done, {len(page_data)} items.")
        time.sleep(1)  # Rate limiting
    
    print(f"Total cryptocurrencies collected: {len(all_data)}")
    return all_data

def process_crypto_data(all_data):
    """Process and clean the collected data"""
    df = pd.DataFrame(all_data)
    
    # Select relevant columns
    columns_to_keep = [
        'id', 'symbol', 'name', 'current_price', 'market_cap',
        'market_cap_rank', 'total_volume', 'high_24h', 'low_24h',
        'price_change_24h', 'price_change_percentage_24h',
        'market_cap_change_24h', 'market_cap_change_percentage_24h',
        'circulating_supply', 'total_supply', 'max_supply',
        'ath', 'ath_change_percentage', 'last_updated'
    ]
    
    df_clean = df[columns_to_keep]
    print(f"DataFrame shape: {df_clean.shape}")
    return df_clean

def analyze_crypto_data(df):
    """Perform basic analysis on the data"""
    print("Top 10 cryptocurrencies by market cap:")
    top_10 = df.nlargest(10, 'market_cap')[['name', 'symbol', 'current_price', 'market_cap']]
    print(top_10)
    
    print("\nTop gainers (24h):")
    top_gainers = df.nlargest(5, 'price_change_percentage_24h')[['name', 'symbol', 'price_change_percentage_24h']]
    print(top_gainers)
    
    print("\nTop losers (24h):")
    top_losers = df.nsmallest(5, 'price_change_percentage_24h')[['name', 'symbol', 'price_change_percentage_24h']]
    print(top_losers)

def save_crypto_data(df):
    """Save data to CSV with timestamp"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"crypto_data_{timestamp}.csv"
    df.to_csv(filename, index=False)
    print(f"Data saved to {filename}")
    return filename

def main():
    """Main function to run the crypto data collection"""
    print("Starting Crypto Data Collection...")
    
    # Collect data
    all_data = collect_crypto_data()
    
    if not all_data:
        print("No data collected. Exiting.")
        return
    
    # Process data
    df_clean = process_crypto_data(all_data)
    
    # Analyze data
    analyze_crypto_data(df_clean)
    
    # Save data
    filename = save_crypto_data(df_clean)
    
    print(f"Crypto data collection completed successfully!")
    print(f"Data saved to: {filename}")

if __name__ == "__main__":
    main()
