resource "null_resource" "anes_core" {
  triggers = {
    module = "anes_core"
    version = "v1"
  }
}
