import os
import urllib.request
from PIL import Image

urls = [
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/05/baugeraetefuehrer.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/05/maurer-bauhelfer.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/05/maurer-azubi.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2023/05/PIEPER-Anzeige_89x75mm-Werbe-Teil-des-Teams-NEU.jpeg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2021/07/Anzeige-Maurer-4.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2021/07/Anzeige-Bauhelfer.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2022/07/Prasentation-Urkunde_Maurer_Ge-sellenpruefung_07_2022_16_rgb-scaled.jpg",
    "http://www.pieper-bauunternehmen.de/wp-content/uploads/2015/03/Anzeige-Maurer.jpg"
]

headers = {'User-Agent': 'Mozilla/5.0'}
for u in urls:
    name = u.split('/')[-1]
    p = os.path.join("downloaded_images", name)
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(p, "wb") as f:
                f.write(data)
        with Image.open(p) as img:
            print(f"Downloaded {name}: {img.width}x{img.height}")
    except Exception as e:
        print(f"Error {name}: {e}")
