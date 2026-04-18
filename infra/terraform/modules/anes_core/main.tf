# ═══════════════════════════════════════════════════════════════════
# Module ANES Core — VPC · Subnet · S3 Bucket souverain
# Tags : module=anes_core · ecosystem=anes-emsat · compliance=audit_ready
# ═══════════════════════════════════════════════════════════════════

# ───────────────────────────────────────────────
# VPC 10.10.0.0/16
# ───────────────────────────────────────────────
resource "aws_vpc" "anes_core" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(var.common_tags, {
    Name   = "vpc-anes-core-${var.environment}"
    module = "anes_core"
  })
}

# ───────────────────────────────────────────────
# Subnet applicatif 10.10.1.0/24
# ───────────────────────────────────────────────
resource "aws_subnet" "anes_core" {
  vpc_id                  = aws_vpc.anes_core.id
  cidr_block              = var.subnet_cidr
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = false

  tags = merge(var.common_tags, {
    Name   = "subnet-anes-core-${var.environment}"
    module = "anes_core"
  })
}

# ───────────────────────────────────────────────
# Internet Gateway
# ───────────────────────────────────────────────
resource "aws_internet_gateway" "anes_core" {
  vpc_id = aws_vpc.anes_core.id

  tags = merge(var.common_tags, {
    Name   = "igw-anes-core-${var.environment}"
    module = "anes_core"
  })
}

# ───────────────────────────────────────────────
# S3 Bucket ANES Core — Souverain & privé
# ───────────────────────────────────────────────
resource "aws_s3_bucket" "anes_core" {
  bucket = "anes-core-1cl-hub-${var.environment}-${data.aws_caller_identity.current.account_id}"

  tags = merge(var.common_tags, {
    Name   = "s3-anes-core-${var.environment}"
    module = "anes_core"
  })
}

# Bloquer tout accès public — Policy CyberSec
resource "aws_s3_bucket_public_access_block" "anes_core" {
  bucket = aws_s3_bucket.anes_core.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Chiffrement SSE-S3 par défaut
resource "aws_s3_bucket_server_side_encryption_configuration" "anes_core" {
  bucket = aws_s3_bucket.anes_core.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Versioning activé
resource "aws_s3_bucket_versioning" "anes_core" {
  bucket = aws_s3_bucket.anes_core.id
  versioning_configuration {
    status = "Enabled"
  }
}

# ───────────────────────────────────────────────
# Data sources
# ───────────────────────────────────────────────
data "aws_caller_identity" "current" {}
