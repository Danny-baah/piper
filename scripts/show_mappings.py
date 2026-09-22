import re

with open(r"C:\Users\DELL\.gemini\antigravity-ide\brain\f80f2d1e-852e-4e76-ba5f-a357a908932a\.system_generated\steps\15\content.md", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

parts = text.split("wppaStoreSlideInfo(")
records = {}
for p in parts[1:]:
    end = p.find(");")
    snippet = p[:end] if end != -1 else p[:300]
    args = [a.strip().strip("'") for a in re.findall(r"'([^']*)'", snippet)]
    url = next((a for a in args if "uploads/wppa/" in a), "")
    if url:
        num = url.split("uploads/wppa/")[1].split(".jpg")[0]
        # find original filename like 100_2056.jpg, Fotos f_r Webside, 31.07.2015, etc.
        names = [a for a in args if any(ext in a.lower() for ext in ['.jpg', '.jpeg', '.png']) and 'uploads' not in a]
        records[num] = names[0] if names else ""

for num in sorted(records.keys(), key=lambda x: int(x) if x.isdigit() else 999):
    print(f"wppa_{num}.jpg -> {records[num]}")
