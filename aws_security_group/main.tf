resource "aws_security_group" "sec_grp" {
  vpc_id                 = var.vpc_id
  description            = "${var.name}-sg"
  revoke_rules_on_delete = true
  name                   = "${var.name}-sg"
  tags = var.tags
#    Name = var.name
#    Created_using = var.Created_using
#    Environment         = var.environment
#    app-name            = var.app-name
#    team-name           = var.team-name
#    created-by          = var.created-by
#    ticket              = var.ticket
#    cost-center         = var.cost-center
#    contact-email       = var.contact-email
#    created-date        = var.created-date
#    resource-function   = var.resource-function
#    patch-exempt        = var.patch-exempt
#    data-classification = var.data-classification
#    tags                = var.tags
#  }
}