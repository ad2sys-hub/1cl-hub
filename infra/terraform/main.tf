# ═══════════════════════════════════════════════════════════════════
# 1CL HUB — Infrastructure Souveraine
# Orchestrée via Terraform Cloud · Workspace : 1cl_hub_infra
# Ecosystem : anes-emsat | Module : 1cl_hub | Compliance : audit_ready
# ═══════════════════════════════════════════════════════════════════

terraform {
  required_version = ">= 1.6"

  cloud {
    organization = "anes-systems"

    workspaces {
      name = "1cl_hub_infra"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# ───────────────────────────────────────────────
# Providers
# ───────────────────────────────────────────────
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# ───────────────────────────────────────────────
# Tags communs (sponsor-ready / audit-ready)
# ───────────────────────────────────────────────
locals {
  common_tags = {
    ecosystem  = "anes-emsat"
    module     = "1cl_hub"
    owner      = "ad2sys"
    env        = var.environment
    compliance = "audit_ready"
    managed_by = "terraform-cloud"
  }
}

# ═══════════════════════════════════════════════
# Module ANES Core
# VPC · Subnet · S3 Bucket souverain
# ═══════════════════════════════════════════════
module "anes_core" {
  source = "./modules/anes_core"

  vpc_cidr    = var.vpc_cidr
  subnet_cidr = var.subnet_cidr
  aws_region  = var.aws_region
  environment = var.environment
  common_tags = local.common_tags
}

# ═══════════════════════════════════════════════
# Module EMS@Path
# ECS Fargate Cluster · Task · Service
# ═══════════════════════════════════════════════
module "ems_path" {
  source = "./modules/ems_path"

  vpc_id             = module.anes_core.vpc_id
  subnet_id          = module.anes_core.subnet_id
  ems_image          = var.ems_docker_image
  ems_container_port = var.ems_container_port
  aws_region         = var.aws_region
  environment        = var.environment
  common_tags        = local.common_tags

  depends_on = [module.anes_core]
}

# ═══════════════════════════════════════════════
# Module Supabase ↔ MongoDB Bridge
# Bridge logique + variables souveraines
# ═══════════════════════════════════════════════
module "supabase_mongo_bridge" {
  source = "./modules/supabase_mongo_bridge"

  supabase_url          = var.supabase_url
  supabase_service_role = var.supabase_service_role
  mongo_uri             = var.mongo_uri
  aws_region            = var.aws_region
  environment           = var.environment
  common_tags           = local.common_tags

  depends_on = [module.anes_core]
}
