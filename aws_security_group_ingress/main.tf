resource "aws_security_group_rule" "sgr" {
 # count             = length(var.ports)
  type              = "ingress"
  from_port         = var.ports
  to_port           = var.ports
  protocol          = var.protocol
  cidr_blocks       = var.cidr_blocks
  description       = var.description
  security_group_id = var.security_group_id
  #self              = var.self
}