variable "project" {
  type    = string
  default = "1cl_hub"
}

resource "aws_vpc" "anes_core" {
  cidr_block = "10.10.0.0/16"

  tags = {
    Name        = "${var.project}-anes-core-vpc"
    module      = "anes_core"
    ecosystem   = "anes-emsat"
    compliance  = "audit_ready"
  }
}

resource "aws_subnet" "anes_core_subnet" {
  vpc_id            = aws_vpc.anes_core.id
  cidr_block        = "10.10.1.0/24"
  availability_zone = "eu-west-3a"

  tags = {
    Name   = "${var.project}-anes-core-subnet"
    module = "anes_core"
  }
}

resource "aws_s3_bucket" "anes_core_bucket" {
  bucket = "${var.project}-anes-core-bucket"

  tags = {
    module     = "anes_core"
    compliance = "audit_ready"
  }
}

output "anes_core_vpc_id" {
  value = aws_vpc.anes_core.id
}

output "anes_core_bucket" {
  value = aws_s3_bucket.anes_core_bucket.bucket
}
