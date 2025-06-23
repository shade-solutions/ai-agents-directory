#!/usr/bin/env python3
"""
Validate and summarize the AI agents database.
"""

import json
import os
from collections import Counter

def validate_database():
    """Validate and provide summary of the scraped AI agents database"""
    
    db_path = "./data/ai_agents_database.json"
    
    if not os.path.exists(db_path):
        print("❌ Database file not found!")
        return
    
    try:
        with open(db_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Error reading database: {e}")
        return
    
    print("🎉 AI AGENTS DATABASE VALIDATION REPORT")
    print("=" * 50)
    
    # Metadata validation
    if 'metadata' in data:
        metadata = data['metadata']
        print(f"📊 Scraping Date: {metadata.get('scraped_at', 'Unknown')}")
        print(f"📊 Total Agents: {metadata.get('total_agents', 'Unknown')}")
        print(f"📊 Total Categories: {metadata.get('total_categories', 'Unknown')}")
        print(f"📊 Source URL: {metadata.get('source_url', 'Unknown')}")
        print(f"📊 Scraper Version: {metadata.get('scraper_version', 'Unknown')}")
    
    print("\n" + "=" * 50)
    
    # Categories validation
    if 'categories' in data:
        categories = data['categories']
        print(f"📁 Categories Found: {len(categories)}")
        
        # Sort categories by count
        sorted_categories = sorted(categories, key=lambda x: x.get('count', 0), reverse=True)
        print("\n🏆 Top Categories by Agent Count:")
        for i, cat in enumerate(sorted_categories[:10], 1):
            print(f"  {i:2d}. {cat.get('name', 'Unknown'):20} - {cat.get('count', 0):3d} agents")
    
    print("\n" + "=" * 50)
    
    # Agents validation
    if 'agents' in data:
        agents = data['agents']
        print(f"🤖 Total Agents: {len(agents)}")
        
        # Check data completeness
        agents_with_details = sum(1 for agent in agents if 'detailed_title' in agent)
        agents_with_pricing = sum(1 for agent in agents if 'pricing' in agent and agent['pricing'])
        agents_with_tags = sum(1 for agent in agents if 'tags' in agent and agent['tags'])
        agents_with_external_links = sum(1 for agent in agents if 'external_links' in agent and agent['external_links'])
        
        print(f"\n📈 Data Completeness:")
        print(f"  • Agents with detailed info: {agents_with_details:3d} ({agents_with_details/len(agents)*100:.1f}%)")
        print(f"  • Agents with pricing info: {agents_with_pricing:3d} ({agents_with_pricing/len(agents)*100:.1f}%)")
        print(f"  • Agents with tags:         {agents_with_tags:3d} ({agents_with_tags/len(agents)*100:.1f}%)")
        print(f"  • Agents with external links: {agents_with_external_links:3d} ({agents_with_external_links/len(agents)*100:.1f}%)")
        
        # Pricing analysis
        pricing_counter = Counter()
        for agent in agents:
            pricing = agent.get('pricing', 'Unknown')
            if pricing:
                pricing_counter[pricing] += 1
        
        print(f"\n💰 Pricing Distribution:")
        for pricing, count in pricing_counter.most_common():
            print(f"  • {pricing:15} - {count:3d} agents ({count/len(agents)*100:.1f}%)")
        
        # Sample agent data
        print(f"\n🔍 Sample Agent (First Entry):")
        if agents:
            sample = agents[0]
            print(f"  • Name: {sample.get('name', 'Unknown')}")
            print(f"  • Title: {sample.get('title', 'Unknown')}")
            print(f"  • URL: {sample.get('url', 'Unknown')}")
            print(f"  • Pricing: {sample.get('pricing', 'Unknown')}")
            print(f"  • Categories: {len(sample.get('categories', []))} categories")
            if 'tags' in sample and sample['tags']:
                print(f"  • Tags: {len(sample['tags'])} tags")
                print(f"    Example tags: {', '.join(sample['tags'][:5])}")
    
    print("\n" + "=" * 50)
    print("✅ DATABASE VALIDATION COMPLETE")
    
    # File size info
    file_size = os.path.getsize(db_path) / (1024 * 1024)  # MB
    print(f"📁 Database File Size: {file_size:.2f} MB")

if __name__ == "__main__":
    validate_database()
