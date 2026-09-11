"""Generate brand assets (logo cutouts, favicons, OG image) for Noctillio AI."""
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT = Path("/Users/vanka/Documents/projects/noctilio")
SRC_LOGO = ROOT / "assets" / "noctillio-ai.png"
PUBLIC = ROOT / "public"
LOGO_DIR = PUBLIC / "logo"
PROJECTS_DIR = PUBLIC / "projects"
LOGO_DIR.mkdir(parents=True, exist_ok=True)
PROJECTS_DIR.mkdir(parents=True, exist_ok=True)

GRAPHITE_DEEP = (7, 8, 10)      # base surface (matches --background #07080A)
GRAPHITE_MID = (20, 58, 138)    # lighter navy-blue (matches --background-elevated-2 #143A8A)
ACCENT_BLUE = (95, 145, 251)    # accent, vibrant blue #5F91FB
ACCENT_BLUE_DEEP = (8, 19, 87)  # accent-2, deep navy #081357

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
SYS_FONT_DIR = Path("/System/Library/Fonts")

def font(path, size):
    return ImageFont.truetype(str(path), size)

# ---------------------------------------------------------------------------
# 1. Cut the owl mark out of its white background using luminance as alpha.
# ---------------------------------------------------------------------------
src = Image.open(SRC_LOGO).convert("RGB")
gray = src.convert("L")
raw_alpha = ImageOps.invert(gray)  # black mark -> high alpha, white bg -> 0

# Threshold + rescale so near-white background pixels (anti-aliasing noise)
# become fully transparent instead of leaving a faint 1-2% haze everywhere.
THRESHOLD = 10
alpha = raw_alpha.point(lambda v: 0 if v <= THRESHOLD else min(255, int((v - THRESHOLD) * 255 / (255 - THRESHOLD))))

def recolor(rgb):
    layer = Image.new("RGBA", src.size, rgb + (0,))
    layer.putalpha(alpha)
    return layer

mark_black = recolor((10, 8, 16))
mark_white = recolor((255, 255, 255))

def autocrop(im, pad_ratio=0.08):
    bbox = im.getbbox()
    if not bbox:
        return im
    left, top, right, bottom = bbox
    w, h = right - left, bottom - top
    pad = int(max(w, h) * pad_ratio)
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(im.width, right + pad)
    bottom = min(im.height, bottom + pad)
    return im.crop((left, top, right, bottom))

mark_black = autocrop(mark_black)
mark_white = autocrop(mark_white)

mark_black.save(LOGO_DIR / "noctillio-mark-black.png")
mark_white.save(LOGO_DIR / "noctillio-mark-white.png")
print("mark size", mark_white.size)

# ---------------------------------------------------------------------------
# helpers for gradients / glow badges used by favicons + OG image
# ---------------------------------------------------------------------------

def radial_gradient(size, inner, outer, center=None, radius=None):
    w, h = size
    if center is None:
        center = (w / 2, h / 2)
    if radius is None:
        radius = math.hypot(w, h) / 2
    base = Image.new("RGB", size, outer)
    y, x = None, None
    import numpy as np
    xs = np.linspace(0, w - 1, w)
    ys = np.linspace(0, h - 1, h)
    xx, yy = np.meshgrid(xs, ys)
    d = np.sqrt((xx - center[0]) ** 2 + (yy - center[1]) ** 2) / radius
    d = np.clip(d, 0, 1)
    arr = np.zeros((h, w, 3), dtype=np.uint8)
    for c in range(3):
        arr[:, :, c] = (inner[c] * (1 - d) + outer[c] * d).astype("uint8")
    return Image.fromarray(arr, "RGB")


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return mask


def make_badge(px, corner_ratio=0.22, mark_ratio=0.62, rounded=True):
    """A square graphite gradient badge with the white owl mark centered."""
    bg = radial_gradient(
        (px, px), GRAPHITE_MID, GRAPHITE_DEEP,
        center=(px * 0.38, px * 0.32), radius=px * 0.95,
    ).convert("RGBA")
    if rounded:
        mask = rounded_mask((px, px), int(px * corner_ratio))
        canvas = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        canvas.paste(bg, (0, 0), mask)
        bg = canvas
    mw, mh = mark_white.size
    target_w = int(px * mark_ratio)
    target_h = int(target_w * mh / mw)
    mark_resized = mark_white.resize((target_w, target_h), Image.LANCZOS)
    ox = (px - target_w) // 2
    oy = (px - target_h) // 2
    bg.alpha_composite(mark_resized, (ox, oy))
    return bg

# ---------------------------------------------------------------------------
# 2. Favicons / app icons
# ---------------------------------------------------------------------------
icon_512 = make_badge(512, rounded=True)
icon_512.save(PUBLIC / "icon-512.png")

icon_192 = make_badge(192, rounded=True)
icon_192.save(PUBLIC / "icon-192.png")

apple_touch = make_badge(180, rounded=False)  # iOS applies its own mask
apple_touch.convert("RGB").save(PUBLIC / "apple-touch-icon.png")

favicon_sizes = [16, 32, 48]
favicon_imgs = [make_badge(s, corner_ratio=0.28, mark_ratio=0.66).convert("RGBA") for s in favicon_sizes]
favicon_imgs[-1].save(
    PUBLIC / "favicon.ico", format="ICO",
    sizes=[(s, s) for s in favicon_sizes],
)
print("favicons written")

# ---------------------------------------------------------------------------
# 3. OG / social share image (1200x630)
# ---------------------------------------------------------------------------
OG_W, OG_H = 1200, 630
og = radial_gradient((OG_W, OG_H), GRAPHITE_MID, GRAPHITE_DEEP, center=(OG_W * 0.28, OG_H * 0.32), radius=1100).convert("RGBA")

# subtle vignette
vignette = radial_gradient((OG_W, OG_H), (0, 0, 0), GRAPHITE_DEEP, center=(OG_W * 0.28, OG_H * 0.32), radius=1300)
og = Image.blend(og, vignette.convert("RGBA"), 0.15)

draw = ImageDraw.Draw(og)

# faint starfield dots for a "night sky" touch
import random
random.seed(7)
for _ in range(140):
    x = random.randint(0, OG_W)
    y = random.randint(0, OG_H)
    r = random.choice([1, 1, 1, 2])
    a = random.randint(40, 130)
    draw.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, a))

og = og.convert("RGBA")

# owl mark on the left
mw, mh = mark_white.size
mark_h = 360
mark_w = int(mark_h * mw / mh)
mark_resized = mark_white.resize((mark_w, mark_h), Image.LANCZOS)
mark_x, mark_y = 90, (OG_H - mark_h) // 2
og.alpha_composite(mark_resized, (mark_x, mark_y))

draw = ImageDraw.Draw(og)
text_x = mark_x + mark_w + 60

title_font = font(FONT_DIR / "Arial Black.ttf", 74)
tagline_font = font(SYS_FONT_DIR / "SFNSMono.ttf", 30)
small_font = font(SYS_FONT_DIR / "SFNSMono.ttf", 24)

title_y = OG_H // 2 - 120
draw.text((text_x, title_y), "Noctillio AI", font=title_font, fill=(255, 255, 255, 255))

tagline_y = title_y + 95
draw.text((text_x, tagline_y), "Open-source deep learning,", font=tagline_font, fill=(176, 196, 214, 255))
draw.text((text_x, tagline_y + 42), "built in the open at night.", font=tagline_font, fill=(176, 196, 214, 255))

# small pill with project names
pill_y = tagline_y + 110
draw.text((text_x, pill_y), "AutoTimm  ·  NightFlow  ·  and what you build next", font=small_font, fill=ACCENT_BLUE + (255,))

og.convert("RGB").save(PUBLIC / "og-image.png", quality=95)
print("og image written")

# ---------------------------------------------------------------------------
# 4. site.webmanifest
# ---------------------------------------------------------------------------
import json
manifest = {
    "name": "Noctillio AI",
    "short_name": "Noctillio AI",
    "description": "Open-source deep learning tools for image, video and model training.",
    "icons": [
        {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
    ],
    "theme_color": "#07080a",
    "background_color": "#07080a",
    "display": "standalone",
}
(PUBLIC / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n")
print("manifest written")

print("DONE")
