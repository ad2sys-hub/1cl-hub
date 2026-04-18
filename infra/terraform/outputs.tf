# ═══════════════════════════════════════════════════════════════════
# 1CL HUB — Outputs sponsor-ready
# ═══════════════════════════════════════════════════════════════════

output "vpc_id" {
  description = "ID du VPC ANES Core"
  value       = module.anes_core.vpc_id
}

output "subnet_id" {
  description = "ID du subnet applicatif ANES Core"
  value       = module.anes_core.subnet_id
}

output "s3_bucket_anes_core" {
  description = "Nom du bucket S3 ANES Core (souverain)"
  value       = module.anes_core.s3_bucket_name
}

output "ecs_cluster_arn" {
  description = "ARN du cluster ECS Fargate EMS@Path"
  value       = module.ems_path.cluster_arn
}

output "ems_service_name" {
  description = "Nom du service ECS EMS@Path"
  value       = module.ems_path.service_name
}

output "bridge_status" {
  description = "Statut du bridge Supabase ↔ MongoDB"
  value       = module.supabase_mongo_bridge.bridge_status
}

output "workspace" {
  description = "Workspace Terraform Cloud actif"
  value       = "1cl_hub_infra @ anes-systems"
}

output "compliance_tags" {
  description = "Tags de conformité appliqués à toutes les ressources"
  value = {
    ecosystem  = "anes-emsat"
    module     = "1cl_hub"
    compliance = "audit_ready"
  }
}
