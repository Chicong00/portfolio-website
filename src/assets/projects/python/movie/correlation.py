# Movie Correlation Analysis
# Python script for analyzing movie industry data correlations

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from datetime import datetime

def load_movie_data():
    """Load and prepare movie dataset"""
    # Simulated movie data - in real scenario, load from CSV
    np.random.seed(42)
    n_movies = 1000
    
    data = {
        'title': [f'Movie_{i}' for i in range(n_movies)],
        'budget': np.random.uniform(1e6, 200e6, n_movies),
        'revenue': np.random.uniform(1e6, 500e6, n_movies),
        'rating': np.random.uniform(1, 10, n_movies),
        'genre': np.random.choice(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'], n_movies),
        'release_month': np.random.randint(1, 13, n_movies),
        'runtime': np.random.uniform(90, 180, n_movies)
    }
    
    df = pd.DataFrame(data)
    
    # Create correlation between budget and revenue
    df['revenue'] = df['budget'] * np.random.uniform(0.5, 3.0, n_movies) + np.random.normal(0, 20e6, n_movies)
    df['revenue'] = df['revenue'].clip(lower=1e6)  # Ensure positive revenue
    
    return df

def analyze_budget_revenue_correlation(df):
    """Analyze correlation between budget and revenue"""
    print("=== Budget vs Revenue Analysis ===")
    
    # Calculate correlation
    correlation = df['budget'].corr(df['revenue'])
    print(f"Correlation coefficient: {correlation:.3f}")
    
    # Calculate ROI
    df['roi'] = (df['revenue'] - df['budget']) / df['budget'] * 100
    avg_roi = df['roi'].mean()
    print(f"Average ROI: {avg_roi:.1f}%")
    
    # Top performing movies by ROI
    top_roi = df.nlargest(10, 'roi')[['title', 'budget', 'revenue', 'roi']]
    print("\nTop 10 movies by ROI:")
    print(top_roi)
    
    return correlation, df

def analyze_genre_performance(df):
    """Analyze movie performance by genre"""
    print("\n=== Genre Performance Analysis ===")
    
    genre_stats = df.groupby('genre').agg({
        'revenue': ['mean', 'median', 'count'],
        'roi': 'mean',
        'rating': 'mean'
    }).round(2)
    
    print("Genre Performance Statistics:")
    print(genre_stats)
    
    # Best performing genres
    best_genres = df.groupby('genre')['roi'].mean().sort_values(ascending=False)
    print(f"\nGenres by average ROI:")
    for genre, roi in best_genres.items():
        print(f"{genre}: {roi:.1f}%")
    
    return genre_stats

def analyze_seasonal_effects(df):
    """Analyze seasonal effects on movie performance"""
    print("\n=== Seasonal Analysis ===")
    
    # Define seasons
    df['season'] = pd.cut(df['release_month'], 
                          bins=[0, 3, 6, 9, 12], 
                          labels=['Winter', 'Spring', 'Summer', 'Fall'])
    
    seasonal_stats = df.groupby('season').agg({
        'revenue': 'mean',
        'roi': 'mean',
        'rating': 'mean'
    }).round(2)
    
    print("Performance by Season:")
    print(seasonal_stats)
    
    return seasonal_stats

def create_visualizations(df):
    """Create correlation visualizations"""
    print("\n=== Creating Visualizations ===")
    
    # Set up the plotting style
    plt.style.use('default')
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    
    # 1. Budget vs Revenue scatter plot
    axes[0, 0].scatter(df['budget']/1e6, df['revenue']/1e6, alpha=0.6)
    axes[0, 0].set_xlabel('Budget (Millions USD)')
    axes[0, 0].set_ylabel('Revenue (Millions USD)')
    axes[0, 0].set_title('Budget vs Revenue Correlation')
    
    # 2. ROI by Genre
    genre_roi = df.groupby('genre')['roi'].mean()
    axes[0, 1].bar(genre_roi.index, genre_roi.values)
    axes[0, 1].set_title('Average ROI by Genre')
    axes[0, 1].set_ylabel('ROI (%)')
    axes[0, 1].tick_params(axis='x', rotation=45)
    
    # 3. Revenue by Season
    seasonal_revenue = df.groupby('season')['revenue'].mean()
    axes[1, 0].bar(seasonal_revenue.index, seasonal_revenue.values/1e6)
    axes[1, 0].set_title('Average Revenue by Season')
    axes[1, 0].set_ylabel('Revenue (Millions USD)')
    
    # 4. Rating vs Revenue
    axes[1, 1].scatter(df['rating'], df['revenue']/1e6, alpha=0.6)
    axes[1, 1].set_xlabel('Rating')
    axes[1, 1].set_ylabel('Revenue (Millions USD)')
    axes[1, 1].set_title('Rating vs Revenue')
    
    plt.tight_layout()
    plt.savefig('movie_correlation_analysis.png', dpi=300, bbox_inches='tight')
    print("Visualizations saved as 'movie_correlation_analysis.png'")
    
    return fig

def main():
    """Main function to run the movie correlation analysis"""
    print("Starting Movie Correlation Analysis...")
    
    # Load data
    df = load_movie_data()
    print(f"Loaded {len(df)} movies")
    
    # Analyze budget vs revenue correlation
    correlation, df = analyze_budget_revenue_correlation(df)
    
    # Analyze genre performance
    genre_stats = analyze_genre_performance(df)
    
    # Analyze seasonal effects
    seasonal_stats = analyze_seasonal_effects(df)
    
    # Create visualizations
    fig = create_visualizations(df)
    
    # Summary
    print("\n=== Summary ===")
    print(f"Strong correlation between budget and revenue: {correlation:.3f}")
    print(f"Average ROI across all movies: {df['roi'].mean():.1f}%")
    print(f"Best performing genre: {df.groupby('genre')['roi'].mean().idxmax()}")
    print(f"Best performing season: {df.groupby('season')['roi'].mean().idxmax()}")
    
    print("\nMovie correlation analysis completed successfully!")

if __name__ == "__main__":
    main()
