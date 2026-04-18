# ═══════════════════════════════════════════════════════════════════
# 1CL HUB — Variables globales
# ═══════════════════════════════════════════════════════════════════

# ───────────────────────────────────────────────
# Infrastructure
# ───────────────────────────────────────────────
variable "aws_region" {
  description = "Région AWS pour le déploiement"
  type        = string
  default     = "eu-west-3" # Paris
}

variable "environment" {
  description = "Environnement de déploiement"
  type        = string
  default     = "production"
  validation {
    condition     = contains(["production", "staging", "dev"], var.environment)
    error_message = "Environment doit être : production | staging | dev"
  }
}

variable "vpc_cidr" {
  description = "CIDR du VPC ANES Core"
  type        = string
  default     = "10.10.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR du subnet applicatif ANES Core"
  type        = string
  default     = "10.10.1.0/24"
}

# ───────────────────────────────────────────────
# EMS@Path — Docker
# ───────────────────────────────────────────────
variable "ems_docker_image" {
  description = "Image Docker pour EMS@Path (ECR ou Docker Hub)"
  type        = string
  default     = "ad2sys/ems-path:latest"
}

variable "ems_container_port" {
  description = "Port exposé par le container EMS@Path"
  type        = number
  default     = 8080
}

# ───────────────────────────────────────────────
# Supabase
# ───────────────────────────────────────────────
variable "supabase_url" {
  description = "URL du projet Supabase"
  type        = string
  sensitive   = true
}

variable "supabase_service_role" {
  description = "Clé service_role Supabase (privilegiée)"
  type        = string
  sensitive   = true
}

# ───────────────────────────────────────────────
# MongoDB Atlas
# ───────────────────────────────────────────────
variable "mongo_uri" {
  description = "URI de connexion MongoDB Atlas (cluster 1CL Hub)"
  type        = string
  sensitive   = true
}
