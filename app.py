"""
Streamlit wrapper for "A Birthday Story Made Just For Her".

This does not reimplement the site in Python — the site is a real
React/Vite app (password lock, animations, gallery, etc.). What this
does is embed the fully-built, self-contained version of that site
(birthday_site.html — every image, the song, the CSS and JS all
inlined) inside a Streamlit page, so it runs anywhere Streamlit runs:
Streamlit Community Cloud, Hugging Face Spaces, your own server, etc.

If you edit the React source (src/) or swap photos/music, rebuild with:
    npm install
    npm run build
    python build_streamlit_bundle.py
then commit the regenerated birthday_site.html.
"""

from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="A Birthday Story Made Just For Her 🎂",
    page_icon="🎂",
    layout="wide",
)

# Streamlit adds its own padding/menu chrome around embedded components —
# trim that so the site fills the page edge-to-edge, and fully remove
# (not just fade) Streamlit's own top toolbar. It sits fixed at the top
# of the page on top of everything, including the embedded site below —
# your site's own top-right language toggle/nav sits in that same corner,
# so clicks there were landing on Streamlit's invisible toolbar instead
# of your button. Hiding it outright (not just making it transparent)
# fixes that.
st.markdown(
    """
    <style>
        .block-container { padding: 0 !important; max-width: 100% !important; }
        header[data-testid="stHeader"] { display: none !important; }
        #MainMenu { visibility: hidden !important; }
        footer { visibility: hidden !important; }
        iframe { display: block; }
    </style>
    """,
    unsafe_allow_html=True,
)

HTML_PATH = Path(__file__).parent / "birthday_site.html"

if not HTML_PATH.exists():
    st.error(
        "birthday_site.html not found. Run `npm run build` then "
        "`python build_streamlit_bundle.py` in this folder, then redeploy."
    )
else:
    html = HTML_PATH.read_text(encoding="utf-8")
    # IMPORTANT: this height must stay close to a normal browser viewport
    # (not the total page length). The site's CSS uses "100vh" ("full
    # screen") in a few places — inside an iframe, "100vh" resolves
    # against THIS number, not the visitor's actual monitor. Setting it
    # too tall (e.g. 9000, to try to avoid a scrollbar) makes every
    # "full screen" photo section stretch to match, blowing photos up
    # far past their real resolution. 900 keeps those sections a normal
    # screen-height size; scrolling=True lets the visitor scroll through
    # the rest of the site inside the frame, same as a normal webpage.
    components.html(html, height=900, scrolling=True)
