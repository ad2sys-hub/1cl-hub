output "vpc_id"        { value = aws_vpc.anes_core.id }
output "subnet_id"     { value = aws_subnet.anes_core.id }
output "s3_bucket_name" { value = aws_s3_bucket.anes_core.bucket }
