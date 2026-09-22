import urllib.request
import re

urls = [
    'http://www.pieper-bauunternehmen.de/leistungen/',
    'http://www.pieper-bauunternehmen.de/kontakt/',
    'http://www.pieper-bauunternehmen.de/karriere/',
    'http://www.pieper-bauunternehmen.de/impressum/',
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        imgs = set(re.findall(r'https?://(?:www\.)?pieper-bauunternehmen\.de/[^"\'\s<>]+\.(?:jpg|jpeg|png)', html, re.I))
        # Also check for wppa stored slides
        wppa_slides = set(re.findall(r'wppaStoreSlideInfo\([^)]+\)', html))
        print(f"=== {u} (imgs: {len(imgs)}, wppa: {len(wppa_slides)}) ===")
        for img in sorted(imgs):
            if not any(x in img for x in ['plugins', 'themes', 'concrete_wall', 'wppa/thumbs']):
                print("   ", img)
    except Exception as e:
        print(f"Error {u}: {e}")
