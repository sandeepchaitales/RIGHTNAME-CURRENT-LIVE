from duckduckgo_search import DDGS
import json

print("Testing DDG...")
try:
    with DDGS() as ddgs:
        results = list(ddgs.text("Apple", max_results=5))
        print(f"Found {len(results)} results")
        for r in results:
            print(r.get('title'))
except Exception as e:
    print(f"Error: {e}")
