import os
from PIL import Image, ImageStat

def analyze_image(path):
    try:
        with Image.open(path) as img:
            img_rgb = img.convert('RGB')
            w, h = img_rgb.size
            stat = ImageStat.Stat(img_rgb)
            mean_r, mean_g, mean_b = stat.mean
            # brightness
            brightness = 0.299*mean_r + 0.587*mean_g + 0.114*mean_b
            
            # Check top half vs bottom half (often sky vs ground)
            top = img_rgb.crop((0, 0, w, h // 2))
            top_stat = ImageStat.Stat(top)
            top_b_ratio = top_stat.mean[2] / (top_stat.mean[0] + top_stat.mean[1] + top_stat.mean[2] + 1e-5)
            
            # Brick red detection (high R, moderate G, low B)
            is_reddish = mean_r > 1.2 * mean_b and mean_r > 100
            
            return {
                'w': w, 'h': h,
                'brightness': round(brightness, 1),
                'r': round(mean_r), 'g': round(mean_g), 'b': round(mean_b),
                'top_blue': round(top_b_ratio, 2)
            }
    except Exception as e:
        return None

files = [f for f in os.listdir("downloaded_images") if f.endswith(('.jpg', '.jpeg', '.png'))]
for f in sorted(files):
    if not any(x in f for x in ['thumbs', 'LOGO', 'banner']):
        res = analyze_image(os.path.join("downloaded_images", f))
        if res:
            print(f"{f:<45} | {res['w']}x{res['h']} | rgb:({res['r']:>3},{res['g']:>3},{res['b']:>3}) | bright:{res['brightness']:>5} | top_blue:{res['top_blue']}")
