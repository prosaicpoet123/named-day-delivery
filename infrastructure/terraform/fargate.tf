locals {
  required_tags = {
    application = "named-day-delivery"
    owner       = "replatform"
    created_by  = "terraform"
  }
  environment = element(split("-", terraform.workspace), 0)
}

### ACM cert
data "terraform_remote_state" "route53_zone" {
  backend = "remote"

  config = {
    organization = "hbi"

    workspaces = {
      name = "route53-legacy-${local.environment}-global"
    }
  }
}

resource "aws_acm_certificate" "named_day_delivery_alb_cert" {
  domain_name       = "named-day-delivery.${local.environment}.aws.hollandandbarrett.com"
  validation_method = "DNS"

  tags = merge(local.required_tags, var.tags)
}

resource "aws_acm_certificate_validation" "named_day_delivery_alb_validated_cert" {
  certificate_arn         = aws_acm_certificate.named_day_delivery_alb_cert.arn
  validation_record_fqdns = [aws_route53_record.named_day_delivery_alb_cert_validation.fqdn]
}

resource "aws_route53_record" "named_day_delivery_alb_cert_validation" {
  name    = aws_acm_certificate.named_day_delivery_alb_cert.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.named_day_delivery_alb_cert.domain_validation_options.0.resource_record_type
  zone_id = data.terraform_remote_state.route53_zone.outputs.route53_zones.0.zone_id
  records = [aws_acm_certificate.named_day_delivery_alb_cert.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_route53_record" "named_day_delivery_dns_name" {
  zone_id = data.terraform_remote_state.route53_zone.outputs.route53_zones.0.zone_id
  name    = "named-day-delivery.${local.environment}.aws.hollandandbarrett.com"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.named_day_delivery.dns_name]
}

### ALB
resource "aws_security_group" "named_day_delivery_alb" {
  name_prefix = "named-day-delivery-alb"
  description = "Allow HTTPS from Anywhere into ALB"
  vpc_id      = var.vpc_info.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.required_tags, var.tags)

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_alb" "named_day_delivery" {
  name_prefix = "ndd"
  subnets     = var.vpc_info.public_subnet_ids

  security_groups = [
    aws_security_group.named_day_delivery_alb.id,
  ]

  tags = merge(local.required_tags, var.tags)
}

resource "aws_alb_target_group" "named_day_delivery" {
  name_prefix = "ndd"
  port        = var.app_info.host_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_info.id
  target_type = "ip"

  health_check {
    enabled  = true
    path     = "/"
    port     = "traffic-port"
    protocol = "HTTP"
    matcher  = "200,404"
  }

  tags = merge(local.required_tags, var.tags)

  lifecycle {
    create_before_destroy = true
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "named_day_delivery" {
  load_balancer_arn = aws_alb.named_day_delivery.id
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate_validation.named_day_delivery_alb_validated_cert.certificate_arn

  default_action {
    target_group_arn = aws_alb_target_group.named_day_delivery.id
    type             = "forward"
  }
}

### ECS
resource "aws_security_group" "named_day_delivery_ecs" {
  vpc_id      = var.vpc_info.id
  name        = "named-day-delivery-ecs-sg"
  description = "Allow ingress from ALB"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = var.app_info.host_port
    to_port   = var.app_info.host_port
    protocol  = "tcp"

    security_groups = [
      aws_security_group.named_day_delivery_alb.id,
    ]
  }

  tags = merge(local.required_tags, var.tags)
}

resource "aws_ecs_cluster" "named_day_delivery" {
  name = "ssr-pdp-cluster"
  tags = merge(local.required_tags, var.tags)
}

data "aws_iam_policy_document" "named_day_delivery_task_execution_policy" {
  statement {
    sid    = "AllowReadPrivateDockerRegistrySecrets"
    effect = "Allow"

    actions = [
      "secretsmanager:GetSecretValue"
    ]

    resources = [
      var.app_info.image_secrets_arn
    ]
  }
}

resource "aws_iam_policy" "named_day_delivery_task_execution_policy" {
  name        = "named-day-delivery-task-execution-policy"
  description = "policy to read secrets to pull private registry images"
  policy      = data.aws_iam_policy_document.named_day_delivery_task_execution_policy.json
}

resource "aws_iam_role" "named_day_delivery_task_execution_role" {
  name = "named-day-delivery-task-execution-role"
  tags = merge(local.required_tags, var.tags)

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": "AllowECSTasksAssume"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "named_day_delivery_task_execution_role" {
  role = aws_iam_role.named_day_delivery_task_execution_role.name
  policy_arn = aws_iam_policy.named_day_delivery_task_execution_policy.arn
}

resource "aws_ecs_task_definition" "named_day_delivery" {
  family = "named-day-delivery"
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = var.app_info.fargate_cpu
  memory = var.app_info.fargate_memory
  execution_role_arn = aws_iam_role.named_day_delivery_task_execution_role.arn
  tags = merge(local.required_tags, var.tags)

  container_definitions = <<DEFINITION
[
  {
    "cpu": ${var.app_info.fargate_cpu},
    "image": "${var.app_info.image}",
    "repositoryCredentials": {
      "credentialsParameter": "${var.app_info.image_secrets_arn}"
    },
    "memory": ${var.app_info.fargate_memory},
    "name": "named-day-delivery",
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": ${var.app_info.container_port},
        "hostPort": ${var.app_info.host_port}
      }
    ]
  }
]
DEFINITION
}

resource "aws_ecs_service" "named_day_delivery" {
  name            = "named-day-delivery"
  cluster         = aws_ecs_cluster.named_day_delivery.id
  task_definition = aws_ecs_task_definition.named_day_delivery.arn
  desired_count   = var.app_info.replicas
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.named_day_delivery_ecs.id]
    subnets         = var.vpc_info.private_subnet_ids
  }

  load_balancer {
    target_group_arn = "${aws_alb_target_group.named_day_delivery.id}"
    container_name   = "named-day-delivery"
    container_port   = var.app_info.container_port
  }

  depends_on = [
    "aws_alb_listener.named_day_delivery",
  ]

  # Commenting out tags because of below error
  # Error: InvalidParameterException: The new ARN and resource ID format must be enabled to add tags to the service. Opt in to the new format and try again.
  # tags = merge(local.required_tags, var.tags)
}
