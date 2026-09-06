# Technical Debt Database

This file tracks technical debt and known gaps encountered during development.
Add entries whenever you find issues that won't be fixed immediately. Entries
are numbered TD-N with Added / Location / Issue / Impact / Proposed Fix /
Severity; newest first.

## Active Items

### TD-001: SEO — hub link-back + head/README gaps (verified 2026-09-06)

**Added**: 2026-09-06 (seo branch)

**Location**: `index.html` (`<head>`), `README.md`, app footer/about surface, favicon

**Issue**: No Open Graph or Twitter card meta tags at all in `index.html`; the
README documents the QR slider range as 500px while the code allows 1024;
the favicon is still the default. The app also has no link back to the
Applicaudia studio hub.

**Impact**: Links shared to the app render with no preview title/description/
image; the stale README slider range misleads users about export size limits;
the app is invisible in the studio's cross-network graph.

**Proposed Fix**:
1. Link back to the Applicaudia hub: add a small footer or about mention
   linking https://applicaudia.se/apps/qrcodie/ (landing page for this app)
   and https://applicaudia.se/home/ (studio directory). The landing pages
   exist and are deployed from the root monorepo.
2. Add og:/twitter: meta (title, description, og:image, og:url,
   twitter:card) to `index.html`.
3. Update the README slider range 500px → 1024px to match the code.
4. Replace the default favicon with a real one.

**Severity**: Low
