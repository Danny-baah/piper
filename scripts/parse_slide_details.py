import re

with open(r"C:\Users\DELL\.gemini\antigravity-ide\brain\f80f2d1e-852e-4e76-ba5f-a357a908932a\.system_generated\steps\15\content.md", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

parts = text.split("wppaStoreSlideInfo(")
print(f"Parts count: {len(parts)}")
for p in parts[1:]:
    end = p.find(");")
    snippet = p[:end] if end != -1 else p[:300]
    args = [a.strip().strip("'") for a in re.findall(r"'([^']*)'", snippet)]
    url = next((a for a in args if "uploads/wppa" in a), "")
    name = [a for a in args if any(ext in a.lower() for ext in ['.jpg', '.jpeg', '.png'])]
    print(f"URL: {url:<65} | Names: {name}")
