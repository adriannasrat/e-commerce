# Commit the design separately from the backend foundation

Git writes were blocked in the editing session. No commits were created there.
Run these commands from the repository root in your own terminal. Start with an
empty staging area (`git diff --cached --stat`) so unrelated changes are not included.
Review the staged changes before each commit. Do not use `git add .` for this split.
The reference images and local preview photography stay ignored.

The design already exists as a substantial uncommitted feature. These groups record
its dependencies first and enable `/preview` only once all components are present.
The integration tests are included with the wiring they import.

## Run all groups with one command

From the repository root, run `bash scripts/commit-current-work.sh` to preview the
file groups, or `bash scripts/commit-current-work.sh --apply` to create the commits.
The script requires an empty staging area, stops on errors, skips groups with no
remaining changes, and never pushes. If a commit fails after staging, review and
complete that commit manually before rerunning the script. Images are excluded by
explicit file lists. The commands below remain available for manual use.

## 1. Shared preview foundations

```sh
p=src/features/storefront-preview
git add .gitignore "$p/theme.js" "$p/headphoneImages.js" "$p/products.js" "$p/HeadphoneImage.js" "$p/ProductPlaceholder.js" "$p/ScrollReveal.js" "$p/ScrollReveal.test.js" "$p/scroll-reveal.css" "$p/usePreviewRoute.js" "$p/usePreviewRoute.test.js" "$p/useStoryGallery.js" "$p/useStoryGallery.test.js" "$p/StorefrontLink.js" "$p/storefront-link.css" "$p/savedProducts.js"
git diff --cached --stat
git commit -m "feat(preview): add storefront foundations and image components"
```

## 2. Hero and product selectors

```sh
git add "$p/PreviewHero.js" "$p/HeroProductInfo.js" "$p/HeadphonePicker.js" "$p/ProductVisual.js" "$p/HeroCategoryPicker.js" "$p/hero-category-picker.css" "$p/gallery.css" "$p/preview.css"
git diff --cached --stat
git commit -m "feat(preview): add headphone hero and category selectors"
```

## 3. Collection and editorial sections

```sh
git add "$p/HeadphoneCollection.js" "$p/collection.css" "$p/ListeningStories.js" "$p/listening-stories.css" "$p/listening-story-data.js" "$p/ProductShowcase.js" "$p/product-showcase.css" "$p/ProductShowcase.test.js"
git diff --cached --stat
git commit -m "feat(preview): add collection and listening stories"
```

## 4. Demo bag and recommendations

```sh
git add "$p/bag/BagPage.js" "$p/bag/BagPanel.js" "$p/bag/BagProfileLinks.js" "$p/bag/bag.css" "$p/bag/bagState.js" "$p/bag/bagState.test.js" "$p/bag/usePreviewBag.js" "$p/recommendations/AddedToBag.js" "$p/recommendations/RecommendationCard.js" "$p/recommendations/recommendations.css"
git diff --cached --stat
git commit -m "feat(preview): add persistent demo bag and recommendations"
```

## 5. Product detail view

```sh
git add "$p/ProductDetail.js" "$p/ProductDetail.test.js" "$p/ProductInformation.js" "$p/ProductPurchaseOptions.js" "$p/RelatedProducts.js" "$p/product-detail.css"
git diff --cached --stat
git commit -m "feat(preview): add product details and saved models"
```

## 6. Account form design

```sh
git add "$p/auth/SignInPage.js" "$p/auth/AuthForm.js" "$p/auth/sign-in.css"
git diff --cached --stat
git commit -m "feat(preview): add shared sign-in and sign-up design"
```

## 7. Navigation and preview integration

```sh
git add src/index.js "$p/StorefrontPreview.js" "$p/PreviewHeader.js" "$p/PreviewMenu.js" "$p/PreviewActionDialog.js" "$p/MenuGlyph.js" "$p/menu-glyph.css" "$p/navigation.css" "$p/navigationLinks.js" "$p/auth/SignInPage.test.js" "$p/bag/BagFlow.test.js" "$p/recommendations/AddedToBag.test.js"
git diff --cached --stat
git commit -m "feat(preview): connect storefront navigation and shopping flows"
```

## 8. Design documentation

```sh
git add docs/DESIGN_PREVIEW.md
git diff --cached --stat
git commit -m "docs: record storefront design and preview behavior"
```

## 9. Backend foundation (separate from the design)

```sh
git add backend/app.js backend/server.js backend/config/environment.js backend/config/database.js backend/config/databaseConfig.js backend/models/User.js backend/models/Product.js backend/models/Cart.js backend/models/CartRow.js backend/models/Rating.js backend/services/cartService.js backend/tests/app.test.js backend/tests/environment.test.js backend/tests/server.test.js package.json docs/BACKEND_DEVELOPMENT.md
git diff --cached --stat
git commit -m "refactor(api): separate app setup from server startup"
```

## 10. Record the accepted delivery plan

```sh
git add docs/PROJECT_PLAN.md docs/COMMIT_PLAN.md scripts/commit-current-work.sh
git diff --cached --stat
git commit -m "docs: align backend delivery plan with agreed schema"
git status --short
```

The existing design is split into eight commits by responsibility. Existing
frontend behavior was tested together before splitting; the intermediate commits
have not each been built in an isolated checkout. Future changes should be developed
and verified one focused commit at a time.
