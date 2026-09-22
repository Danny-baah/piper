import os
import re

# Read original slide titles from content.md
titles = {}
try:
    with open(r"C:\Users\DELL\.gemini\antigravity-ide\brain\f80f2d1e-852e-4e76-ba5f-a357a908932a\.system_generated\steps\15\content.md", "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    parts = text.split("wppaStoreSlideInfo(")
    for p in parts[1:]:
        end = p.find(");")
        snippet = p[:end] if end != -1 else p[:300]
        args = [a.strip().strip("'") for a in re.findall(r"'([^']*)'", snippet)]
        url = next((a for a in args if "uploads/wppa" in a), "")
        name = [a for a in args if any(ext in a.lower() for ext in ['.jpg', '.jpeg', '.png'])]
        if url:
            base_num = os.path.basename(url.split('?')[0])
            titles[base_num] = name
except Exception as e:
    print(e)

html = """<!DOCTYPE html>
<html>
<head>
<title>Pieper Images Contact Sheet</title>
<style>
body { font-family: sans-serif; background: #1a1a1a; color: #fff; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.card { background: #2a2a2a; border-radius: 8px; overflow: hidden; padding: 10px; }
.card img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
.card h4 { margin: 8px 0 4px; font-size: 13px; word-break: break-all; }
.card p { margin: 0; font-size: 11px; color: #aaa; }
</style>
</head>
<body>
<h1>Pieper Bauunternehmen Images Catalog</h1>
<div class="grid">
"""

files = sorted(os.listdir("downloaded_images"))
for f in files:
    if f.endswith(('.jpg', '.png', '.jpeg')):
        t = titles.get(f.replace("wppa_", ""), "")
        html += f"""
        <div class="card">
            <img src="{f}" alt="{f}">
            <h4>{f}</h4>
            <p>{t}</p>
        </div>
        """

html += """</div></body></html>"""

with open("downloaded_images/index.html", "w", encoding="utf-8") as out:
    out.write(html)

print("Contact sheet created at downloaded_images/index.html")
