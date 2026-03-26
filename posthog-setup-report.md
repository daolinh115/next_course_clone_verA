<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `posthog-js` SDK via the `instrumentation-client` pattern (recommended for Next.js 15.3+). Uses a reverse proxy (`/ingest`) for improved reliability, enables exception capture, and turns on debug mode in development.
- **`next.config.ts`** (updated): Added rewrites to proxy PostHog requests through `/ingest`, preventing tracking blockers from intercepting analytics. Added `skipTrailingSlashRedirect: true` to support PostHog's trailing-slash API calls.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_events_clicked')` to the button's click handler, tracking when users engage with the homepage CTA.
- **`components/EventCard.tsx`** (updated): Added `'use client'` directive and `posthog.capture('event_card_clicked', {...})` with rich properties (title, slug, location, date) to track which events users show interest in.
- **`.env.local`** (updated): Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage to scroll to featured events | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to navigate to its detail page (properties: `event_title`, `event_slug`, `event_location`, `event_date`) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/336769/dashboard/1344671)
- **Insight**: [Explore Events Button Clicks](https://us.posthog.com/project/336769/insights/mBKDKKgX) — Daily trend of CTA button clicks
- **Insight**: [Event Card Clicks Over Time](https://us.posthog.com/project/336769/insights/g9CYcSi6) — Daily trend of event card clicks
- **Insight**: [Homepage to Event Detail Funnel](https://us.posthog.com/project/336769/insights/An2CidLC) — Conversion funnel from Explore Events → Event Card Click
- **Insight**: [Most Clicked Events (by slug)](https://us.posthog.com/project/336769/insights/yCuLRxpp) — Which individual events get the most interest
- **Insight**: [Event Clicks by Location](https://us.posthog.com/project/336769/insights/NZuDegHw) — Pie chart of clicks broken down by event location

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
