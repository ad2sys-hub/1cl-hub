# ═══════════════════════════════════════════════════════════════════
# Module EMS@Path — ECS Fargate Cluster · Task · Service
# Tags : module=ems_path · ecosystem=anes-emsat · compliance=audit_ready
# ═══════════════════════════════════════════════════════════════════

# ───────────────────────────────────────────────
# Cluster ECS Fargate
# ───────────────────────────────────────────────
resource "aws_ecs_cluster" "ems_path" {
  name = "cluster-ems-path-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = merge(var.common_tags, {
    Name   = "cluster-ems-path-${var.environment}"
    module = "ems_path"
  })
}

# ───────────────────────────────────────────────
# IAM Role — Task Execution
# ───────────────────────────────────────────────
resource "aws_iam_role" "ems_task_execution" {
  name = "ems-path-task-exec-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })

  tags = merge(var.common_tags, { module = "ems_path" })
}

resource "aws_iam_role_policy_attachment" "ems_task_execution" {
  role       = aws_iam_role.ems_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ───────────────────────────────────────────────
# Task Definition EMS@Path
# ───────────────────────────────────────────────
resource "aws_ecs_task_definition" "ems_path" {
  family                   = "ems-path-${var.environment}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ems_task_execution.arn

  container_definitions = jsonencode([{
    name      = "ems-path"
    image     = var.ems_image
    essential = true

    portMappings = [{
      containerPort = var.ems_container_port
      protocol      = "tcp"
    }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/ems-path-${var.environment}"
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ems"
      }
    }
  }])

  tags = merge(var.common_tags, {
    Name   = "td-ems-path-${var.environment}"
    module = "ems_path"
  })
}

# ───────────────────────────────────────────────
# Security Group EMS@Path
# ───────────────────────────────────────────────
resource "aws_security_group" "ems_path" {
  name        = "sg-ems-path-${var.environment}"
  description = "Security group pour EMS@Path Fargate"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = var.ems_container_port
    to_port     = var.ems_container_port
    protocol    = "tcp"
    cidr_blocks = ["10.10.0.0/16"]
    description = "Trafic interne ANES Core uniquement"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Sortie libre pour APIs externes"
  }

  tags = merge(var.common_tags, {
    Name   = "sg-ems-path-${var.environment}"
    module = "ems_path"
  })
}

# ───────────────────────────────────────────────
# Service EMS@Path — Orchestrateur Fargate
# ───────────────────────────────────────────────
resource "aws_ecs_service" "ems_path" {
  name            = "svc-ems-path-${var.environment}"
  cluster         = aws_ecs_cluster.ems_path.id
  task_definition = aws_ecs_task_definition.ems_path.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [var.subnet_id]
    security_groups  = [aws_security_group.ems_path.id]
    assign_public_ip = false
  }

  tags = merge(var.common_tags, {
    Name   = "svc-ems-path-${var.environment}"
    module = "ems_path"
  })
}

# ───────────────────────────────────────────────
# CloudWatch Log Group
# ───────────────────────────────────────────────
resource "aws_cloudwatch_log_group" "ems_path" {
  name              = "/ecs/ems-path-${var.environment}"
  retention_in_days = 30

  tags = merge(var.common_tags, { module = "ems_path" })
}
