# AWS Production Deployment Guide

This document outlines the AWS production architecture, infrastructure provisioning with Terraform, and zero-downtime deployment pipelines for **StayHub**.

---

## 1. Cloud Architecture Overview

The StayHub production environment is deployed in AWS within a multi-AZ Virtual Private Cloud (VPC):

```
                        [ Internet ]
                             │
                     [ AWS CloudFront ]
                             │
                 [ Application Load Balancer ]
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
   [ ECS Fargate: Gateway ]          [ S3: Static / Media ]
          │
   [ ECS Fargate: Backend API ]
          │
  ┌───────┴───────────────┐
  │                       │
[ Amazon RDS: PG ]  [ ElastiCache: Redis ]
```

### Components
1. **Network Layer**: VPC with 2 public subnets and 2 private isolated subnets across 2 Availability Zones (`us-east-1a`, `us-east-1b`), managed via NAT Gateways.
2. **Ingress & TLS**: AWS ALB terminating TLS certificates provisioned via AWS ACM, distributing traffic across ECS Fargate tasks.
3. **Compute**: AWS ECS Fargate running stateless Docker containers for API Gateway and Spring Boot Backend with automatic target tracking CPU/Memory autoscaling.
4. **Data Persistence**: AWS RDS PostgreSQL 16 (Multi-AZ configured for automated high availability and point-in-time recovery).
5. **Caching**: Amazon ElastiCache Redis cluster for session validation, caching, and rate limiting counters.
6. **Object Storage**: Amazon S3 encrypted bucket with AWS CloudFront CDN distribution for KYC documents and receipts.
7. **Telemetry**: CloudWatch log streams and alarms for CPU, memory, 5xx errors, and database latency.

---

## 2. Infrastructure as Code (Terraform)

All AWS resources are codified under `infrastructure/terraform/`.

### Provisioning Steps

```bash
cd infrastructure/terraform

# 1. Initialize Terraform providers and backend
terraform init

# 2. Plan execution and inspect changes
terraform plan -var-file="environments/prod.tfvars" -out=tfplan

# 3. Apply infrastructure updates
terraform apply tfplan
```

### Key Terraform Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `aws_region` | Deployment region | `us-east-1` |
| `environment` | Environment identifier | `prod` |
| `vpc_cidr` | VPC network CIDR | `10.0.0.0/16` |
| `db_instance_class` | RDS database instance type | `db.t4g.medium` |
| `backend_cpu` | Fargate CPU allocation | `1024` (1 vCPU) |
| `backend_memory` | Fargate RAM allocation | `2048` (2 GB) |

---

## 3. Container Image Promotion to ECR

1. GitHub Actions CI builds Docker images upon pull request merge into `main`.
2. Images are tagged with git commit SHA and `latest`, scanned for CVE vulnerabilities with Trivy, and pushed to Amazon Elastic Container Registry (ECR).
3. The deployment workflow updates ECS task definitions using rolling zero-downtime deployments.
