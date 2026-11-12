#!/usr/bin/env bash
# Turns the warm off-white backdrop of the product films pure white.
#
# Reads the untouched films from design-references/film-originals and writes
# to public/local-preview/film, so it can be run again without losing quality.
#
# One filter pass, per pixel:
# 1. Light tones lose their colour cast: between brightness 140 and 180 they
#    are blended towards neutral grey. The products are grey and black, and
#    anything darker than 140 is left exactly as it is.
# 2. Light tones are lifted to white, every channel from the same point.
# 3. Edges are faded to white. The studio light drifts, so patches of shade
#    pass through the corners and sides, some as dark as the products. Only
#    areas the product never reaches are faded: the limits per film come from
#    measuring how close the product gets to each edge.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

source_dir=design-references/film-originals
target_dir=public/local-preview/film

# Sides fully white within $1 of the frame width, fading out by $2; corners
# fully white beyond radius $4 of the centred ellipse, from $3. $5 limits the
# fade to the first seconds, before close-ups reach the edges.
filter() {
  local luma='(0.299*r(X,Y)+0.587*g(X,Y)+0.114*b(X,Y))'
  local neutral="clip(($luma-140)/40,0,1)"
  local side="clip(($2-min(X,W-X)/W)/($2-$1),0,1)"
  local corner="clip((hypot((X-W/2)/(W/2),(Y-H/2)/(H/2))-$3)/($4-$3),0,1)"
  local edge="max($side,$corner)*lt(T,$5)"
  local expr=() channel
  for channel in r g b; do
    local calm="($channel(X,Y)+($luma-$channel(X,Y))*$neutral)"
    local lifted="if(lt($calm,140),$calm,min(255,140+($calm-140)*115/46))"
    expr+=("$lifted+(255-$lifted)*$edge")
  done
  echo "format=gbrp,geq=r='${expr[0]}':g='${expr[1]}':b='${expr[2]}'"
}

filter_for() {
  case "$1" in
    # Over-ear: the product stays at least 26 % from the sides.
    home-hero | form-orbit) filter 0.08 0.22 1.0 1.2 999 ;;
    # Close-ups begin at 10.09 s and fill the frame from then on.
    form-film) filter 0.08 0.22 1.0 1.2 10.05 ;;
    # In-ear: the buds come within 10 % of the left edge.
    pocket-film | pocket-orbit) filter 0.02 0.08 0.95 1.15 999 ;;
    # Close-ups throughout: the dark edges are the product itself.
    *) filter 0 0.0001 9 10 0 ;;
  esac
}

for film in "$source_dir"/*.mp4; do
  name=$(basename "$film" .mp4)
  vf=$(filter_for "$name")
  ffmpeg -v error -y -i "$film" -vf "$vf" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart -an \
    "$target_dir/$name.mp4"
  ffmpeg -v error -y -i "$source_dir/$name.jpg" -vf "$vf" -q:v 2 "$target_dir/$name.jpg"
  echo "$name"
done
