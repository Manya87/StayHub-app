# StayHub Core Terraform Infrastructure
# Orchestrates VPC, ECS, RDS, S3, and CloudWatch

locals {
  name_prefix = "stayhub-${var.environment}"
}
