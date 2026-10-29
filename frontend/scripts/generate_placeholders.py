"""
Generates simple, brand-colored JPG placeholder images for every image path
referenced in the React components, using Pillow (no network access
required). These are NOT meant to be the final images -- they exist so the
site renders a complete, polished-looking layout out of the box. Swap them
for real photography before shipping to production (see README
"Replacing placeholder images" section).
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

# (filename, width, height, label, color_top, color_bottom)
IMAGES = [
    ("hero-mountains.jpg", 1920, 1080, "Hero — Mountain Landscape", (15, 61, 107), (26, 92, 158)),
    ("about-1.jpg", 800, 600, "About — Climber on Ridge", (26, 92, 158), (46, 123, 196)),
    ("about-2.jpg", 800, 600, "About — Climbing Gear", (46, 123, 196), (0, 168, 232)),
    ("safety-hero.jpg", 1920, 900, "Safety Hero — Snowy Ridge", (15, 61, 107), (26, 26, 46)),
    ("training-basic.jpg", 600, 450, "Basic Climbing Skills", (34, 197, 94), (26, 92, 158)),
    ("training-advanced.jpg", 600, 450, "Advanced Techniques", (26, 92, 158), (15, 61, 107)),
    ("training-survival.jpg", 600, 450, "Survival Training", (245, 158, 11), (15, 61, 107)),
    ("everest-base-camp.jpg", 800, 600, "Everest Base Camp", (239, 68, 68), (26, 26, 46)),
    ("kilimanjaro-trek.jpg", 800, 600, "Kilimanjaro Trek", (245, 158, 11), (26, 92, 158)),
    ("island-peak-climb.jpg", 800, 600, "Island Peak Climb", (34, 197, 94), (15, 61, 107)),
    ("mont-blanc-summit.jpg", 800, 600, "Mont Blanc Summit", (34, 197, 94), (46, 123, 196)),
    ("aconcagua-expedition.jpg", 800, 600, "Aconcagua Expedition", (239, 68, 68), (15, 61, 107)),
    ("elbrus-challenge.jpg", 800, 600, "Elbrus Challenge", (245, 158, 11), (26, 26, 46)),
    ("avatar-alex.jpg", 200, 200, "AM", (26, 92, 158), (15, 61, 107)),
    ("avatar-emma.jpg", 200, 200, "EJ", (46, 123, 196), (26, 92, 158)),
    ("avatar-sofia.jpg", 200, 200, "SB", (0, 168, 232), (26, 92, 158)),
    ("avatar-michael.jpg", 200, 200, "MS", (15, 61, 107), (26, 26, 46)),
]


def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def make_gradient(w, h, c1, c2):
    img = Image.new("RGB", (w, h), c1)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        draw.line([(0, y), (w, y)], fill=lerp_color(c1, c2, t))
    return img


def draw_peaks(draw, w, h):
    # Two simple translucent-feeling triangles to suggest mountains,
    # using a slightly lighter shade drawn as solid (PIL has no alpha
    # blend on RGB without compositing, so we keep it simple/flat).
    base_y = int(h * 0.88)
    p1 = [(int(w * 0.10), base_y), (int(w * 0.38), int(h * 0.45)), (int(w * 0.62), base_y)]
    p2 = [(int(w * 0.45), base_y), (int(w * 0.70), int(h * 0.55)), (int(w * 0.95), base_y)]
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    odraw.polygon(p1, fill=(255, 255, 255, 30))
    odraw.polygon(p2, fill=(255, 255, 255, 20))
    return overlay


def get_font(size):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


for filename, w, h, label, c1, c2 in IMAGES:
    base = make_gradient(w, h, c1, c2).convert("RGBA")
    overlay = draw_peaks(ImageDraw.Draw(base), w, h)
    composed = Image.alpha_composite(base, overlay).convert("RGB")

    draw = ImageDraw.Draw(composed)
    font_size = max(14, min(40, w // 24))
    font = get_font(font_size)
    bbox = draw.textbbox((0, 0), label, font=font)
    text_w, text_h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        ((w - text_w) / 2, (h - text_h) / 2 - bbox[1]),
        label,
        font=font,
        fill=(255, 255, 255, 230),
    )

    composed.save(os.path.join(OUT_DIR, filename), "JPEG", quality=85)

print(f"Generated {len(IMAGES)} placeholder JPGs in {OUT_DIR}")
