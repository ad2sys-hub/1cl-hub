resource "null_resource" "ems_path" {
  triggers = {
    module = "ems_path"
    version = "v1"
  }
}
