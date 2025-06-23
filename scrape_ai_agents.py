#!/usr/bin/env python3
"""
AI Agents List Scraper
Scrapes all AI agents from https://aiagentslist.com/ and saves to JSON database
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import random
from urllib.parse import urljoin, urlparse
import logging
from datetime import datetime
import os

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class AIAgentsListScraper:
    def __init__(self):
        self.base_url = "https://aiagentslist.com"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
        self.agents_data = []
        self.categories = []
        
    def delay(self):
        """Add random delay between requests to be respectful"""
        time.sleep(random.uniform(1, 3))
        
    def get_page(self, url):
        """Get a page with error handling"""
        try:
            logger.info(f"Fetching: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html5lib')
        except requests.RequestException as e:
            logger.error(f"Error fetching {url}: {e}")
            return None
            
    def extract_categories(self):
        """Extract all categories from the categories page"""
        categories_url = f"{self.base_url}/categories"
        soup = self.get_page(categories_url)
        
        if not soup:
            return []
            
        categories = []
        
        # Find category links
        category_links = soup.find_all('a', href=lambda href: href and '/categories/' in href)
        
        for link in category_links:
            href = link.get('href')
            if href and href.startswith('/categories/') and href != '/categories':
                category_name = href.split('/categories/')[-1]
                category_title = link.get_text(strip=True)
                
                # Extract count if available
                count_text = link.get_text()
                count = None
                if 'tools' in count_text:
                    try:
                        count = int(''.join(filter(str.isdigit, count_text.split('tools')[0])))
                    except:
                        pass
                
                categories.append({
                    'name': category_name,
                    'title': category_title,
                    'url': urljoin(self.base_url, href),
                    'count': count
                })
                
        logger.info(f"Found {len(categories)} categories")
        return categories
        
    def extract_agent_details(self, agent_url):
        """Extract detailed information from an individual agent page"""
        soup = self.get_page(agent_url)
        if not soup:
            return None
            
        agent_data = {'url': agent_url}
        
        try:
            # Extract title
            title_elem = soup.find('h1')
            if title_elem:
                agent_data['title'] = title_elem.get_text(strip=True)
                
            # Extract description
            desc_elem = soup.find('meta', {'name': 'description'})
            if desc_elem:
                agent_data['description'] = desc_elem.get('content', '')
                
            # Try to find main content description
            content_divs = soup.find_all('div', class_=lambda x: x and ('description' in x.lower() or 'content' in x.lower()))
            for div in content_divs:
                text = div.get_text(strip=True)
                if len(text) > 50:  # Only consider substantial text
                    agent_data['long_description'] = text
                    break
                    
            # Extract pricing
            pricing_elem = soup.find(text=lambda text: text and any(word in text.lower() for word in ['free', 'paid', 'pricing', '$']))
            if pricing_elem:
                agent_data['pricing'] = pricing_elem.strip()
                
            # Extract tags/categories
            tag_links = soup.find_all('a', href=lambda href: href and ('/categories/' in href or '/tags/' in href))
            tags = []
            categories = []
            
            for link in tag_links:
                href = link.get('href', '')
                text = link.get_text(strip=True)
                if '/categories/' in href:
                    categories.append(text)
                elif '/tags/' in href:
                    tags.append(text)
                    
            if tags:
                agent_data['tags'] = tags
            if categories:
                agent_data['categories'] = categories
                
            # Extract website/external links
            external_links = []
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                if href and not href.startswith('/') and not self.base_url in href:
                    if href.startswith('http'):
                        external_links.append(href)
                        
            if external_links:
                agent_data['external_links'] = list(set(external_links))
                
            # Extract any additional metadata
            meta_tags = soup.find_all('meta')
            for meta in meta_tags:
                property_name = meta.get('property') or meta.get('name')
                content = meta.get('content')
                if property_name and content:
                    if 'og:' in property_name or 'twitter:' in property_name:
                        agent_data[f'meta_{property_name.replace(":", "_")}'] = content
                        
        except Exception as e:
            logger.error(f"Error extracting details from {agent_url}: {e}")
            
        return agent_data
        
    def extract_agents_from_category(self, category_url, category_name):
        """Extract all agents from a category page"""
        agents = []
        page = 1
        
        while True:
            if page == 1:
                url = category_url
            else:
                url = f"{category_url}?page={page}"
                
            soup = self.get_page(url)
            if not soup:
                break
                
            # Find agent links on this page
            agent_links = soup.find_all('a', href=lambda href: href and '/agent/' in href)
            
            if not agent_links:
                logger.info(f"No more agents found on page {page} for category {category_name}")
                break
                
            logger.info(f"Found {len(agent_links)} agents on page {page} for category {category_name}")
            
            for link in agent_links:
                href = link.get('href')
                if href and '/agent/' in href:
                    agent_url = urljoin(self.base_url, href)
                    
                    # Extract basic info from the listing
                    agent_data = {
                        'listing_url': agent_url,
                        'category': category_name,
                        'page': page
                    }
                    
                    # Get title from link text or nearby elements
                    title = link.get_text(strip=True)
                    if title:
                        agent_data['title'] = title
                        
                    # Try to get description from parent elements
                    parent = link.parent
                    if parent:
                        desc_text = parent.get_text(strip=True)
                        if len(desc_text) > len(title) + 10:
                            agent_data['short_description'] = desc_text
                            
                    agents.append(agent_data)
                    
            page += 1
            self.delay()  # Be respectful with requests
            
            # Safety check to avoid infinite loops
            if page > 50:
                logger.warning(f"Reached page limit for category {category_name}")
                break
                
        return agents
        
    def extract_agents_from_main_page(self):
        """Extract agents from the main page"""
        agents = []
        page = 1
        
        while True:
            if page == 1:
                url = self.base_url
            else:
                url = f"{self.base_url}?page={page}"
                
            soup = self.get_page(url)
            if not soup:
                break
                
            # Find agent links
            agent_links = soup.find_all('a', href=lambda href: href and '/agent/' in href)
            
            if not agent_links:
                logger.info(f"No more agents found on main page {page}")
                break
                
            logger.info(f"Found {len(agent_links)} agents on main page {page}")
            
            for link in agent_links:
                href = link.get('href')
                if href and '/agent/' in href:
                    agent_url = urljoin(self.base_url, href)
                    
                    agent_data = {
                        'listing_url': agent_url,
                        'source': 'main_page',
                        'page': page
                    }
                    
                    title = link.get_text(strip=True)
                    if title:
                        agent_data['title'] = title
                        
                    agents.append(agent_data)
                    
            # Check for next page
            next_link = soup.find('a', text='Next') or soup.find('a', {'aria-label': 'Next'})
            if not next_link:
                break
                
            page += 1
            self.delay()
            
            if page > 50:  # Safety limit
                break
                
        return agents
        
    def scrape_all_agents(self):
        """Main scraping function"""
        logger.info("Starting AI Agents List scraping...")
        
        # Get categories
        self.categories = self.extract_categories()
        
        # Collect agents from all categories
        all_agents = []
        
        # First, get agents from main page
        logger.info("Scraping main page...")
        main_page_agents = self.extract_agents_from_main_page()
        all_agents.extend(main_page_agents)
        
        # Then scrape each category
        for category in self.categories:
            logger.info(f"Scraping category: {category['title']}")
            self.delay()
            
            category_agents = self.extract_agents_from_category(
                category['url'], 
                category['name']
            )
            all_agents.extend(category_agents)
            
        # Remove duplicates based on URL
        seen_urls = set()
        unique_agents = []
        
        for agent in all_agents:
            url = agent.get('listing_url')
            if url and url not in seen_urls:
                seen_urls.add(url)
                unique_agents.append(agent)
                
        logger.info(f"Found {len(unique_agents)} unique agents")
        
        # Now get detailed information for each agent
        detailed_agents = []
        
        for i, agent in enumerate(unique_agents):
            logger.info(f"Getting details for agent {i+1}/{len(unique_agents)}: {agent.get('title', 'Unknown')}")
            
            detailed_info = self.extract_agent_details(agent['listing_url'])
            if detailed_info:
                # Combine basic info with detailed info
                combined_agent = {**agent, **detailed_info}
                detailed_agents.append(combined_agent)
            else:
                detailed_agents.append(agent)
                
            self.delay()
            
            # Save progress every 50 agents
            if (i + 1) % 50 == 0:
                self.save_progress(detailed_agents, f"progress_{i+1}")
                
        self.agents_data = detailed_agents
        
        return detailed_agents
        
    def save_progress(self, data, filename_suffix=""):
        """Save progress to avoid losing data"""
        filename = f"ai_agents_progress_{filename_suffix}.json" if filename_suffix else "ai_agents_progress.json"
        filepath = os.path.join("data", filename)
        
        os.makedirs("data", exist_ok=True)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Progress saved to {filepath}")
        
    def save_to_json(self, filename="ai_agents_database.json"):
        """Save the scraped data to JSON file"""
        os.makedirs("data", exist_ok=True)
        filepath = os.path.join("data", filename)
        
        # Create the final database structure
        database = {
            'metadata': {
                'scraped_at': datetime.now().isoformat(),
                'total_agents': len(self.agents_data),
                'total_categories': len(self.categories),
                'source_url': self.base_url,
                'scraper_version': '1.0'
            },
            'categories': self.categories,
            'agents': self.agents_data
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(database, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Database saved to {filepath}")
        logger.info(f"Total agents scraped: {len(self.agents_data)}")
        logger.info(f"Total categories: {len(self.categories)}")
        
        return filepath

def main():
    scraper = AIAgentsListScraper()
    
    try:
        # Scrape all agents
        agents = scraper.scrape_all_agents()
        
        # Save to JSON
        filepath = scraper.save_to_json()
        
        print(f"\n✅ Scraping completed successfully!")
        print(f"📊 Total agents scraped: {len(agents)}")
        print(f"📁 Database saved to: {filepath}")
        
    except KeyboardInterrupt:
        logger.info("Scraping interrupted by user")
        if scraper.agents_data:
            scraper.save_progress(scraper.agents_data, "interrupted")
            print("Progress saved before interruption")
    except Exception as e:
        logger.error(f"Scraping failed: {e}")
        if scraper.agents_data:
            scraper.save_progress(scraper.agents_data, "error")
            print("Progress saved after error")
        raise

if __name__ == "__main__":
    main()
