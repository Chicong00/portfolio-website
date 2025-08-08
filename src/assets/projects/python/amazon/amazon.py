# Amazon Web Scraping
# Python script for collecting product data from Amazon

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import sqlite3
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AmazonScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.base_url = "https://www.amazon.com"
        
    def get_product_data(self, product_url):
        """Extract product data from Amazon product page"""
        try:
            response = self.session.get(product_url)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract product information
            product_data = {
                'title': self._extract_title(soup),
                'price': self._extract_price(soup),
                'rating': self._extract_rating(soup),
                'review_count': self._extract_review_count(soup),
                'availability': self._extract_availability(soup),
                'scraped_at': datetime.now().isoformat()
            }
            
            return product_data
            
        except Exception as e:
            logger.error(f"Error scraping {product_url}: {e}")
            return None
    
    def _extract_title(self, soup):
        """Extract product title"""
        title_selectors = [
            '#productTitle',
            'h1.a-size-large',
            '.a-size-large.a-spacing-none'
        ]
        
        for selector in title_selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text().strip()
        return None
    
    def _extract_price(self, soup):
        """Extract product price"""
        price_selectors = [
            '.a-price-whole',
            '.a-price .a-offscreen',
            '#priceblock_ourprice'
        ]
        
        for selector in price_selectors:
            element = soup.select_one(selector)
            if element:
                price_text = element.get_text().strip()
                # Clean price text
                price = ''.join(filter(str.isdigit, price_text))
                return float(price) if price else None
        return None
    
    def _extract_rating(self, soup):
        """Extract product rating"""
        rating_selectors = [
            '.a-icon-alt',
            '.a-star-rating-text',
            '#acrPopover'
        ]
        
        for selector in rating_selectors:
            element = soup.select_one(selector)
            if element:
                rating_text = element.get_text().strip()
                # Extract numeric rating
                import re
                rating_match = re.search(r'(\d+\.?\d*)', rating_text)
                if rating_match:
                    return float(rating_match.group(1))
        return None
    
    def _extract_review_count(self, soup):
        """Extract number of reviews"""
        review_selectors = [
            '#acrCustomerReviewText',
            '.a-size-base.a-color-secondary'
        ]
        
        for selector in review_selectors:
            element = soup.select_one(selector)
            if element:
                review_text = element.get_text().strip()
                # Extract numeric count
                import re
                count_match = re.search(r'(\d+)', review_text.replace(',', ''))
                if count_match:
                    return int(count_match.group(1))
        return None
    
    def _extract_availability(self, soup):
        """Extract product availability"""
        availability_selectors = [
            '#availability',
            '.a-size-medium.a-color-success'
        ]
        
        for selector in availability_selectors:
            element = soup.select_one(selector)
            if element:
                return element.get_text().strip()
        return "Unknown"
    
    def search_products(self, search_term, max_pages=3):
        """Search for products and collect data"""
        all_products = []
        
        for page in range(1, max_pages + 1):
            try:
                # Construct search URL
                search_url = f"{self.base_url}/s?k={search_term.replace(' ', '+')}&page={page}"
                
                response = self.session.get(search_url)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Extract product links
                product_links = soup.select('h2 a.a-link-normal')
                
                for link in product_links[:10]:  # Limit to 10 products per page
                    product_url = self.base_url + link.get('href')
                    product_data = self.get_product_data(product_url)
                    
                    if product_data:
                        product_data['search_term'] = search_term
                        product_data['page'] = page
                        all_products.append(product_data)
                    
                    # Rate limiting
                    time.sleep(random.uniform(1, 3))
                
                logger.info(f"Completed page {page} for search term: {search_term}")
                
            except Exception as e:
                logger.error(f"Error on page {page}: {e}")
                continue
        
        return all_products
    
    def save_to_database(self, products_data):
        """Save scraped data to SQLite database"""
        conn = sqlite3.connect('amazon_products.db')
        
        # Create table if not exists
        conn.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                price REAL,
                rating REAL,
                review_count INTEGER,
                availability TEXT,
                search_term TEXT,
                page INTEGER,
                scraped_at TEXT
            )
        ''')
        
        # Insert data
        for product in products_data:
            conn.execute('''
                INSERT INTO products (title, price, rating, review_count, availability, search_term, page, scraped_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product['title'],
                product['price'],
                product['rating'],
                product['review_count'],
                product['availability'],
                product['search_term'],
                product['page'],
                product['scraped_at']
            ))
        
        conn.commit()
        conn.close()
        logger.info(f"Saved {len(products_data)} products to database")
    
    def analyze_data(self):
        """Analyze collected data"""
        conn = sqlite3.connect('amazon_products.db')
        
        # Load data into DataFrame
        df = pd.read_sql_query("SELECT * FROM products", conn)
        conn.close()
        
        print("=== Amazon Product Analysis ===")
        print(f"Total products analyzed: {len(df)}")
        print(f"Average price: ${df['price'].mean():.2f}")
        print(f"Average rating: {df['rating'].mean():.2f}")
        print(f"Total reviews: {df['review_count'].sum():,}")
        
        # Price analysis
        print("\n=== Price Analysis ===")
        print(f"Price range: ${df['price'].min():.2f} - ${df['price'].max():.2f}")
        print(f"Median price: ${df['price'].median():.2f}")
        
        # Rating analysis
        print("\n=== Rating Analysis ===")
        rating_counts = df['rating'].value_counts().sort_index()
        for rating, count in rating_counts.items():
            print(f"{rating} stars: {count} products")
        
        # Availability analysis
        print("\n=== Availability Analysis ===")
        availability_counts = df['availability'].value_counts()
        for status, count in availability_counts.items():
            print(f"{status}: {count} products")
        
        return df

def main():
    """Main function to run the Amazon scraper"""
    scraper = AmazonScraper()
    
    # Search terms to analyze
    search_terms = [
        "laptop",
        "smartphone", 
        "headphones",
        "tablet"
    ]
    
    all_products = []
    
    for search_term in search_terms:
        print(f"Searching for: {search_term}")
        products = scraper.search_products(search_term, max_pages=2)
        all_products.extend(products)
        print(f"Found {len(products)} products for {search_term}")
    
    # Save to database
    if all_products:
        scraper.save_to_database(all_products)
        
        # Analyze data
        df = scraper.analyze_data()
        
        # Save to CSV
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"amazon_products_{timestamp}.csv"
        df.to_csv(filename, index=False)
        print(f"\nData saved to: {filename}")
    
    print("Amazon scraping completed successfully!")

if __name__ == "__main__":
    main()
