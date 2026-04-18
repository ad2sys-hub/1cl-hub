output "bridge_status" {
  description = "Statut du bridge souverain Supabase ↔ MongoDB"
  value       = "active — SSM /${var.environment}/1cl-hub/bridge/*"
}

output "ssm_supabase_url_arn" {
  description = "ARN SSM du paramètre supabase_url"
  value       = aws_ssm_parameter.supabase_url.arn
}

output "ssm_mongo_uri_arn" {
  description = "ARN SSM du paramètre mongo_uri"
  value       = aws_ssm_parameter.mongo_uri.arn
}

output "bridge_iam_policy_arn" {
  description = "ARN de la policy IAM d'accès au bridge"
  value       = aws_iam_policy.bridge_ssm_read.arn
}
