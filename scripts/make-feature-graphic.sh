#!/bin/zsh
# Google Play feature graphic (1024x500) in the app palette, rendered by macOS
# Quick Look. Usage from the repo root:
#   scripts/make-feature-graphic.sh feature-graphic-en "Learn Arabic &amp; Quran"
#   scripts/make-feature-graphic.sh feature-graphic-fr "Arabe &amp; Coran"
# Output lands in store/assets/.
# $1 = out name, $2 = tagline. Banner is drawn centred in a 1024 square so
# Quick Look renders 1:1; the square is then cropped to 1024x500.
ROOT=$(cd "$(dirname "$0")/.." && pwd); S=$(mktemp -d)
ICON=$(base64 -i "$ROOT/assets/images/icon.png")
cat > $S/$1.svg <<SVG
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F3F8F4"/><stop offset="1" stop-color="#E6F0E9"/>
    </linearGradient>
    <pattern id="star" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="translate(60 60)">
      <g fill="none" stroke="#C9A23A" stroke-width="1.6" opacity="0.55">
        <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z"/>
        <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" transform="rotate(45 60 60)"/>
        <circle cx="60" cy="60" r="14"/>
      </g>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="white" stop-opacity="0"/>
      <stop offset="0.5" stop-color="white" stop-opacity="0.3"/>
      <stop offset="1" stop-color="white" stop-opacity="1"/>
    </linearGradient>
    <mask id="m"><rect width="1024" height="500" fill="url(#fade)"/></mask>
    <clipPath id="rr"><rect x="88" y="110" width="280" height="280" rx="62"/></clipPath>
  </defs>
  <g transform="translate(0 262)">
    <rect width="1024" height="500" fill="url(#bg)"/>
    <rect width="1024" height="500" fill="url(#star)" mask="url(#m)"/>
    <rect x="94" y="120" width="280" height="280" rx="62" fill="#14261C" opacity="0.10"/>
    <image x="88" y="110" width="280" height="280" clip-path="url(#rr)" xlink:href="data:image/png;base64,$ICON"/>
    <text x="430" y="250" font-family="Helvetica Neue, Helvetica, Arial" font-weight="700" font-size="138" fill="#176340" letter-spacing="-3">Iqra</text>
    <text x="438" y="318" font-family="Helvetica Neue, Helvetica, Arial" font-weight="500" font-size="44" fill="#5C7466">$2</text>
    <rect x="440" y="346" width="72" height="5" rx="2.5" fill="#C9A23A"/>
  </g>
</svg>
SVG
rm -f $S/$1.png $S/$1.svg.png
qlmanage -t -s 1024 -o $S $S/$1.svg >/dev/null 2>&1
sips -c 500 1024 $S/$1.svg.png --out $S/$1.png >/dev/null && rm $S/$1.svg.png
sips -g pixelWidth -g pixelHeight $S/$1.png
mv "$S/$1.png" "$ROOT/store/assets/$1.png"
node "$ROOT/scripts/strip-alpha.cjs" "$ROOT/store/assets/$1.png"
