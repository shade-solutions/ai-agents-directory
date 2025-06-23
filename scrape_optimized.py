#!/usr/bin/env python3
"""
Optimized AI Agents List Scraper
Efficiently scrapes all AI agents from https://aiagentslist.com/
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import random
from urllib.parse import urljoin
import logging
from datetime import datetime
import os
import re

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class OptimizedAIAgentsScraper:
    def __init__(self):
        self.base_url = "https://aiagentslist.com"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive'
        })
        self.agents_data = []
        self.categories = []
        
    def delay(self):
        """Add short delay between requests"""
        time.sleep(random.uniform(0.5, 1.5))
        
    def get_page(self, url):
        """Get a page with error handling"""
        try:
            logger.info(f"Fetching: {url}")
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html5lib')
        except Exception as e:
            logger.error(f"Error fetching {url}: {e}")
            return None
            
    def extract_categories(self):
        """Extract all categories"""
        categories_url = f"{self.base_url}/categories"
        soup = self.get_page(categories_url)
        
        if not soup:
            return []
            
        categories = []
        
        # Look for category cards/links
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            if href and '/categories/' in href and href != '/categories':
                category_name = href.split('/categories/')[-1]
                if category_name and category_name not in [cat['name'] for cat in categories]:
                    text = link.get_text(strip=True)
                    
                    # Extract count from text
                    count = None
                    count_match = re.search(r'(\d+)\s*tools?', text, re.IGNORECASE)
                    if count_match:
                        count = int(count_match.group(1))
                        
                    categories.append({
                        'name': category_name,
                        'title': text,
                        'url': urljoin(self.base_url, href),
                        'count': count
                    })
                    
        logger.info(f"Found {len(categories)} categories")
        return categories
        
    def extract_agent_info_from_listing(self, soup, source_info=""):
        """Extract agent info from listing page"""
        agents = []
        
        # Find all agent links
        agent_links = soup.find_all('a', href=lambda href: href and '/agent/' in href)
        
        for link in agent_links:
            href = link.get('href')
            if not href or not href.startswith('/agent/'):
                continue
                
            agent_url = urljoin(self.base_url, href)
            agent_name = href.split('/agent/')[-1]
            
            # Get basic info from the listing
            agent_data = {
                'name': agent_name,
                'url': agent_url,
                'source': source_info
            }
            
            # Extract title and description from the link context
            title = link.get_text(strip=True)
            if title:
                agent_data['title'] = title
                
            # Look for description in parent elements
            parent = link.find_parent()
            if parent:
                # Try to find description text
                desc_candidates = parent.find_all(text=True)
                description_parts = []
                
                for text in desc_candidates:
                    text = text.strip()
                    if len(text) > 20 and text not in [title, agent_name]:
                        # Check if it looks like a description
                        if any(word in text.lower() for word in ['ai', 'tool', 'help', 'automat', 'generat', 'creat']):
                            description_parts.append(text)
                            
                if description_parts:
                    agent_data['description'] = ' '.join(description_parts[:2])  # Take first 2 parts
                    
            # Look for pricing info
            pricing_text = parent.get_text() if parent else ""
            if any(word in pricing_text.lower() for word in ['free', 'paid', '$', 'pricing']):
                pricing_match = re.search(r'(free|paid|free \+ paid|\$[\d,]+)', pricing_text, re.IGNORECASE)
                if pricing_match:
                    agent_data['pricing'] = pricing_match.group(1)
                    
            agents.append(agent_data)
            
        return agents
        
    def scrape_category_pages(self, category_url, category_name, max_pages=10):
        """Scrape all pages of a category"""
        all_agents = []
        
        for page in range(1, max_pages + 1):
            if page == 1:
                url = category_url
            else:
                url = f"{category_url}?page={page}"
                
            soup = self.get_page(url)
            if not soup:
                break
                
            agents = self.extract_agent_info_from_listing(soup, f"category:{category_name}:page:{page}")
            
            if not agents:
                logger.info(f"No agents found on page {page} for {category_name}")
                break
                
            logger.info(f"Found {len(agents)} agents on page {page} for {category_name}")
            all_agents.extend(agents)
            
            # Check if there's a next page
            if not soup.find('a', href=lambda href: href and 'page=' in href and f"page={page+1}" in href):
                break
                
            self.delay()
            
        return all_agents
        
    def scrape_main_pages(self, max_pages=20):
        """Scrape main listing pages"""
        all_agents = []
        
        for page in range(1, max_pages + 1):
            if page == 1:
                url = self.base_url
            else:
                url = f"{self.base_url}?page={page}"
                
            soup = self.get_page(url)
            if not soup:
                break
                
            agents = self.extract_agent_info_from_listing(soup, f"main:page:{page}")
            
            if not agents:
                logger.info(f"No agents found on main page {page}")
                break
                
            logger.info(f"Found {len(agents)} agents on main page {page}")
            all_agents.extend(agents)
            
            # Look for pagination
            pagination = soup.find('div', class_=lambda x: x and 'pagination' in x.lower()) if soup else None
            if not pagination or str(page + 1) not in pagination.get_text():
                break
                
            self.delay()
            
        return all_agents
        
    def get_detailed_agent_info(self, agent_url):
        """Get detailed info for a specific agent"""
        soup = self.get_page(agent_url)
        if not soup:
            return {}
            
        details = {}
        
        try:
            # Title
            title = soup.find('h1')
            if title:
                details['detailed_title'] = title.get_text(strip=True)
                
            # Meta description
            meta_desc = soup.find('meta', {'name': 'description'})
            if meta_desc:
                details['meta_description'] = meta_desc.get('content', '')
                
            # Look for pricing
            pricing_keywords = ['free', 'paid', 'pricing', '$', 'cost']
            for elem in soup.find_all(text=lambda text: text and any(word in text.lower() for word in pricing_keywords)):
                if elem.strip():
                    details['pricing_info'] = elem.strip()
                    break
                    
            # Look for website/demo links
            external_links = []
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                if href and href.startswith('http') and self.base_url not in href:
                    external_links.append(href)
                    
            if external_links:
                details['external_links'] = list(set(external_links))
                
            # Look for categories/tags
            categories = []
            tags = []
            
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                text = link.get_text(strip=True)
                
                if '/categories/' in href:
                    categories.append(text)
                elif '/tags/' in href or href.startswith('#'):
                    tags.append(text)
                    
            if categories:
                details['categories'] = list(set(categories))
            if tags:
                details['tags'] = list(set(tags))
                
        except Exception as e:
            logger.error(f"Error extracting details from {agent_url}: {e}")
            
        return details
        
    def scrape_all(self):
        """Main scraping function"""
        logger.info("Starting optimized AI Agents scraping...")
        
        # Get categories
        self.categories = self.extract_categories()
        
        # Collect all agents
        all_agents_dict = {}  # Use dict to avoid duplicates
        
        # Scrape main pages first
        logger.info("Scraping main pages...")
        main_agents = self.scrape_main_pages()
        
        for agent in main_agents:
            all_agents_dict[agent['url']] = agent
            
        # Scrape categories
        for i, category in enumerate(self.categories):
            logger.info(f"Scraping category {i+1}/{len(self.categories)}: {category['name']}")
            
            category_agents = self.scrape_category_pages(category['url'], category['name'])
            
            for agent in category_agents:
                if agent['url'] not in all_agents_dict:
                    all_agents_dict[agent['url']] = agent
                else:
                    # Merge category info
                    existing = all_agents_dict[agent['url']]
                    if 'categories' not in existing:
                        existing['categories'] = []
                    if category['name'] not in existing['categories']:
                        existing['categories'].append(category['name'])
                        
            self.delay()
            
        logger.info(f"Found {len(all_agents_dict)} unique agents")
        
        # Convert to list
        unique_agents = list(all_agents_dict.values())
        
        # Get detailed info for a sample of agents (to avoid taking too long)
        detailed_agents = []
        sample_size = min(100, len(unique_agents))  # Limit to 100 for detailed scraping
        
        logger.info(f"Getting detailed info for {sample_size} agents...")
        
        for i, agent in enumerate(unique_agents[:sample_size]):
            if i % 10 == 0:
                logger.info(f"Processing detailed info {i+1}/{sample_size}")
                
            details = self.get_detailed_agent_info(agent['url'])
            combined_agent = {**agent, **details}
            detailed_agents.append(combined_agent)
            
            self.delay()
            
        # Add remaining agents without detailed info
        for agent in unique_agents[sample_size:]:
            detailed_agents.append(agent)
            
        self.agents_data = detailed_agents
        return detailed_agents
        
    def save_to_json(self, filename="ai_agents_database.json"):
        """Save to JSON file"""
        os.makedirs("data", exist_ok=True)
        filepath = os.path.join("data", filename)
        
        database = {
            'metadata': {
                'scraped_at': datetime.now().isoformat(),
                'total_agents': len(self.agents_data),
                'total_categories': len(self.categories),
                'source_url': self.base_url,
                'scraper_version': '2.0_optimized'
            },
            'categories': self.categories,
            'agents': self.agents_data
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(database, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Database saved to {filepath}")
        return filepath

def main():
    scraper = OptimizedAIAgentsScraper()
    
    try:
        agents = scraper.scrape_all()
        filepath = scraper.save_to_json()
        
        print(f"\n✅ Scraping completed!")
        print(f"📊 Total agents: {len(agents)}")
        print(f"📁 Database: {filepath}")
        print(f"📋 Categories: {len(scraper.categories)}")
        
        # Show some statistics
        with_descriptions = sum(1 for agent in agents if agent.get('description'))
        with_pricing = sum(1 for agent in agents if agent.get('pricing'))
        
        print(f"📝 Agents with descriptions: {with_descriptions}")
        print(f"💰 Agents with pricing info: {with_pricing}")
        
    except Exception as e:
        logger.error(f"Scraping failed: {e}")
        if scraper.agents_data:
            scraper.save_to_json("ai_agents_partial.json")
            print("Partial data saved")

if __name__ == "__main__":
    main()
