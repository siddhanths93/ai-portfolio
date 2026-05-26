# Sid AI Lab

A personal portfolio website showcasing practical analytics and AI-enabled decision-support tools for procurement, supply chain, enterprise risk, and business decision-making.

Built with Next.js, React, TypeScript, and Tailwind CSS.

## About

This portfolio documents my journey building hands-on tools that turn complex business inputs into clearer recommendations.

The goal is to combine my background in procurement, supply chain analytics, and transformation with practical product-building and AI application development.

## Featured Projects

### Supplier Risk Assessment

An interactive supplier risk assessment tool that evaluates supplier exposure using weighted procurement risk factors.

The tool considers:

- Financial health
- Geographic diversification
- Quality performance
- On-time delivery
- Spend concentration
- Contract stability

It generates:

- Supplier risk score
- Risk level
- Primary exposure signal
- Recommended mitigation actions
- Methodology explanation

### Tariff Exposure Estimator

A scenario-planning tool that estimates how tariff changes may affect supplier cost, margin exposure, and sourcing risk.

The tool considers:

- Annual supplier spend
- Tariff rate assumption
- Supplier dependence
- Gross margin
- Cost pass-through ability

It generates:

- Estimated tariff cost
- Unrecovered cost
- Risk level
- Recommended sourcing actions
- Methodology explanation

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel

## Project Structure

```txt
app/
  page.tsx
  about/
    page.tsx
  projects/
    [slug]/
      page.tsx

components/
  Navbar.tsx
  ProjectCard.tsx
  SupplierRiskCalculator.tsx
  TariffExposureEstimator.tsx
