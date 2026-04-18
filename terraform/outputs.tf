output "service_url" {
  description = "URL publique du service Cloud Run 1CL Hub"
  value       = google_cloud_run_v2_service.hub.uri
}

output "image_registry" {
  description = "URL du registre Docker Artifact Registry"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/1cl-hub"
}

output "project_id" {
  description = "GCP Project ID"
  value       = var.project_id
}
