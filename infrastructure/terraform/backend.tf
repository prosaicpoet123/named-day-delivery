terraform {
  backend "remote" {
    organization = "hbi"

    workspaces {
      prefix = "named-day-delivery-"
    }
  }
}
