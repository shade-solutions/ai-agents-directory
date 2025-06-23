#!/usr/bin/env python3
"""
Monitor the progress of the AI agents scraping process.
"""

import os
import time
import json
from datetime import datetime

def monitor_progress():
    """Monitor scraping progress by checking for output files and process status"""
    
    print(f"=== AI Agents Scraper Monitor ===")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Check for running processes
    print("Checking for running Python processes...")
    os.system("ps aux | grep python | grep scrape | grep -v grep")
    print()
    
    # Check for output files
    print("Checking for output files...")
    
    # Check data directory
    data_dir = "./data"
    if os.path.exists(data_dir):
        files = os.listdir(data_dir)
        if files:
            print(f"Files in data directory: {files}")
            for file in files:
                if file.endswith('.json'):
                    filepath = os.path.join(data_dir, file)
                    try:
                        with open(filepath, 'r') as f:
                            data = json.load(f)
                            if isinstance(data, dict) and 'agents' in data:
                                print(f"  {file}: {len(data['agents'])} agents found")
                            elif isinstance(data, list):
                                print(f"  {file}: {len(data)} items found")
                    except Exception as e:
                        print(f"  {file}: Error reading - {e}")
        else:
            print("Data directory is empty")
    else:
        print("Data directory not found")
    
    # Check for any JSON files in current directory
    json_files = [f for f in os.listdir('.') if f.endswith('.json') and 'ai_agents' in f.lower()]
    if json_files:
        print(f"AI agents JSON files found: {json_files}")
        for file in json_files:
            try:
                with open(file, 'r') as f:
                    data = json.load(f)
                    if isinstance(data, dict) and 'agents' in data:
                        print(f"  {file}: {len(data['agents'])} agents")
                    elif isinstance(data, list):
                        print(f"  {file}: {len(data)} items")
            except Exception as e:
                print(f"  {file}: Error reading - {e}")
    else:
        print("No AI agents JSON files found in current directory")
    
    print()
    print("=== End Monitor ===")

if __name__ == "__main__":
    monitor_progress()
