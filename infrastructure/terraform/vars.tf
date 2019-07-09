# VPC info variable instead of TF data sources
# due to lack to valid tagging
variable "vpc_info" {
  type = object({
    id = string
    private_subnet_ids = list(string)
    public_subnet_ids = list(string)
  })
  description = "VPC details including subnets"
}

variable "app_info" {
  type = object({
    image = string
    image_secrets_arn = string
    fargate_cpu = number
    fargate_memory = number
    container_port = number
    host_port = number
    replicas = string
  })
  description = "ECS application configuration details"
}

variable "tags" {
  type    = map
  default = {}
}

variable "instart_cdn" {
  type = list(string)
  default = [
    "103.243.12.0/22",
    "159.180.64.0/19",
    "170.199.192.0/20",
    "173.205.42.22/32",
    "185.89.20.0/22",
    "192.33.24.0/21",
    "198.180.186.0/23",
    "203.41.121.0/24",
    "203.41.124.0/24",
    "203.41.171.0/24",
  ]
  description = "Instart CDN Whitelisted CIDR blocks - https://www.instart.com/"
}
