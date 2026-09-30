output "vpc_id" {
  description = "StayHub VPC Identifier"
  value       = aws_vpc.main.id
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS endpoint"
  value       = aws_lb.main.dns_name
}

output "rds_endpoint" {
  description = "RDS PostgreSQL connection endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "s3_bucket_name" {
  description = "S3 Document Storage Bucket Name"
  value       = aws_s3_bucket.documents.id
}
