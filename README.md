# DevOps End-to-End Project

## Overview
Complete DevOps pipeline demonstrating containerization, orchestration, CI/CD automation, and AWS infrastructure management.

## Architecture
```
Developer → GitHub → Jenkins (Webhook) → Docker Build → Docker Hub → Kubernetes Deployment
                                                              ↓
                                                         CloudWatch Monitoring
                                                              ↓
AWS: VPC → Subnets → ALB → EC2 (with IAM) → S3
```

## Tech Stack
- **App:** Node.js backend
- **Containerization:** Docker, Multi-stage builds
- **Orchestration:** Kubernetes (Minikube)
- **CI/CD:** Jenkins + GitHub Webhooks
- **Cloud:** AWS (VPC, EC2, ALB, S3, IAM, CloudWatch)
- **Infrastructure:** 2 Public + 2 Private Subnets, Security Groups, Target Groups
- **Monitoring:** CloudWatch Agent for EC2 metrics
- **Scripting:** Bash automation scripts

## Project Flow

### 1. Application Development
- Built Node.js backend API
- Containerized with Docker
- Tested locally with Docker Compose

### 2. CI/CD Pipeline
- GitHub webhook triggers Jenkins on code push
- Jenkins builds Docker image
- Pushes to Docker Hub
- Deploys to Kubernetes cluster using kubectl
- Verified with multiple test pushes

### 3. AWS Infrastructure
- Created VPC with 2 public and 2 private subnets
- Configured Security Groups (EC2 + ALB)
- Set up Application Load Balancer
- Created Target Group
- Launched EC2 instance
- Configured IAM Role with S3 read access
- Attached role to EC2 (no hardcoded credentials)

### 4. Monitoring
- Installed CloudWatch Agent on EC2
- Configured custom metrics
- Validated CPU utilization graphs in CloudWatch
- Ready for alerting and dashboards

## Project Structure
```
devops-end-to-end-project/
├── app/backend/          # Node.js application
├── docker/               # Dockerfile & docker-compose
├── jenkins/              # Jenkinsfile & deploy scripts
├── k8s/                  # Kubernetes manifests
└── scripting/            # Bash automation scripts
```

## How to Run

### Prerequisites
- Docker installed
- Kubernetes cluster (Minikube or cloud)
- Jenkins server
- AWS account

### Steps
1. Clone the repository
2. Build Docker image: `docker build -t myapp:v1 .`
3. Push to Docker Hub: `docker push username/myapp:v1`
4. Apply K8s manifests: `kubectl apply -f k8s/`
5. Configure Jenkins webhook with your GitHub repo
6. Push code and watch automated deployment

## What I Learned
- Setting up VPC networking from scratch
- Configuring IAM roles for secure AWS access (no credentials in code)
- Installing and configuring CloudWatch Agent
- Debugging Jenkins webhook issues
- Writing production-grade Kubernetes manifests with proper resource limits
- End-to-end CI/CD pipeline automation
- AWS infrastructure best practices (ALB, Target Groups, Security Groups)


## Security Notes
- IAM roles used instead of access keys
- Secrets managed via Kubernetes Secrets
- Security Groups configured (note: SSH currently 0.0.0.0/0 for learning - would restrict in production)

## Future Improvements
- Move EC2 to private subnet
- Add NAT Gateway
- Implement Auto Scaling Group
- Add HTTPS with ACM certificate
- Create CloudWatch alarms
- Convert infrastructure to Terraform/IaC

