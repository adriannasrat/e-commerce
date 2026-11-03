#!/usr/bin/env bash
# One-time helper for recording the approved design and backend foundation.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

mode="${1:---preview}"
if [[ "$#" -gt 1 || ( "$mode" != "--preview" && "$mode" != "--apply" ) ]]; then
  echo "Usage: bash scripts/commit-current-work.sh [--preview|--apply]" >&2
  exit 1
fi
if ! git diff --cached --quiet; then
  echo "Staged changes exist. Review and commit or unstage them before running this helper." >&2
  exit 1
fi
if [[ "$mode" == "--apply" ]]; then
  git var GIT_AUTHOR_IDENT >/dev/null
  git var GIT_COMMITTER_IDENT >/dev/null
fi

commit_group() {
  local message="$1"
  shift
  printf '\n%s\n' "$message"
  if [[ "$mode" == "--preview" ]]; then
    printf '  %s\n' "$@"
    return
  fi
  git add -- "$@"
  if git diff --cached --quiet; then
    echo "No remaining changes in this group; skipped."
    return
  fi
  git diff --cached --check
  git diff --cached --stat
  git commit -m "$message"
}

for file in .gitignore src/features/storefront-preview/theme.js src/features/storefront-preview/headphoneImages.js src/features/storefront-preview/products.js src/features/storefront-preview/HeadphoneImage.js src/features/storefront-preview/ProductPlaceholder.js src/features/storefront-preview/ScrollReveal.js src/features/storefront-preview/ScrollReveal.test.js src/features/storefront-preview/scroll-reveal.css src/features/storefront-preview/usePreviewRoute.js src/features/storefront-preview/usePreviewRoute.test.js src/features/storefront-preview/useStoryGallery.js src/features/storefront-preview/useStoryGallery.test.js src/features/storefront-preview/StorefrontLink.js src/features/storefront-preview/storefront-link.css src/features/storefront-preview/savedProducts.js src/features/storefront-preview/PreviewHero.js src/features/storefront-preview/HeroProductInfo.js src/features/storefront-preview/HeadphonePicker.js src/features/storefront-preview/ProductVisual.js src/features/storefront-preview/HeroCategoryPicker.js src/features/storefront-preview/hero-category-picker.css src/features/storefront-preview/gallery.css src/features/storefront-preview/preview.css src/features/storefront-preview/HeadphoneCollection.js src/features/storefront-preview/collection.css src/features/storefront-preview/ListeningStories.js src/features/storefront-preview/listening-stories.css src/features/storefront-preview/listening-story-data.js src/features/storefront-preview/ProductShowcase.js src/features/storefront-preview/product-showcase.css src/features/storefront-preview/ProductShowcase.test.js src/features/storefront-preview/bag/BagPage.js src/features/storefront-preview/bag/BagPanel.js src/features/storefront-preview/bag/BagProfileLinks.js src/features/storefront-preview/bag/bag.css src/features/storefront-preview/bag/bagState.js src/features/storefront-preview/bag/bagState.test.js src/features/storefront-preview/bag/usePreviewBag.js src/features/storefront-preview/recommendations/AddedToBag.js src/features/storefront-preview/recommendations/RecommendationCard.js src/features/storefront-preview/recommendations/recommendations.css src/features/storefront-preview/ProductDetail.js src/features/storefront-preview/ProductDetail.test.js src/features/storefront-preview/ProductInformation.js src/features/storefront-preview/ProductPurchaseOptions.js src/features/storefront-preview/RelatedProducts.js src/features/storefront-preview/product-detail.css src/features/storefront-preview/auth/SignInPage.js src/features/storefront-preview/auth/AuthForm.js src/features/storefront-preview/auth/sign-in.css src/index.js src/features/storefront-preview/StorefrontPreview.js src/features/storefront-preview/PreviewHeader.js src/features/storefront-preview/PreviewMenu.js src/features/storefront-preview/PreviewActionDialog.js src/features/storefront-preview/MenuGlyph.js src/features/storefront-preview/menu-glyph.css src/features/storefront-preview/navigation.css src/features/storefront-preview/navigationLinks.js src/features/storefront-preview/auth/SignInPage.test.js src/features/storefront-preview/bag/BagFlow.test.js src/features/storefront-preview/recommendations/AddedToBag.test.js docs/DESIGN_PREVIEW.md backend/app.js backend/server.js backend/config/environment.js backend/config/database.js backend/config/databaseConfig.js backend/models/User.js backend/models/Product.js backend/models/Cart.js backend/models/CartRow.js backend/models/Rating.js backend/services/cartService.js backend/tests/app.test.js backend/tests/environment.test.js backend/tests/server.test.js package.json docs/BACKEND_DEVELOPMENT.md docs/PROJECT_PLAN.md docs/COMMIT_PLAN.md scripts/commit-current-work.sh; do
  if [[ ! -f "$file" ]]; then
    printf "Required file missing: %s\n" "$file" >&2
    exit 1
  fi
done

commit_group 'feat(preview): add storefront foundations and image components' \
  .gitignore \
  src/features/storefront-preview/theme.js \
  src/features/storefront-preview/headphoneImages.js \
  src/features/storefront-preview/products.js \
  src/features/storefront-preview/HeadphoneImage.js \
  src/features/storefront-preview/ProductPlaceholder.js \
  src/features/storefront-preview/ScrollReveal.js \
  src/features/storefront-preview/ScrollReveal.test.js \
  src/features/storefront-preview/scroll-reveal.css \
  src/features/storefront-preview/usePreviewRoute.js \
  src/features/storefront-preview/usePreviewRoute.test.js \
  src/features/storefront-preview/useStoryGallery.js \
  src/features/storefront-preview/useStoryGallery.test.js \
  src/features/storefront-preview/StorefrontLink.js \
  src/features/storefront-preview/storefront-link.css \
  src/features/storefront-preview/savedProducts.js

commit_group 'feat(preview): add headphone hero and category selectors' \
  src/features/storefront-preview/PreviewHero.js \
  src/features/storefront-preview/HeroProductInfo.js \
  src/features/storefront-preview/HeadphonePicker.js \
  src/features/storefront-preview/ProductVisual.js \
  src/features/storefront-preview/HeroCategoryPicker.js \
  src/features/storefront-preview/hero-category-picker.css \
  src/features/storefront-preview/gallery.css \
  src/features/storefront-preview/preview.css

commit_group 'feat(preview): add collection and listening stories' \
  src/features/storefront-preview/HeadphoneCollection.js \
  src/features/storefront-preview/collection.css \
  src/features/storefront-preview/ListeningStories.js \
  src/features/storefront-preview/listening-stories.css \
  src/features/storefront-preview/listening-story-data.js \
  src/features/storefront-preview/ProductShowcase.js \
  src/features/storefront-preview/product-showcase.css \
  src/features/storefront-preview/ProductShowcase.test.js

commit_group 'feat(preview): add persistent demo bag and recommendations' \
  src/features/storefront-preview/bag/BagPage.js \
  src/features/storefront-preview/bag/BagPanel.js \
  src/features/storefront-preview/bag/BagProfileLinks.js \
  src/features/storefront-preview/bag/bag.css \
  src/features/storefront-preview/bag/bagState.js \
  src/features/storefront-preview/bag/bagState.test.js \
  src/features/storefront-preview/bag/usePreviewBag.js \
  src/features/storefront-preview/recommendations/AddedToBag.js \
  src/features/storefront-preview/recommendations/RecommendationCard.js \
  src/features/storefront-preview/recommendations/recommendations.css

commit_group 'feat(preview): add product details and saved models' \
  src/features/storefront-preview/ProductDetail.js \
  src/features/storefront-preview/ProductDetail.test.js \
  src/features/storefront-preview/ProductInformation.js \
  src/features/storefront-preview/ProductPurchaseOptions.js \
  src/features/storefront-preview/RelatedProducts.js \
  src/features/storefront-preview/product-detail.css

commit_group 'feat(preview): add shared sign-in and sign-up design' \
  src/features/storefront-preview/auth/SignInPage.js \
  src/features/storefront-preview/auth/AuthForm.js \
  src/features/storefront-preview/auth/sign-in.css

commit_group 'feat(preview): connect storefront navigation and shopping flows' \
  src/index.js \
  src/features/storefront-preview/StorefrontPreview.js \
  src/features/storefront-preview/PreviewHeader.js \
  src/features/storefront-preview/PreviewMenu.js \
  src/features/storefront-preview/PreviewActionDialog.js \
  src/features/storefront-preview/MenuGlyph.js \
  src/features/storefront-preview/menu-glyph.css \
  src/features/storefront-preview/navigation.css \
  src/features/storefront-preview/navigationLinks.js \
  src/features/storefront-preview/auth/SignInPage.test.js \
  src/features/storefront-preview/bag/BagFlow.test.js \
  src/features/storefront-preview/recommendations/AddedToBag.test.js

commit_group 'docs: record storefront design and preview behavior' \
  docs/DESIGN_PREVIEW.md

commit_group 'refactor(api): separate app setup from server startup' \
  backend/app.js \
  backend/server.js \
  backend/config/environment.js \
  backend/config/database.js \
  backend/config/databaseConfig.js \
  backend/models/User.js \
  backend/models/Product.js \
  backend/models/Cart.js \
  backend/models/CartRow.js \
  backend/models/Rating.js \
  backend/services/cartService.js \
  backend/tests/app.test.js \
  backend/tests/environment.test.js \
  backend/tests/server.test.js \
  package.json \
  docs/BACKEND_DEVELOPMENT.md

commit_group 'docs: align backend delivery plan with agreed schema' \
  docs/PROJECT_PLAN.md \
  docs/COMMIT_PLAN.md \
  scripts/commit-current-work.sh

if [[ "$mode" == "--apply" ]]; then
  echo "Commit groups complete. Remaining changes:"
  git status --short
else
  echo "Preview only. No files staged or committed. Use --apply to create these commits."
fi
