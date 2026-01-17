# ORION Showcase

A read-only, cinematic portfolio experience showcasing the ORION Enterprise Operations Platform.

## Overview

This is a museum-grade web exhibit of a 40,000-line enterprise platform built in 40 days. The showcase presents the architecture, logic, and governance systems of ORION without any functional backend.

## Sections

1. **GOD VIEW** - Landing with animated KPI metrics
2. **System Map** - Module architecture visualization
3. **Rebuttal Sanctum** - Case workflow read-only walkthrough
4. **RACI Governance** - Approval matrices and accountability
5. **AI Intelligence** - Classification and tokenization display
6. **Excel Altar** - Unified data table visualization
7. **Admin Throne** - Feature flags and guardrails

## Local Development

```bash
# Start local server
python3 -m http.server 8080

# Visit http://localhost:8080
```

## Deployment

```bash
# Deploy to Cloud Run
gcloud run deploy orion-showcase \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

## Design Philosophy

- Monochrome authority
- Dark/light duality
- Motion restraint
- Density without chaos
- Confidence without ornament

---

*Built by Naitik Joshi*
