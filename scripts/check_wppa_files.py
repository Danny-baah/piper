import os
from PIL import Image

# Let's inspect all files that might be construction/detail photos
for i in range(1, 66):
    f = f"wppa_{i}.jpg"
    p = os.path.join("downloaded_images", f)
    if os.path.exists(p):
        with Image.open(p) as img:
            print(f"{f}: {img.width}x{img.height}")
