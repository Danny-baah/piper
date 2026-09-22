import re

with open(r"C:\Users\DELL\.gemini\antigravity-ide\brain\f80f2d1e-852e-4e76-ba5f-a357a908932a\.system_generated\steps\15\content.md", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

calls = re.findall(r"wppaStoreSlideInfo\s*\([^;]+\);", text, re.DOTALL)
print(f"Total wppaStoreSlideInfo calls in homepage: {len(calls)}")
if calls:
    print("Sample call:", calls[0][:200])

urls = set(re.findall(r"http://www\.pieper-bauunternehmen\.de/wp-content/uploads/wppa/(?:thumbs/)?\d+\.jpg", text))
print(f"WPPA images found in text: {len(urls)}")
for u in sorted(urls):
    print(u)
