import re

with open(r"C:\Users\DELL\.gemini\antigravity-ide\brain\f80f2d1e-852e-4e76-ba5f-a357a908932a\.system_generated\steps\15\content.md", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

links = set(re.findall(r'href=["\'](http://www\.pieper-bauunternehmen\.de/[^"\'#\s]*)["\']', text))
print(f"Internal links count: {len(links)}")
for l in sorted(links):
    print(l)
