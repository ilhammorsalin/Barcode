# Barcode Food Junction

## Mission
Create implementation-ready, token-driven UI guidance for Barcode Food Junction that captures a high-end food hub identity, optimized for consistency, accessibility, and fast delivery across the consumer-facing web platform.

## Brand
- Product/brand: Barcode Food Junction
- URL: https://facebook.com/
- Audience: food lovers, families, and casual diners seeking hygienic, authentic local and continental food experiences
- Product surface: consumer-facing food ordering, menu browsing, and restaurant information website

## Style Foundations
- Visual style: clean, structural, bold, modern food-hall layout inspired by industrial textures and premium casual dining
- Main font style: `font.family.primary=Helvetica Neue`, `font.family.stack=Helvetica Neue, Arial, system-ui, -apple-system, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=15px`, `font.size.lg=16px`, `font.size.xl=18px`, `font.size.2xl=20px`, `font.size.3xl=24px`, `font.size.4xl=36px`
- Color palette: `color.text.primary=#111111`, `color.text.secondary=#fbfbfb`, `color.text.tertiary=#ffffff`, `color.text.inverse=#8a8a8a`, `color.surface.base=#ffffff`, `color.surface.muted=#f4f4f4`, `color.brand.accent=#e52d2d`
- Spacing scale: `space.1=4px`, `space.2=6px`, `space.3=8px`, `space.4=10px`, `space.5=12px`, `space.6=16px`, `space.7=18px`, `space.8=20px`
- Radius/shadow/motion tokens: `radius.xs=0px`, `radius.sm=4px`, `radius.md=8px` | `shadow.none=none`, `shadow.sm=0 1px 2px rgb(17 17 17 / 8%)`, `shadow.md=0 8px 24px rgb(17 17 17 / 12%)` | `motion.duration.instant=150ms`, `motion.duration.fast=300ms`, `motion.duration.normal=500ms`, `motion.duration.slow=1000ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Direct, energetic, street-smart, transparent, and focused on quality and hygiene.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Use `color.brand.accent` for priority actions, active navigation, hot offers, and small freshness cues.
- Use sharp structural dividers, barcode-inspired line rhythm, and disciplined grid alignment to create the food-hall identity.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.
- Food, hygiene, availability, pricing, and delivery information must be stated clearly before a user commits to an order.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.
- Do not overuse red; reserve `color.brand.accent` for decisions, urgency, selection, and brand moments.
- Do not use decorative industrial textures behind body copy unless contrast remains WCAG 2.2 AA compliant.
- Do not hide key food details such as price, portion, availability, allergens, or hygiene cues.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include menu item rules for price, image, category, availability, dietary notes, spice level, and add-to-cart behavior.
- Include restaurant information rules for hours, location, contact, hygiene positioning, and service availability.
- Include ordering flow rules for cart, quantity controls, delivery or pickup choice, checkout validation, and order confirmation.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
- Core ordering paths must remain usable with keyboard only, screen reader output, reduced motion, and 320px mobile viewport width.
