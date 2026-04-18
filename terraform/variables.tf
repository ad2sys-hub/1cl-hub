variable "project_id" {
  description = "GCP Project ID"
  type        = string
  # Set via: terraform.tfvars or TF_VAR_project_id env var
}

variable "region" {
  description = "GCP Region for Cloud Run"
  type        = string
  default     = "europe-west1"  # Closest to Paris
}

variable "image_tag" {
  description = "Docker image tag to deploy"
  type        = string
  default     = "latest"
}

variable "app_name" {
  description = "Application name prefix"
  type        = string
  default     = "1cl-hub"
}
