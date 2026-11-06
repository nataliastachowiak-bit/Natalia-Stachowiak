#!/usr/bin/env python3
"""Publish only explicitly packaged, real PDF documents to GitHub Pages.
Accept only the approved public-safe PDF bundles; never unpack raw scans.
"""
from pathlib import Path
from zipfile import ZipFile
import base64
import binascii
import hashlib
import json

repo = Path(__file__).resolve().parents[1]
destination = repo / "public" / "assets" / "certificates"
destination.mkdir(parents=True, exist_ok=True)

for archive_name in ("certificate-pdfs.zip", "telc-b2-portfolio.zip"):
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

# Verified original edX certificates, staged as base64 text because the
# connected GitHub contents API accepts text rather than binary attachments.
# Hashes protect against accidentally publishing a different or altered PDF.
staged_certificates = {
    "edx-HP-AI-Strategy.pdf": "98e86d882068",
    "edx-Microsoft-AI-Foundations.pdf": "e8cd2c4402a0",
}
for pdf_name, expected_hash_prefix in staged_certificates.items():
    staged_path = repo / "certificate-uploads" / (pdf_name + ".base64")
    if not staged_path.is_file():
        raise FileNotFoundError(f"Missing verified certificate upload: {staged_path.name}")
    try:
        data = base64.b64decode(staged_path.read_text(encoding="ascii").strip(), validate=True)
    except (ValueError, binascii.Error) as exc:
        raise ValueError(f"Invalid certificate encoding: {pdf_name}") from exc
    if not data.startswith(b"%PDF-") or not (1000 <= len(data) <= 8_000_000):
        raise ValueError(f"Invalid certificate PDF: {pdf_name}")
    if not hashlib.sha256(data).hexdigest().startswith(expected_hash_prefix):
        raise ValueError(f"Unexpected original certificate PDF checksum: {pdf_name}")
    (destination / pdf_name).write_bytes(data)

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
