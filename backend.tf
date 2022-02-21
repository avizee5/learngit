terraform {
backend "s3" {
bucket = "backand123s3"
key = "terraform.tfstate"
region = "us-east-1"
role_arn = "arn:aws:iam::651165067307:role/AdministratorAccessIAMRole"  
}
}
