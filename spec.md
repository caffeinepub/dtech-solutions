# DTech Solutions

## Current State
- Full site with hero, services, testimonials, booking form, and admin dashboard at /admin.
- Admin dashboard is password-protected and shows a Repair Dashboard table of service requests.
- Contact info (address, phone, email, hours) is hardcoded in HomePage.tsx.

## Requested Changes (Diff)

### Add
- A "Business Info" tab inside the admin dashboard (alongside the existing Repair Dashboard tab).
- A form in the Business Info tab to edit: Address, Phone, Email, Opening Hours.
- A shared `useBusinessInfo` hook that reads/writes business info to `localStorage` with the current DTech Solutions values as defaults.

### Modify
- AdminPage.tsx: add tab navigation between "Repair Dashboard" and "Business Info"; add the editor form.
- HomePage.tsx: replace hardcoded contact fields (address, phone, email, hours in the Contact section and Footer) with values from the `useBusinessInfo` hook.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/hooks/useBusinessInfo.ts` -- exports a hook returning `{ info, updateInfo }` backed by localStorage, with DTech defaults.
2. Update `AdminPage.tsx` to add tab UI (shadcn Tabs) with "Repair Dashboard" and "Business Info" panels; add the editor form in the Business Info panel with Save button that calls `updateInfo`.
3. Update `HomePage.tsx` to call `useBusinessInfo()` and use the returned values in the Contact section and Footer instead of hardcoded strings.
4. Validate (typecheck + build), fix any errors, then deploy.
