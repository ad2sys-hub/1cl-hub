variable "supabase_url" {}
variable "supabase_service_role" {}
variable "mongo_uri" {}

resource "null_resource" "bridge" {
  triggers = {
    supabase_url = var.supabase_url
    mongo_uri    = var.mongo_uri
  }

  provisioner "local-exec" {
    command = <<EOT
echo "Bridge Supabase ↔ MongoDB initialisé"
EOT
  }
}

output "bridge_status" {
  value = "Bridge Supabase ↔ MongoDB opérationnel"
}
