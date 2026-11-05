#!/usr/bin/env python3
"""Publish only explicitly packaged, real PDF documents to GitHub Pages.
Accept only the explicitly prepared public-safe bundle; never unpack raw scans.
"""
from pathlib import Path
from zipfile import ZipFile
import json

repo = Path(__file__).resolve().parents[1]
destination = repo / "public" / "assets" / "certificates"
destination.mkdir(parents=True, exist_ok=True)

for archive_name in ("certificate-pdfs.zip",):
    archive = repo / archive_name
    if not archive.exists():
        continue
    with ZipFile(archive) as z:
        for info in z.infolist():
            name = info.filename
            if not name.endswith(".pdf") or name.startswith(".") or "/" in name or "\\\\" in name:
                raise ValueError(f"Unsafe certificate filename: {name}")
            data = z.read(info)
            if not data.startswith(b"%PDF-") or len(data) > 8_000_000:
                raise ValueError(f"Invalid PDF in archive: {name}")
            (destination / name).write_bytes(data)

files = sorted(p.name for p in destination.glob("*.pdf"))
output = repo / "src" / "data" / "certificateAvailability.ts"
output.write_text(
    "// Auto-generated during the GitHub Pages build. Only actually published PDFs are listed.\n"
    + "export const PUBLISHED_CERTIFICATE_PDFS: string[] = "
    + json.dumps(files, ensure_ascii=False, indent=2)
    + ";\n",
    encoding="utf-8"
)
print(f"Published {len(files)} certificate PDFs.")
