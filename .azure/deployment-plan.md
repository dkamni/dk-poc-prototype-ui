# Azure Deployment Plan

> **Status:** Planning

Generated: 2026-09-07

---

## 1. Project Overview

**Goal:** Deploy the `ai-layout` (Greycon Essentials POC) React + TypeScript + Vite SPA to Azure Static Web Apps, with GitHub Actions CI/CD auto-deploying on push.

**Path:** New Project (no existing `.azure`/`azure.yaml`/infra present)

---

## 2. Requirements

| Attribute | Value |
|-----------|-------|
| Classification | POC |
| Scale | Small |
| Budget | Cost-Optimized (Free SKU) |
| **Subscription** | sub-agentic-essentials-dev (604a8e90-9ec3-4162-a71a-c300ea73214f) |
| **Location** | westeurope |

---

## 3. Components Detected

| Component | Type | Technology | Path |
|-----------|------|------------|------|
| ai-layout | Frontend (SPA) | React 19 + TypeScript + Vite 5 | `.` (repo root, build output `dist/`) |

No backend/API project present — static hosting only.

---

## 4. Recipe Selection

**Selected:** AZD

**Rationale:** User explicitly requested `azd`-based deployment for a repeatable `azd up` workflow, plus GitHub Actions CI/CD.

---

## 5. Architecture

**Stack:** Static Web Hosting

### Service Mapping

| Component | Azure Service | SKU |
|-----------|---------------|-----|
| ai-layout | Microsoft.Web/staticSites (Azure Static Web Apps) | Free |

### Supporting Services

| Service | Purpose |
|---------|---------|
| None | Static Web Apps Free tier is fully managed, no supporting resources required for this POC |

---

## 6. Provisioning Limit Checklist

### Phase 1: Prepare Resource Inventory

| Resource Type | Number to Deploy | Total After Deployment | Limit/Quota | Notes |
|---------------|------------------|------------------------|-------------|-------|
| Microsoft.Web/staticSites | 1 | 1 | 100 per subscription per region (documented limit) | New resource group `dk-poc-ui`, 0 existing static sites |

### Phase 2: Fetch Quotas and Validate Capacity

`Microsoft.Web` does not support the `az quota` API (quota CLI extension install was interrupted/unsupported for this resource type in interactive session). Falling back to documented Azure limits: Static Web Apps default limit is 100 static sites per subscription per region ([Azure subscription limits docs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#static-web-apps-limits)). Target resource group `dk-poc-ui` is new (0 existing resources), so deploying 1 is far under limit.

**Status:** ✅ All resources within limits (documented-limit fallback; single resource, new resource group)

---

## 7. Execution Checklist

### Phase 1: Planning
- [x] Analyze workspace
- [x] Gather requirements
- [x] Confirm subscription and location with user
- [x] Prepare resource inventory
- [x] Fetch quotas and validate capacity (documented-limit fallback)
- [x] Scan codebase
- [x] Select recipe
- [x] Plan architecture
- [ ] **User approved this plan**

### Phase 2: Execution
- [ ] Research components
- [ ] Generate infrastructure files (`azure.yaml`, `infra/main.bicep`, `infra/main.parameters.json`)
- [ ] Generate `staticwebapp.config.json`
- [ ] Init git repo + create GitHub repo + push
- [ ] Generate GitHub Actions workflow for CI/CD
- [ ] Generate application configuration
- [ ] Update plan status to "Ready for Validation"

### Phase 3: Validation
- [ ] Invoke azure-validate skill
- [ ] All validation checks pass
- [ ] Update plan status to "Validated"

### Phase 4: Deployment
- [ ] Invoke azure-deploy skill
- [ ] Deployment successful
- [ ] Report deployed endpoint URL
- [ ] Update plan status to "Deployed"

---

## 7. Validation Proof

| Check | Command Run | Result | Timestamp |
|-------|-------------|--------|-----------|
| _pending_ | | | |

---

## 8. Files to Generate

- `azure.yaml`
- `infra/main.bicep`
- `infra/main.parameters.json`
- `staticwebapp.config.json`
- `.github/workflows/azure-dev.yml` (via `azd pipeline config`)
