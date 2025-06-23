#!/usr/bin/env python3
"""
Test script to verify the scraper works before running the full scrape
"""

import sys
sys.path.append('.')
from scrape_ai_agents import AIAgentsListScraper

def test_scraper():
    scraper = AIAgentsListScraper()
    
    print("Testing category extraction...")
    categories = scraper.extract_categories()
    print(f"Found {len(categories)} categories:")
    for cat in categories[:5]:  # Show first 5
        print(f"  - {cat['name']}: {cat['title']} ({cat.get('count', 'N/A')} tools)")
    
    print("\nTesting main page agent extraction...")
    # Test main page scraping with just first page
    soup = scraper.get_page(scraper.base_url)
    if soup:
        agent_links = soup.find_all('a', href=lambda href: href and '/agent/' in href)
        print(f"Found {len(agent_links)} agent links on main page")
        
        if agent_links:
            # Test agent detail extraction
            first_agent_url = scraper.base_url + agent_links[0].get('href')
            print(f"\nTesting agent detail extraction: {first_agent_url}")
            agent_details = scraper.extract_agent_details(first_agent_url)
            if agent_details:
                print("Agent details extracted successfully:")
                for key, value in agent_details.items():
                    if isinstance(value, str) and len(value) > 100:
                        print(f"  {key}: {value[:100]}...")
                    else:
                        print(f"  {key}: {value}")
            else:
                print("Failed to extract agent details")
    
    print("\nTest completed!")

if __name__ == "__main__":
    test_scraper()
