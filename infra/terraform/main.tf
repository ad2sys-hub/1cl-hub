terraform {
  cloud {
    organization = "anes-systems"

    workspaces {
      name = "1cl_hub_infra"
    }
  }

  required_version = ">= 1.6.0"

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

provider "aws" {
  region = var.aws_region
}

provider "docker" {}

# Exemple de ressource (placeholder)
resource "null_resource" "init" {
  triggers = {
    project = "1cl_hub"
  }
}
