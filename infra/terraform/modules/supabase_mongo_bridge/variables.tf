variable "supabase_url"          { type = string; sensitive = true }
variable "supabase_service_role" { type = string; sensitive = true }
variable "mongo_uri"             { type = string; sensitive = true }
variable "aws_region"            { type = string }
variable "environment"           { type = string }
variable "common_tags"           { type = map(string) }
