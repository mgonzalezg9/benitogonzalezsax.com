# Types and Validation Playbook

Use this lens when changing interfaces, data structures, or shared rendering contracts.

Focus on:
- `LandingPageData` compatibility
- `LocationEntry` compatibility
- prop consistency across `Landing*` components
- i18n structural parity where applicable
- schema generation consuming the right data

Validation steps:
- run `npm run build`
- check for missing assets or broken imports
- verify anchor-driven sections still map to real IDs

Notes:
- there is no configured lint or test suite
- build validation is the main automated safety net
