variable "vpc_id"             { type = string }
variable "subnet_id"          { type = string }
variable "ems_image"          { type = string }
variable "ems_container_port" { type = number }
variable "aws_region"         { type = string }
variable "environment"        { type = string }
variable "common_tags"        { type = map(string) }
