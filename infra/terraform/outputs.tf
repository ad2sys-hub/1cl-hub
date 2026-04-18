output "anes_core" {
  value = module.anes_core.anes_core_vpc_id
  description = "VPC principal du module ANES Core"
}

output "ems_path_cluster" {
  value = module.ems_path.ems_path_cluster
  description = "Cluster ECS pour EMS@Path"
}

output "supabase_mongo_bridge" {
  value = module.supabase_mongo_bridge.bridge_status
  description = "Statut du bridge souverain Supabase ↔ MongoDB"
}
