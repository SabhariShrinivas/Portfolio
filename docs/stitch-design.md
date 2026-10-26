---
name: Kinetic Arcade
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a32'
  surface-container-highest: '#32353d'
  on-surface: '#e0e2ec'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#e0e2ec'
  inverse-on-surface: '#2d3038'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b9c3ff'
  primary: '#b9c3ff'
  on-primary: '#002388'
  primary-container: '#305cff'
  on-primary-container: '#f1f0ff'
  inverse-primary: '#144aef'
  secondary: '#ffb59f'
  on-secondary: '#5f1600'
  secondary-container: '#c93800'
  on-secondary-container: '#ffece7'
  tertiary: '#b6d300'
  on-tertiary: '#2b3400'
  tertiary-container: '#647500'
  on-tertiary-container: '#e0ff49'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb59f'
  on-secondary-fixed: '#3a0a00'
  on-secondary-fixed-variant: '#862200'
  tertiary-fixed: '#d1f029'
  tertiary-fixed-dim: '#b6d300'
  on-tertiary-fixed: '#181e00'
  on-tertiary-fixed-variant: '#404c00'
  background: '#10131a'
  on-background: '#e0e2ec'
  surface-variant: '#32353d'
typography:
  display-hero:
    fontFamily: Bricolage Grotesque
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 70px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system crafts an energetic, tactile, and expressive identity tailored for a senior game developer specializing in dynamic game engines like Unity and Roblox. The design pivots away from clichéd dark-mode cyberpunk neon tropes, scanlines, and hacker terminals. Instead, it draws from high-end arcade hardware, contemporary indie game art direction, and dynamic toy design: physical presence, bold geometry, snappy feedback, and saturated pop surfaces.

The target audience encompasses studio directors, creative leads, indie publishers, and technical recruiters seeking top-tier engineering talent combined with distinctive creative personality. 

### Visual Archetype & Principles
- **Chunky Physicality:** Interface modules behave like physical cartridges, buttons, and tactile hardware units rather than ephemeral flat planes.
- **Graphic Precision:** High-contrast structural framing, crisp solid drop-shadow offsets, and confident borders replace blurry glows and diffuse skeuomorphism.
- **Electric Energy:** Bursts of melon-tangerine and acid-lime energize structured deep-slate chassis containers.
- **Restraint Under the Hood:** While playful, component structures maintain disciplined layout grids, clean hierarchy, and surgical typography so complex technical showcases and game dev breakdowns remain readable and authoritative.

## Colors

The palette is engineered around an arcade dark aesthetic: deep obsidian-slate surfaces paired with intensely saturated, punchy accents that create strong visual hierarchy without luminous neon blur.

### Color Roles & Semantics
- **Neutral Chassis (`#0D1017` Base Ground):** A deep, warm slate-ink black used for outer canvases and foundational sections. Layered with `#161B26` (Surface Level 1) and `#222938` (Surface Level 2 / Interactive Wells) to build architectural depth.
- **Primary (`#305CFF` Electric Cobalt):** The primary navigational anchor. Used for primary hero elements, active states, key tags, and dominant structural highlights.
- **Secondary (`#FF5E2B` Tangerine Melon):** The kinetic action engine. Applied to high-priority interactive triggers, call-to-action buttons, highlighted gameplay stats, and active mechanical indicators.
- **Tertiary (`#D8F832` Vivid Acid Lime):** The precision spark. Used sparingly for status badges, live project flags, technical skill highlights, and high-visibility micro-details.
- **Text & Contrast System:**
  - High Emphasis: `#F4F6FC` (Crisp off-white)
  - Medium Emphasis: `#9CA7C0` (Cool slate gray)
  - Low Emphasis / Outlines: `#333C4E` (Subtle boundary lines)
  - Interactive Invert: Solid `#0D1017` glyphs/labels when laid over Lime or Tangerine pills.

## Typography

The typographic system fuses expressive personality with crisp technical legibility.

- **Headline Font (`Bricolage Grotesque`):** Delivers idiosyncratic, punchy geometric curves that give headlines an irreverent, arcade-grade posture. Large titles use tight tracking and heavy weights (`700` and `800`) to anchor project showcases and hero banners.
- **Body & Label Font (`Space Grotesk`):** Provides a structured, monospace-adjacent geometric rhythm that reads cleanly at speed while honoring technical gaming aesthetics. Used for technical breakdowns, architecture descriptions, code metrics, and labels.
- **Case Conventions:** Major UI labels, section eyebrows, and technical game-stat counters use capitalized tracking (`letterSpacing: 0.05em`) to evoke tactile control panel markings.

## Layout & Spacing

The layout model is governed by a 12-column responsive fluid grid system designed for technical case studies, interactive gameplay preview embeds, and structured project cards.

### Grid & Breakpoints
- **Desktop (1200px+):** 12 columns, max-width `1320px`, outer margins `3rem` (`48px`), column gutters `1.5rem` (`24px`).
- **Tablet (768px – 1199px):** 8 columns, outer margins `2rem` (`32px`), column gutters `1.25rem` (`20px`).
- **Mobile (< 768px):** 4 columns, outer margins `1.25rem` (`20px`), column gutters `1rem` (`16px`).

### Rhythmic Density
- UI spaces operate strictly on a base-4 grid (`4px`, `8px`, `16px`, `24px`, `40px`).
- Containers use compact internal padding (`space-md` to `space-lg`) paired with generous structural separation between major game modules (`space-xl`), giving the portfolio an organized, hardware-console feel.

## Elevation & Depth

Visual hierarchy uses physical, hard-edged graphic depth rather than soft ambient drop shadows or luminous glow effects.

### Structural Hard Drop-Shadows
- Interactive surfaces feature crisp, hard-angled drop shadows: `4px 4px 0px #000000` or tinted variants such as `4px 4px 0px #161B26`.
- Hover and focus states depress elements diagonally along the axis (`transform: translate(2px, 2px)` with shadow reducing to `2px 2px 0px`), creating a responsive mechanical switch feel.
- High-priority interactive elements (e.g. primary secondary-action buttons) use punchy colored drop shadows: `4px 4px 0px #FF5E2B` against dark chassis surfaces.

### Surface Tiering & Framing
- **Canvas Base:** `#0D1017`
- **Chassis Panels (Cards & Modules):** `#161B26` with a solid `2px` border set to `#262F42`.
- **Inner Wells (Media viewports, code stats, and engine telemetry):** Inset `#0E121A` with a crisp `1px` recessed border `#1F2636`.

## Shapes

The design system maintains a tactile, semi-rounded geometric geometry (`0.5rem` / `8px` base corner radius). This avoids harsh brutalist razor edges while keeping interfaces feeling like physical console controllers, handheld cartridges, and arcade buttons.

### Corner Hierarchy
- **Base Components (Inputs, buttons, small chips, badges):** `8px` (`0.5rem` / base radius).
- **Cards, Preview Modules, Modals (`rounded-lg`):** `16px` (`1rem`).
- **Tactile Switch Tracks, Pill Tags, Engine Badges (`rounded-xl`):** `24px` (`1.5rem`) to create full capsule pills when required.

## Components

### Buttons
- **Primary Kinetic Button:** Tangerine Melon (`#FF5E2B`) background with solid dark slate (`#0D1017`) bold typography (`label-lg`), `2px` solid `#0D1017` outline, and a hard `4px 4px 0px #000000` drop shadow. On hover, shifts `translate(2px, 2px)` with shadow reduced to `2px 2px 0px`. On active press, settles flush at `0px 0px 0px`.
- **Secondary Arcade Button:** Electric Cobalt (`#305CFF`) background with crisp off-white text, `2px` solid `#161B26` border, and `4px 4px 0px #0D1017` shadow.
- **Ghost/Chassis Button:** Dark Slate (`#161B26`) fill, `2px` solid `#333C4E` border, off-white text. On hover, border turns into Vivid Acid Lime (`#D8F832`) with text color accent.

### Chips & Badges
- **Engine/Stack Badges (Unity, Roblox, C#, Luau):** Compact capsules (`rounded-xl`) with `#1F2637` fill, `1px` solid `#333C4E`, set in `label-sm`.
- **Active Status Indicator:** Acid Lime (`#D8F832`) pill with dark slate text, paired with an illuminated solid circular status beacon (`6px` dot).

### Cards & Project Showcases
- **Chassis Game Card:** Built on `#161B26` with `2px` solid `#262F42` border, `16px` border-radius, and a solid `6px 6px 0px #000000` offset shadow.
- **Media Inset:** Inner viewport for gameplay clips or stills uses `#0D1017` background with a subtle inset border, framing the content like a monitor bezel.
- **Card Header:** Title in `Bricolage Grotesque` (`headline-sm`) accompanied by platform tags and playtime/engine telemetry metrics.

### Input Fields & Interactive Controls
- **Text Inputs:** Dark recessed surface (`#0E121A`) with `2px` solid `#262F42` border, `Space Grotesk` body text, and placeholder in `#616D86`. On focus, switches border to Electric Cobalt (`#305CFF`) with no soft blurred ring.
- **Checkboxes & Radios:** Chunky square and round hardware switches (`20px × 20px`), `2px` solid `#333C4E` border, filling with Acid Lime (`#D8F832`) and a crisp dark checkmark when selected.

### Playful Track Indicators & Sliders
- Custom metric bars and progress indicators use a physical segmented or chunky track (`height: 10px`, background `#161B26`, border `1px solid #262F42`, fill `#305CFF` or `#D8F832`).
- Sliders feature an oversized circular or pill-shaped mechanical thumb (`24px`) with a high-contrast hard shadow for instant grab affordance.