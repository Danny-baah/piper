import urllib.request
import re

for url in ['http://www.pieper-bauunternehmen.de/', 'http://www.pieper-bauunternehmen.de/leistungen/']:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    slides = re.findall(r"wppaStoreSlideInfo\(\s*'[^']*',\s*'(\d+)',\s*'([^']*)'[^;]*'([^']*\.jpg)'", html)
    print(f"=== {url}: {len(slides)} slides ===")
    for s in slides[:15]:
        print(s)
