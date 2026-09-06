#!/usr/bin/env python3
"""
build_streamlit_bundle.py

Turns the built Vite site (dist/) plus the photos and music in public/
into a single self-contained HTML file — birthday_site.html — with
every asset inlined as base64. app.py embeds that file with
st.components.v1.html(), so nothing needs a separate file server.

Run this AFTER `npm run build`, any time you change photos, music, or
code, then commit the regenerated birthday_site.html.

Usage:
    npm run build
    python build_streamlit_bundle.py
"""

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
PUBLIC = ROOT / "public"
OUTPUT = ROOT / "birthday_site.html"


def b64_data_uri(path: Path) -> str:
    mime, _ = mimetypes.guess_type(str(path))
    if mime is None:
        mime = "application/octet-stream"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{data}"


def build_asset_map() -> dict:
    """Maps the runtime path (e.g. /images/photo01.webp) to a data URI,
    for every file under public/images and public/music."""
    asset_map = {}
    for sub in ("images", "music"):
        folder = PUBLIC / sub
        if not folder.exists():
            continue
        for f in sorted(folder.iterdir()):
            if f.is_file() and f.suffix.lower() not in (".txt", ".md"):
                asset_map[f"/{sub}/{f.name}"] = b64_data_uri(f)
    return asset_map


def main():
    if not DIST.exists():
        raise SystemExit("dist/ not found — run `npm run build` first.")

    index_html = (DIST / "index.html").read_text(encoding="utf-8")

    # Inline the built CSS
    def inline_css(match):
        href = match.group(1)
        css_path = DIST / href.lstrip("/")
        css = css_path.read_text(encoding="utf-8")
        return f"<style>{css}</style>"

    index_html = re.sub(
        r'<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>',
        inline_css,
        index_html,
    )

    # Inline the built JS module
    def inline_js(match):
        src = match.group(1)
        js_path = DIST / src.lstrip("/")
        js = js_path.read_text(encoding="utf-8")
        return f'<script type="module">{js}</script>'

    index_html = re.sub(
        r'<script type="module"[^>]*src="([^"]+)"[^>]*></script>',
        inline_js,
        index_html,
    )

    # Build the asset map (images + music as base64) and inject it as a
    # plain script BEFORE the module script, so it's ready by the time
    # the app mounts and looks up window.__ASSET_MAP__.
    asset_map = build_asset_map()
    # json.dumps would also work; manual join keeps the output readable to grep.
    import json

    asset_map_js = (
        "<script>window.__ASSET_MAP__ = "
        + json.dumps(asset_map)
        + ";</script>"
    )
    index_html = index_html.replace("<head>", "<head>\n" + asset_map_js, 1)

    OUTPUT.write_text(index_html, encoding="utf-8")

    total_kb = OUTPUT.stat().st_size / 1024
    print(f"Wrote {OUTPUT.name} ({total_kb:.0f} KB) with {len(asset_map)} inlined assets.")


if __name__ == "__main__":
    main()
