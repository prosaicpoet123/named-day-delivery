output "ecs_service_map" {
  value = aws_ecs_service.named-day-delivery
}

output "alb_map" {
  value = aws_alb.named-day-delivery
}

output "ecs_task_definition_map" {
  value = aws_ecs_task_definition.named-day-delivery
}
