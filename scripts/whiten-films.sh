#!/usr/bin/env bash
# Turns the warm off-white backdrop of the product films pure white, and
# writes each film in two sizes: up to 1280 px wide for larger screens, and
# 720 px wide as name-720w.mp4 for phones. Both are encoded for the web, small
# enough to start quickly, with no sound.
#
# Reads the untouched films from design-references/film-originals and writes
# to public/media/films, so it can be run again without losing quality. Name
# films to encode only those: scripts/whiten-films.sh home-hero
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
target_dir=public/media/films

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

# H.264 plays everywhere. crf sets the quality: higher is smaller, and these
# values keep the studio gradients smooth while staying far below the
# originals' size.
encode=(-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an)

names=("$@")
if [ ${#names[@]} -eq 0 ]; then
  for film in "$source_dir"/*.mp4; do names+=("$(basename "$film" .mp4)"); done
fi

for name in "${names[@]}"; do
  vf=$(filter_for "$name")
  # The filter runs once; its result is scaled to both sizes.
  ffmpeg -v error -y -i "$source_dir/$name.mp4" \
    -filter_complex "[0:v]$vf,format=yuv420p,split=2[large][small];[large]scale='min(1280,iw)':-2[large1280];[small]scale=720:-2[small720]" \
    -map "[large1280]" "${encode[@]}" -crf 27 "$target_dir/$name.mp4" \
    -map "[small720]" "${encode[@]}" -crf 28 "$target_dir/$name-720w.mp4"
  ffmpeg -v error -y -i "$source_dir/$name.jpg" -vf "$vf,scale='min(1280,iw)':-2" -q:v 3 "$target_dir/$name.jpg"
  echo "$name"
done
