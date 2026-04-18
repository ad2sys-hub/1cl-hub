output "cluster_arn"  { value = aws_ecs_cluster.ems_path.arn }
output "service_name" { value = aws_ecs_service.ems_path.name }
output "task_definition_arn" { value = aws_ecs_task_definition.ems_path.arn }
