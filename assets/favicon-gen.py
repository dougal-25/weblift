#!/usr/bin/env python3
"""Generate raster favicon fallbacks (.png / .ico) from the logo mark.

The canonical favicon is assets/favicon.svg (SVG-only, fine for modern
browsers). Old browsers and iOS apple-touch-icon need raster fallbacks, so
this script rasterises the *same* geometry — navy gradient rounded square +
white "lift" arrow — at a few sizes. No third-party deps: pixels are drawn by
hand and written as PNG via stdlib zlib; the .ico embeds PNG entries.

Re-run if the logo colours/shape change:  python3 assets/favicon-gen.py
"""
import math
import struct
import zlib
from pathlib import Path

# --- geometry, in the SVG's 224x224 viewBox coordinate space ---------------
RECT_CENTER = (112.0, 112.0)
RECT_HALF = 96.0          # x/y 16..208
RECT_RADIUS = 48.0
ARROW = [(112, 44), (182, 124), (147, 124), (147, 188),
         (77, 188), (77, 124), (42, 124)]
C0 = (27, 63, 135)        # #1B3F87  (gradient start, top-left)
C1 = (19, 48, 107)        # #13306B  (gradient end, bottom-right)
WHITE = (255, 255, 255)
VIEW = 224.0
SS = 4                    # supersampling factor per axis (antialiasing)

HERE = Path(__file__).resolve().parent


def _rounded_rect_inside(x, y):
    qx = abs(x - RECT_CENTER[0]) - (RECT_HALF - RECT_RADIUS)
    qy = abs(y - RECT_CENTER[1]) - (RECT_HALF - RECT_RADIUS)
    d = math.hypot(max(qx, 0.0), max(qy, 0.0)) - RECT_RADIUS
    return d <= 0.0


def _in_polygon(x, y, poly):
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if (yi > y) != (yj > y):
            xint = (xj - xi) * (y - yi) / (yj - yi) + xi
            if x < xint:
                inside = not inside
        j = i
    return inside


def _gradient(x, y):
    # objectBoundingBox gradient from (0,0)->(1,1): t = (u+v)/2
    u = (x - (RECT_CENTER[0] - RECT_HALF)) / (2 * RECT_HALF)
    v = (y - (RECT_CENTER[1] - RECT_HALF)) / (2 * RECT_HALF)
    t = max(0.0, min(1.0, (u + v) / 2.0))
    return tuple(round(a + (b - a) * t) for a, b in zip(C0, C1))


def render(size):
    """Return raw RGBA bytes for a size x size icon (supersampled)."""
    scale = VIEW / size
    rows = bytearray()
    for py in range(size):
        for px in range(size):
            r = g = b = a = 0.0
            for sy in range(SS):
                for sx in range(SS):
                    x = (px + (sx + 0.5) / SS) * scale
                    y = (py + (sy + 0.5) / SS) * scale
                    if not _rounded_rect_inside(x, y):
                        continue
                    if _in_polygon(x, y, ARROW):
                        cr, cg, cb = WHITE
                    else:
                        cr, cg, cb = _gradient(x, y)
                    r += cr
                    g += cg
                    b += cb
                    a += 255.0
            n = SS * SS
            if a > 0:
                # premultiplied-safe average over covered subsamples
                cov = a / n / 255.0
                rows += bytes((round(r / (a / 255.0)),
                               round(g / (a / 255.0)),
                               round(b / (a / 255.0)),
                               round(cov * 255)))
            else:
                rows += b"\x00\x00\x00\x00"
    return bytes(rows)


def _png_bytes(rgba, size):
    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    raw = bytearray()
    stride = size * 4
    for y in range(size):
        raw.append(0)  # filter type 0 (None)
        raw += rgba[y * stride:(y + 1) * stride]
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return (sig + chunk(b"IHDR", ihdr)
            + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
            + chunk(b"IEND", b""))


def write_png(path, size):
    path.write_bytes(_png_bytes(render(size), size))
    print(f"wrote {path.name} ({size}x{size})")


def write_ico(path, sizes):
    pngs = [(s, _png_bytes(render(s), s)) for s in sizes]
    header = struct.pack("<HHH", 0, 1, len(pngs))
    offset = 6 + 16 * len(pngs)
    entries = bytearray()
    body = bytearray()
    for s, data in pngs:
        entries += struct.pack("<BBBBHHII",
                               s if s < 256 else 0, s if s < 256 else 0,
                               0, 0, 1, 32, len(data), offset)
        offset += len(data)
        body += data
    path.write_bytes(header + bytes(entries) + bytes(body))
    print(f"wrote {path.name} ({', '.join(str(s) for s in sizes)})")


if __name__ == "__main__":
    write_png(HERE / "favicon-32.png", 32)
    write_png(HERE / "favicon-180.png", 180)  # apple-touch-icon
    write_ico(HERE / "favicon.ico", [16, 32, 48])
