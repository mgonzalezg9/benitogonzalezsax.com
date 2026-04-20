# Correctness Review Playbook

Use this lens when a feature looks complete and needs a final sanity check.

Focus on:
- whether labels match behavior
- whether nav items point to the right anchors
- whether visible content matches metadata and schema
- whether city names, service claims, and contact details are consistent
- whether Spanish and English counterparts drift
- whether FAQ, SEO, and CTA wording match what the UI actually does

Key project context:
- Spanish homepage and city pages use the wedding landing system
- English homepage uses a different component set
- route equivalence is handled through `src/i18n/routes.ts`

Expected review output:
- user-visible mismatches first
- then SEO/canonical/schema mismatches
