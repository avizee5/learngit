terraform {
backend "s3" {
bucket = "backand123s3"
key = "terraform.tfstate"
region = "us-east-1"
}
}
