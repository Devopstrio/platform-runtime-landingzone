module "cluster_fleet" {
  source = "./modules/kubernetes"

  cluster_names = ["prod-us-01", "prod-eu-01", "stage-us-01"]
  environment   = "production"
}

module "runtime_networking" {
  source = "./modules/networking"

  ingress_enabled = true
  mesh_abstraction = "istio-simulated"
}

module "namespace_isolation" {
  source = "./modules/security"

  namespace_patterns = ["app-*", "data-*", "infra-*"]
  enforce_network_policy = true
}

resource "kubernetes_namespace" "runtime_env" {
  for_each = toset(["finance-prod", "marketing-stage", "hr-dev"])
  
  metadata {
    name = each.value
    labels = {
      "platform.runtime/managed" = "true"
      "platform.runtime/env"     = var.env_name
    }
  }
}

resource "kubernetes_resource_quota" "standard_quota" {
  for_each = kubernetes_namespace.runtime_env

  metadata {
    name      = "runtime-limit-quota"
    namespace = each.value.metadata[0].name
  }
  spec {
    hard = {
      cpu    = "20"
      memory = "64Gi"
      pods   = "100"
    }
  }
}
