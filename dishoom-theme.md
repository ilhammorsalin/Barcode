# Dishoom

## Mission
Create implementation-ready, token-driven UI guidance for Dishoom that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: Dishoom
- URL: https://www.dishoom.com/
- Audience: readers and knowledge seekers
- Product surface: documentation site

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=cheltenhamBT`, `font.family.stack=cheltenhamBT, cheltenhamBT Fallback, ui-serif, Georgia, Cambria, Times New Roman, Times, serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=15px`, `font.size.lg=16px`, `font.size.xl=18px`, `font.size.2xl=20px`, `font.size.3xl=21px`, `font.size.4xl=30px`
- Color palette: `color.text.primary=#353839`, `color.text.secondary=#fffdf9`, `color.text.tertiary=#ffffff`, `color.text.inverse=#c4bfaf`, `color.surface.base=#000000`, `color.surface.muted=#f0ece0`
- Spacing scale: `space.1=4px`, `space.2=6px`, `space.3=8px`, `space.4=10px`, `space.5=12px`, `space.6=16px`, `space.7=18px`, `space.8=20px`
- Radius/shadow/motion tokens: `radius.xs=2px`, `radius.sm=4px`, `radius.md=9999px` | `motion.duration.instant=150ms`, `motion.duration.fast=300ms`, `motion.duration.normal=500ms`, `motion.duration.slow=1000ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

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
- Include known page component density: links (249), buttons (82), lists (75), inputs (13), cards (7), navigation (7).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
