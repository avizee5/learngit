module "rds_subnet_group" {
  source      = "/home/runner/work/learngit/learngit/rds_subnet_group"
  name        = "b2bapi-subnet"
  description = "The description of the DB subnet group"
  subnet_ids  = ["subnet-06631f8436563b89c", "subnet-060c430ce12563e56"]
  tags = {
    contact-email     = "pradeep@zee.com"
    environment       = "dev"
    cost-center       = "b2bapi"
    app-name          = "zee5-dev-b2bapi"
    resource-function = "rds"
    team-name         = "b2bapi"
    created-by        = "tf"
    created-date      = timestamp()
  }
}
module "sec_grp"  {
  source = "/home/runner/work/learngit/learngit/aws_security_group"
  vpc_id = "vpc-05a231c1556f22cf7"
  #revoke_rules_on_delete = true
  name = "rds-sg"
  tags = {
    contact-email     = "pradeep@zee.com"
    environment       = "dev"
    cost-center       = "b2bapi"
    app-name          = "zee5-dev-b2bapi"
    resource-function = "rds"
    team-name         = "b2bapi"
    created-by        = "tf"
    created-date      = timestamp()
  }
}
module "sgr" {
  source = "/home/runner/work/learngit/learngit/aws_security_group_ingress"
  #type             = "ingress"
  security_group_id = module.sec_grp.sg_id
  ports             = "3306"
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/16"]
  description       = "TLS from VPC"
  tags              = "ppp"
  #self              = var.self
}
module "rds_parameter_group" {
  source = "/home/runner/work/learngit/learngit/rds_parameter_group"
  name   = "zee5-dev-b2bapi"
  family = "mysql5.7"
}
module "rds_instance" {
  source            = "/home/runner/work/learngit/learngit/rds_instance"
  identifier        = "zee5-dev-b2bapi"
  allocated_storage = 20
  storage_type      = "gp2"
  storage_encrypted = true
  engine            = "mysql"
  engine_version    = "5.7.33"
  instance_class    = "db.t2.small"
  #rds_parameter_group = "default.mysql5.6"
  name     = "zee5devb2bapi"
  username = "zee5adminb2bapi"
  password = "AypRD`&=Gzf2)6sJ7:+u"
  #vpc_security_group_ids          = "terraform-sg"
  #db_subnet_group_name            = "rdsmultiaz-sbg"
  multi_az                        = false
  vpc_id                          = "vpc-05a231c1556f22cf7"
  kms_key_id                      = "arn:aws:kms:us-east-1:651165067307:key/ea13a532-34ec-46fd-9ccd-6a9b74fec209"
  port                            = "3306"
  publicly_accessible             = false
  allow_major_version_upgrade     = false
  performance_insights_enabled    = false
  auto_minor_version_upgrade      = false
  apply_immediately               = false
  max_allocated_storage           = 1000
  enabled_cloudwatch_logs_exports = ["audit", "error"]
  #maintenance_window          = true
  skip_final_snapshot     = false
  backup_retention_period = 7
  deletion_protection     = true
  #performance_insights_kms_key_id = false
  #vpc_sg = "sg-06801fc78f012b33d"
  tags = {
    contact-email     = "pradeep@zee.com"
    environment       = "dev"
    cost-center       = "b2bapi"
    app-name          = "zee5-dev-b2bapi"
    resource-function = "rds"
    team-name         = "b2bapi"
    created-by        = "tf"
    created-date      = timestamp()
  }
}

