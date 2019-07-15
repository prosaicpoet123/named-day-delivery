vpc_info = {
  id = "vpc-07d2a86bfd0c8f655"
  private_subnet_ids = [
    "subnet-03a37fc87b63fcfc6",
    "subnet-0bb015894d097645d",
    "subnet-006637d51dadb46af"
  ]
  public_subnet_ids = [
    "subnet-06cbd8445637db294",
    "subnet-09903ac5f072ed48f",
    "subnet-0e564f9bd9e674d7a"
  ]
}

app_info = {
  image             = "registry.gitlab.com/hnbi/replatform/named-day-delivery:v0.1.1"
  image_secrets_arn = "arn:aws:secretsmanager:eu-west-1:160519433728:secret:named-day-delivery-gitlab-token-LUYqDI"
  fargate_cpu       = 256
  fargate_memory    = 512
  container_port    = 3003
  host_port         = 3003
  replicas          = "2"
}
