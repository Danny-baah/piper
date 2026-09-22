import urllib.request
import re
from urllib.parse import urljoin, urlparse

visited = set()
to_visit = ["http://www.pieper-bauunternehmen.de/"]
all_images = set()
all_pages = set()

while to_visit:
    url = to_visit.pop(0)
    if url in visited:
        continue
    visited.add(url)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        all_pages.add(url)
        
        # Look for images in img tags, a tags, javascript, etc.
        # Find any url pointing to uploads/ or images
        found_imgs = re.findall(r'https?://(?:www\.)?pieper-bauunternehmen\.de/[^"\'\s<>]+\.(?:jpg|jpeg|png|webp|gif)', html, re.I)
        for img in found_imgs:
            all_images.add(img)

        # Look for relative paths to images
        rel_imgs = re.findall(r'["\'](/wp-content/uploads/[^"\'\s<>]+\.(?:jpg|jpeg|png|webp|gif))["\']', html, re.I)
        for img in rel_imgs:
            all_images.add(urljoin(url, img))
            
        # Find more links
        links = re.findall(r'href=["\'](http://(?:www\.)?pieper-bauunternehmen\.de/[^"\'#\s]*)["\']', html, re.I)
        for link in links:
            parsed = urlparse(link)
            clean_link = f"{parsed.scheme}://{parsed.netwid if hasattr(parsed, 'netwid') else parsed.netloc}{parsed.path}"
            if clean_link.startswith("http://www.pieper-bauunternehmen.de") or clean_link.startswith("http://pieper-bauunternehmen.de"):
                # ignore xmlrpc, wp-json, wp-admin, feed
                if not any(x in clean_link for x in ['wp-json', 'xmlrpc', 'feed', 'wp-admin', 'wp-content']):
                    if clean_link not in visited and clean_link not in to_visit:
                        to_visit.append(clean_link)
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print("=== FOUND PAGES ===")
for p in sorted(all_pages):
    print(p)

print(f"\n=== FOUND {len(all_images)} IMAGES ===")
for img in sorted(all_images):
    print(img)
