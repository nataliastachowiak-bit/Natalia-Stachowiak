#!/usr/bin/env python3
"""Generate smaller WebP images for mobile Safari while retaining the original portraits.

The generated images are build artifacts, not replacements for the original
photos. Safari 14+ supports WebP; <img> remains the fallback for other engines.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    ("public/images/natalia-business-portrait.png", "public/images/natalia-business-portrait", (480, 960)),
    ("public/images/natalia-about-portrait.png", "public/images/natalia-about-portrait", (480, 960)),
]
for source_name, prefix in SOURCES:
    source = ROOT / source_name
    if not source.is_file():
        raise FileNotFoundError(source)
    with Image.open(source) as original:
        rgb = ImageOps.exif_transpose(original).convert("RGB")
        width, height = rgb.size
        for max_width in (480, 960):
            target = ROOT / f"{prefix}-{max_width}.webp"
            scaled = rgb.copy()
            if scaled.width > max_width:
                new_height = max(1, round(scaled.height * max_width / scaled.width))
                scaled = scaled.resize((max_width, new_height), Image.Resampling.LANCZOS)
            scaled.save(target, "WEBP", quality=77, method=6)
            print(f"{target.relative_to(ROOT)} {width}x{height} -> {scaled.width}x{scaled.height}: {target.stat().st_size:,} bytes")
