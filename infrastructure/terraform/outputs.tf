output "ecs_service_map" {
  value = aws_ecs_service.named_day_delivery
}

output "alb_map" {
  value = aws_alb.named_day_delivery
}

output "ecs_task_definition_map" {
  value = aws_ecs_task_definition.named_day_delivery
}
