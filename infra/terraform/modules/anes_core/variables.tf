variable "vpc_cidr" {
  type = string
}

variable "subnet_cidr" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "environment" {
  type = string
}

variable "common_tags" {
  type = map(string)
}
