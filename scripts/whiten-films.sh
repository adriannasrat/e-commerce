#!/usr/bin/env bash
# Turns the warm off-white backdrop of the product films pure white.
#
# Reads the untouched films from design-references/film-originals and writes
# to public/local-preview/film, so it can be run again without losing quality.
# Values below 140 are left exactly as they are, which keeps the dark products
# unchanged. Lighter values are lifted to white, each channel from its own
# starting point, which also removes the yellow tint of the backdrop.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

source_dir=design-references/film-originals
target_dir=public/local-preview/film
lift() { echo "if(lt(val,140),val,min(255,140+(val-140)*115/($1-140)))"; }
filter="lutrgb=r='$(lift 194)':g='$(lift 190)':b='$(lift 180)'"

for film in "$source_dir"/*.mp4; do
  name=$(basename "$film" .mp4)
  ffmpeg -v error -y -i "$film" -vf "$filter" \
    -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart -an \
    "$target_dir/$name.mp4"
  ffmpeg -v error -y -i "$source_dir/$name.jpg" -vf "$filter" -q:v 2 "$target_dir/$name.jpg"
  echo "$name"
done
