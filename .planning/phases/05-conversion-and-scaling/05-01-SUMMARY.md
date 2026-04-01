---
phase: 05-conversion-and-scaling
plan: 01
subsystem: Conversion Optimization
tags: [calendly, booking, bottom-of-funnel, dry]
requirements: [SITE-05]
tech-stack: [Next.js, TypeScript, Calendly]
key-files: [templates/src/components/BookingWidget.tsx, templates/src/lib/usePersonalization.ts, templates/src/app/*/page.tsx]
decisions:
  - Implemented a reusable `BookingWidget` to standardize meeting scheduling across all niches.
  - Linked hero section CTAs directly to the booking section to increase conversion intent.
  - Made the booking URL dynamically configurable via URL parameters for full control over scheduling links per campaign.
metrics:
  duration: 2h
  completed_date: "2026-04-01"
  tasks: 3/3
---

# Phase 05 Plan 01: Direct Meeting Booking Summary

## Substantive One-liner
Maximized lead conversion potential by integrating a standardized booking engine across all 30+ site templates and optimizing the hero-to-booking user journey.

## Key Accomplishments
- **Reusable Booking Component**: Created `BookingWidget.tsx` featuring a clean, responsive Calendly inline embed and conversion-focused value propositions.
- **Dynamic Scheduling**: Updated the core personalization engine to support custom `booking_url` parameters, allowing for different sales reps or booking types per outreach batch.
- **Platform-wide Integration**: Successfully refactored every niche template (aqua, aura, titan, etc.) to include the new booking section, ensuring a consistent bottom-of-funnel experience.
- **Optimized User Flow**: Transitioned all hero section CTA buttons from simple phone links to internal anchors (`#book`), guiding leads directly to the conversion point.

## Deviations from Plan
- **Template Selector Logic**: Some templates required manual fine-tuning during the batch refactor to preserve unique styling or span injections while adding the widget.

## Known Stubs
- **Booking Attribution**: Currently relying on lead names in Calendly. Future enhancements could include passing lead IDs directly into the Calendly pre-fill fields.

## Self-Check: PASSED
- `BookingWidget` renders correctly with dynamic business names.
- Hero buttons successfully scroll to the `#book` section.
- Fallback booking URL works when no parameter is provided.
