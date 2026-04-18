# ═══════════════════════════════════════════════════════════════════
# Module Supabase ↔ MongoDB Bridge
# Point d'ancrage souverain pour triggers et webhooks
# Variables : supabase_url · supabase_service_role · mongo_uri
# ═══════════════════════════════════════════════════════════════════

# ───────────────────────────────────────────────
# AWS SSM Parameter Store — Secrets du Bridge
# Stockage sécurisé des credentials souverains
# ───────────────────────────────────────────────
resource "aws_ssm_parameter" "supabase_url" {
  name        = "/${var.environment}/1cl-hub/bridge/supabase_url"
  description = "URL du projet Supabase (bridge souverain 1CL Hub)"
  type        = "SecureString"
  value       = var.supabase_url

  tags = merge(var.common_tags, {
    Name      = "ssm-supabase-url-${var.environment}"
    module    = "supabase_mongo_bridge"
    data_type = "supabase_endpoint"
  })
}

resource "aws_ssm_parameter" "supabase_service_role" {
  name        = "/${var.environment}/1cl-hub/bridge/supabase_service_role"
  description = "Clé service_role Supabase — accès privilégié"
  type        = "SecureString"
  value       = var.supabase_service_role

  tags = merge(var.common_tags, {
    Name      = "ssm-supabase-service-role-${var.environment}"
    module    = "supabase_mongo_bridge"
    data_type = "supabase_secret"
  })
}

resource "aws_ssm_parameter" "mongo_uri" {
  name        = "/${var.environment}/1cl-hub/bridge/mongo_uri"
  description = "URI MongoDB Atlas — Cluster 1CL Hub"
  type        = "SecureString"
  value       = var.mongo_uri

  tags = merge(var.common_tags, {
    Name      = "ssm-mongo-uri-${var.environment}"
    module    = "supabase_mongo_bridge"
    data_type = "mongodb_connection"
  })
}

# ───────────────────────────────────────────────
# IAM Policy — Accès lecture SSM pour le bridge
# ───────────────────────────────────────────────
resource "aws_iam_policy" "bridge_ssm_read" {
  name        = "1cl-hub-bridge-ssm-read-${var.environment}"
  description = "Lecture des secrets bridge Supabase ↔ MongoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath"
      ]
      Resource = [
        aws_ssm_parameter.supabase_url.arn,
        aws_ssm_parameter.supabase_service_role.arn,
        aws_ssm_parameter.mongo_uri.arn
      ]
    }]
  })

  tags = merge(var.common_tags, { module = "supabase_mongo_bridge" })
}
