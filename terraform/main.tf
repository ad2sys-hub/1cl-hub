terraform {
  required_version = ">= 1.6"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Remote state stored in GCS bucket (uncomment after creating bucket)
  # backend "gcs" {
  #   bucket = "1cl-terraform-state"
  #   prefix = "1cl-hub"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# ═══════════════════════════════════════════════
# Enable Required GCP APIs
# ═══════════════════════════════════════════════
resource "google_project_service" "run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifactregistry" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

# ═══════════════════════════════════════════════
# Artifact Registry — Docker Image Storage
# ═══════════════════════════════════════════════
resource "google_artifact_registry_repository" "hub" {
  location      = var.region
  repository_id = "1cl-hub"
  format        = "DOCKER"
  description   = "1CL Hub Docker images"

  depends_on = [google_project_service.artifactregistry]
}

# ═══════════════════════════════════════════════
# Cloud Run Service — 1CL Hub
# ═══════════════════════════════════════════════
resource "google_cloud_run_v2_service" "hub" {
  name     = "1cl-hub"
  location = var.region

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/1cl-hub/app:latest"

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
        # Scale to zero when no traffic (cost saving)
        cpu_idle = true
      }

      # Supabase credentials via Secret Manager
      env {
        name = "VITE_SUPABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.supabase_url.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "VITE_SUPABASE_ANON_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.supabase_anon_key.secret_id
            version = "latest"
          }
        }
      }
    }

    scaling {
      min_instance_count = 0  # Scale to zero = free when idle
      max_instance_count = 3
    }
  }

  depends_on = [
    google_project_service.run,
    google_artifact_registry_repository.hub
  ]
}

# ═══════════════════════════════════════════════
# Public Access Policy
# ═══════════════════════════════════════════════
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.hub.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ═══════════════════════════════════════════════
# Secret Manager — Supabase Credentials
# ═══════════════════════════════════════════════
resource "google_project_service" "secretmanager" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

resource "google_secret_manager_secret" "supabase_url" {
  secret_id = "supabase-url"

  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}

resource "google_secret_manager_secret" "supabase_anon_key" {
  secret_id = "supabase-anon-key"

  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}
