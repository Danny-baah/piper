import os
from PIL import Image

files = [f for f in os.listdir("downloaded_images") if f.endswith((".jpg", ".png", ".jpeg"))]

# Let's inspect the files and list details
details = []
for f in files:
    path = os.path.join("downloaded_images", f)
    with Image.open(path) as img:
        details.append({
            "name": f,
            "width": img.width,
            "height": img.height,
            "aspect": round(img.width / img.height, 2),
            "size_kb": os.path.getsize(path) // 1024
        })

details.sort(key=lambda x: (x["width"], x["height"]), reverse=True)

print(f"{'Filename':<45} | {'Dims':<11} | {'Aspect':<6} | {'Size':<8}")
print("-" * 75)
for d in details:
    print(f"{d['name']:<45} | {d['width']}x{d['height']:<6} | {d['aspect']:<6} | {d['size_kb']} KB")
