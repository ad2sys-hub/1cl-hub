# 1CL Hub — Infrastructure Terraform

Ce dossier contient l'infrastructure souveraine du **1CL Hub**, orchestrée via **Terraform Cloud** et déployée depuis le dépôt `ad2sys-hub/1cl-hub`.

> **Ecosystem** : `anes-emsat` · **Module** : `1cl_hub` · **Compliance** : `audit_ready`

---

## 🎯 Objectifs

- Provisionner une infrastructure **modulaire, souveraine et sponsor-ready**
- Orchestrer les modules **ANES Core**, **EMS@Path** et le **bridge Supabase ↔ MongoDB**
- Garantir traçabilité, auditabilité et conformité via **Terraform Cloud** et **policies CyberSec Sentinel**

---

## 🗂 Structure

```text
infra/
└── terraform/
    ├── main.tf                     # Terraform Cloud backend + déclaration des modules
    ├── variables.tf                # Variables globales (AWS, Supabase, MongoDB…)
    ├── outputs.tf                  # Sorties sponsor-ready pour le workspace
    ├── providers.tf                # Documentation des providers (AWS, Docker)
    ├── terraform.tfvars.example    # Template de configuration (ne pas committer les secrets)
    ├── policies/
    │   ├── deny_public_s3.sentinel # Policy CyberSec — HARD : interdit les S3 publics
    │   └── require_tags.sentinel   # Policy CyberSec — tags obligatoires sur toutes ressources
    └── modules/
        ├── anes_core/              # VPC · Subnet · S3 Bucket souverain
        ├── ems_path/               # ECS Fargate Cluster · Task · Service
        └── supabase_mongo_bridge/  # Bridge Supabase ↔ MongoDB Atlas (SSM Parameter Store)
```

---

## 🧩 Modules

### 🔷 ANES Core

Fondation réseau et stockage de l'écosystème 1CL.

| Ressource | Valeur |
|---|---|
| VPC CIDR | `10.10.0.0/16` |
| Subnet applicatif | `10.10.1.0/24` |
| Bucket S3 | `anes-core-1cl-hub-{env}-{account_id}` |
| Chiffrement S3 | SSE-AES256, versioning activé |
| Accès public | ❌ Bloqué (toutes options) |

**Tags** : `module=anes_core`, `ecosystem=anes-emsat`, `compliance=audit_ready`

---

### 🔶 EMS@Path

Orchestrateur de services en conteneurs Fargate.

| Ressource | Valeur |
|---|---|
| Cluster ECS | `cluster-ems-path-{env}` (Fargate + Container Insights) |
| Task Definition | `ems-path-{env}` — 512 vCPU · 1024 Mo RAM |
| Service | `svc-ems-path-{env}` — 1 instance minimum |
| Network | `awsvpc` — subnet ANES Core, sans IP publique |
| Logs | CloudWatch `/ecs/ems-path-{env}` — 30 jours rétention |

**Tags** : `module=ems_path`, `ecosystem=anes-emsat`, `compliance=audit_ready`

---

### 🌉 Bridge Supabase ↔ MongoDB

Point d'ancrage souverain pour la synchronisation des données.

| Variable | Stockage |
|---|---|
| `supabase_url` | AWS SSM SecureString |
| `supabase_service_role` | AWS SSM SecureString |
| `mongo_uri` | AWS SSM SecureString |

- Chemin SSM : `/{env}/1cl-hub/bridge/*`
- IAM Policy de lecture associée aux services autorisés
- Point d'ancrage pour triggers Postgres (Supabase) → MongoDB Atlas

---

## 🔐 CyberSec & Conformité

### Policies Sentinel

| Policy | Niveau | Règle |
|---|---|---|
| `deny_public_s3.sentinel` | **HARD** (blocking) | Interdit tout bucket S3 sans `public_access_block` complet |
| `require_tags.sentinel` | **SOFT** (advisory) | Tags `ecosystem`, `module`, `owner`, `env`, `compliance` obligatoires |

### Tags communs

```hcl
ecosystem  = "anes-emsat"
module     = "1cl_hub"
owner      = "ad2sys"
env        = "production"
compliance = "audit_ready"
managed_by = "terraform-cloud"
```

---

## 🚀 Déploiement

### Pipeline GitHub Actions (`.github/workflows/terraform.yml`)

| Trigger | Job | Action |
|---|---|---|
| `pull_request` → `main` (sur `infra/terraform/**`) | `validate` + `plan` | Format check · init · validate · plan commenté dans la PR |
| `push` → `main` (sur `infra/terraform/**`) | `validate` + `apply` | Apply automatique via Terraform Cloud |
| `workflow_dispatch` | `validate` | Déclenchement manuel |

### Prérequis GitHub Secrets

| Secret | Description |
|---|---|
| `TF_API_TOKEN` | Token Terraform Cloud (org `anes-systems`) |
| `SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_SERVICE_ROLE` | Clé service_role Supabase |
| `MONGO_URI` | URI MongoDB Atlas |

### Commandes locales

```bash
# Initialiser avec Terraform Cloud
terraform init

# Planifier (secrets via env vars)
export TF_VAR_supabase_url="https://xxxx.supabase.co"
export TF_VAR_supabase_service_role="eyJ..."
export TF_VAR_mongo_uri="mongodb+srv://..."
terraform plan

# Appliquer
terraform apply
```

---

## 📌 Convention de Tags

| Clé | Valeur |
|---|---|
| `ecosystem` | `anes-emsat` |
| `module` | `1cl_hub` |
| `owner` | `ad2sys` |
| `env` | `production` |
| `compliance` | `audit_ready` |
| `managed_by` | `terraform-cloud` |

---

## 🔗 Ressources

- [Terraform Cloud — anes-systems](https://app.terraform.io/app/anes-systems/workspaces/1cl_hub_infra)
- [Dépôt GitHub — ad2sys-hub/1cl-hub](https://github.com/ad2sys-hub/1cl-hub)
- [Documentation Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Sentinel — HashiCorp](https://docs.hashicorp.com/sentinel)
