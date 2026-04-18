resource "null_resource" "supabase_mongo_bridge" {
  triggers = {
    supabase = var.supabase_url
    mongo    = var.mongo_uri
  }
}
