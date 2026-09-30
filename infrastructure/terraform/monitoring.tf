resource "aws_cloudwatch_log_group" "backend_logs" {
  name              = "/ecs/${local.name_prefix}-backend"
  retention_in_days = 30
}

resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "${local.name_prefix}-high-cpu-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Triggers when cluster CPU exceeds 80%"

  dimensions = {
    ClusterName = aws_ecs_cluster.main.name
  }
}
