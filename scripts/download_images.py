import os
import urllib.request
import urllib.parse
from PIL import Image

output_dir = "downloaded_images"
os.makedirs(output_dir, exist_ok=True)

# Build a comprehensive list of all candidate image URLs
urls = []

# WP Media high-res
for num in ["0174", "0176", "0177", "0178", "0179", "0180", "0182"]:
    urls.append(f"http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_{num}.jpg")
    urls.append(f"http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-2/DJI_{num}.jpg")

for name in [
    "31.07.2015-002.jpg", "31.07.2015-003.jpg", "31.07.2015-011.jpg",
    "31.07.2015-014.jpg", "31.07.2015-015.jpg", "31.07.2015-016.jpg",
    "31.07.2015-019.jpg", "31.07.2015-023.jpg", "31.07.2015-024.jpg",
    "31.07.2015-026.jpg", "31.07.2015-035.jpg", "31.07.2015-037.jpg"
]:
    urls.append(f"http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/{name}")

# Logo
urls.append("http://www.pieper-bauunternehmen.de/wp-content/uploads/2011/11/Pieper_LOGO2.png")

# All wppa images 1 to 65
for i in range(1, 66):
    urls.append(f"http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa/{i}.jpg")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

catalog = []
for url in sorted(set(urls)):
    filename = url.replace("http://www.pieper-bauunternehmen.de/wp-content/uploads/", "").replace("/", "_")
    filepath = os.path.join(output_dir, filename)
    if not os.path.exists(filepath):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
                with open(filepath, "wb") as f:
                    f.write(data)
        except Exception as e:
            continue
            
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        try:
            with Image.open(filepath) as img:
                w, h = img.size
                catalog.append((filename, w, h, os.path.getsize(filepath), url))
        except Exception as e:
            pass

print(f"Successfully downloaded and verified {len(catalog)} images:")
catalog.sort(key=lambda x: (x[1] * x[2]), reverse=True)
for item in catalog:
    print(f"{item[0]}: {item[1]}x{item[2]} ({item[3]} bytes)")
