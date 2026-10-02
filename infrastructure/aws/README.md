# AWS Infrastructure Architecture - StayHub

This directory documents the AWS cloud topology for StayHub:
- **VPC & Networking**: Multi-AZ VPC (`10.0.0.0/16`) with Public and Private Subnets across 3 Availability Zones.
- **Compute (ECS)**: AWS Fargate cluster running containerized Spring Boot backend, Spring Cloud Gateway, and Nginx frontend.
- **Database (RDS)**: Multi-AZ Amazon RDS PostgreSQL 16 with automated backups.
- **Caching (ElastiCache)**: Redis cluster for session replication, rates, and fast lookups.
- **Storage (S3)**: S3 bucket `stayhub-documents` with server-side encryption for KYC documents and rental receipts.
- **Monitoring (CloudWatch)**: Container Insights, centralized logging, and threshold alarms.
