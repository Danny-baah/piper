import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

output_dir = "downloaded_images"
os.makedirs(output_dir, exist_ok=True)

urls = [
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2011/11/Pieper_LOGO2.png",
    # DJI high res
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0174.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0176.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0177.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0178.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0179.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0180.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/09/DJI_0182.jpg",
    # Album 1 originals
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-002.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-003.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-011.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-014.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-015.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-016.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-019.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-023.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-024.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-026.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-035.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa-source/album-1/31.07.2015-037.jpg",
    # Banners and media
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2024/11/Bauzaunbanner-Pieper-Bauunternehmen_1-scaled.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2024/11/Bauzaunbanner-Pieper-Bauunternehmen_2-scaled.jpg",
]

# Existing wppa image numbers
wppa_ids = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65
]
for i in wppa_ids:
    urls.append(f"http://www.pieper-bauunternehmen.de/wp-content/uploads/wppa/{i}.jpg")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_one(url):
    filename = url.replace("http://www.pieper-bauunternehmen.de/wp-content/uploads/", "").replace("/", "_")
    filepath = os.path.join(output_dir, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        return filepath
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            with open(filepath, "wb") as f:
                f.write(data)
        return filepath
    except Exception as e:
        return None

print(f"Starting parallel download of {len(urls)} images...")
with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(download_one, urls))

downloaded = [r for r in results if r and os.path.exists(r) and os.path.getsize(r) > 1000]
print(f"Downloaded/Available: {len(downloaded)} files.")

# Generate summary table
summary = []
for p in os.listdir(output_dir):
    fp = os.path.join(output_dir, p)
    if os.path.isfile(fp):
        try:
            with Image.open(fp) as img:
                summary.append((p, img.width, img.height, os.path.getsize(fp)))
        except Exception:
            pass

summary.sort(key=lambda x: (x[1] * x[2]), reverse=True)
print("\n--- Image Catalog (sorted by resolution) ---")
for name, w, h, size in summary:
    print(f"{name:<50} | {w}x{h:<5} | {size//1024} KB")
