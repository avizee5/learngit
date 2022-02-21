variable "identifier" {
  description = "The name of the identifier"
  type        = string
}
variable "engine" {
  description = "The name of the engine"
}
variable "engine_version" {
  description = "The name of the engine_version"
}

variable "instance_class" {
  description = "The name of the instance_class"
}

variable "allocated_storage" {
  description = "The name of the allocated_storage"
}

variable "storage_type" {
  description = "The name of the storage_type"
}

variable "storage_encrypted" {
  description = "The name of the storage_encrypted"
}

variable "kms_key_id" {
  description = "The name of the kms_key_id"
}

variable "db_subnet_group_name" {
  description = "The name of the db_subnet_group_name"
}

variable "license_model" {
  description = "The name of the license_model"
  default     = null
}

variable "snapshot_identifier" {
  description = "Specifies whether or not to create this database from a snapshot"
  default     = null
}

variable "name" {
  description = "A short name"
  type        = string
  default     = ""
}

variable "username" {
  description = "The name of the username"
}

variable "password" {
  description = "The name of the password"
}

variable "port" {
  description = "The name of the port"
}
variable "enabled_cloudwatch_logs_exports" {
  description = "The name of the port"
}
variable "max_allocated_storage" {
  description = "The name of the port"
}
variable "iam_database_authentication_enabled" {
  description = "The name of the iam_database_authentication_enabled"
  default     = null
}

#variable "vpc_security_group_ids" {
  #description = "The name of the vpc_security_group_ids"
  #type = map(string)
 #}

variable "vpc_id" {
  description = "The name of the vpc_id"
}


variable "multi_az" {
  description = "The name of the multi_az"
}

variable "iops" {
  description = "The name of the iops"
  default     = null
}

variable "publicly_accessible" {
  description = "The name of the publicly_accessible"
  default     = null
}

variable "allow_major_version_upgrade" {
  description = "The name of the allow_major_version_upgrade"
  default     = null
}

variable "performance_insights_enabled" {
  description = "Specifies whether Performance Insights are enabled"
}

variable "auto_minor_version_upgrade" {
  description = "The name of the auto_minor_version_upgrade"
  default     = null
}

variable "apply_immediately" {
  description = "The name of the apply_immediately"
  default     = null
}

variable "maintenance_window" {
  description = "The name of the maintenance_window"
  type        = string
  default     = null
}

variable "skip_final_snapshot" {
  description = "The name of the skip_final_snapshot"
}

#variable "copy_to_snapshot" {
#description = "The name of the copy_tags_to_snapshot"
#default     = null
#}

variable "backup_retention_period" {
  description = "The name of the backup_retention_period"
}

variable "backup_window" {
  description = "The name of the backup_window"
  default     = null
}

variable "character_set_name" {
  description = "The name of the character_set_name"
  default     = null
}

variable "deletion_protection" {
  description = "The name of the deletion_protection"
  default     = null
}

variable "performance_insights_kms_key_id" {
  description = "The ARN for the KMS key to encrypt Performance Insights data"
  default     = null
}

variable "final_snapshot_identifier" {
  description = "The name of your final DB snapshot when this DB instance is deleted. Must be provided if skip_final_snapshot is set to false."
  default     = null
}
variable "tags" {
  type = map(string)
  default = {}
}
variable "vpc_sg" {
type = list(string)
default  = ["sg-06801fc78f012b33d"]
}
