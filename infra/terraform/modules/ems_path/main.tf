variable "project" {
  type    = string
  default = "1cl_hub"
}

resource "aws_ecs_cluster" "ems_path" {
  name = "${var.project}-ems-path-cluster"

  tags = {
    module = "ems_path"
    system = "orchestration"
  }
}

resource "aws_ecs_task_definition" "ems_path_task" {
  family                   = "${var.project}-ems-path"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name  = "ems-path"
      image = "public.ecr.aws/docker/library/nginx:latest"
      portMappings = [{
        containerPort = 80
      }]
    }
  ])
}

resource "aws_ecs_service" "ems_path_service" {
  name            = "${var.project}-ems-path-service"
  cluster         = aws_ecs_cluster.ems_path.id
  task_definition = aws_ecs_task_definition.ems_path_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = var.subnets
    assign_public_ip = true
  }

  tags = {
    module = "ems_path"
    system = "orchestration"
  }
}

output "ems_path_cluster" {
  value = aws_ecs_cluster.ems_path.name
}
