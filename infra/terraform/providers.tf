# ═══════════════════════════════════════════════════════════════════
# 1CL HUB — Configuration des Providers
# ═══════════════════════════════════════════════════════════════════
# Ce fichier documente les providers utilisés et leurs contraintes.
# La configuration réelle est dans main.tf (terraform {} block).
# ═══════════════════════════════════════════════════════════════════

# Provider AWS — infrastructure cloud souveraine
# Source  : hashicorp/aws
# Version : ~> 5.0
# Auth    : Variables d'env AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
#           ou IAM Role dans Terraform Cloud

# Provider Docker — gestion des images EMS@Path
# Source  : kreuzwerker/docker
# Version : ~> 3.0
# Auth    : credentials Docker Hub ou registre privé ECR

# ───────────────────────────────────────────────
# Terraform Cloud — Workspace 1cl_hub_infra
# ───────────────────────────────────────────────
# Organisation : anes-systems
# Workspace    : 1cl_hub_infra
# Source       : ad2sys-hub/1cl-hub (branche main)
# Trigger      : GitHub Actions → terraform.yml
# ───────────────────────────────────────────────
