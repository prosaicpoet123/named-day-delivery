The infrastructure folder provides a terraform configuration to configure and deploy an ECS cluster through Fargate to run `named-day-delivery` application.

The terraform backend used to store state is Terraform's [remote](https://www.terraform.io/docs/backends/types/remote.html) backend. The workflow to deploy into environments uses environment specific workspaces as follows:
- **preprod**: switch to workspace `preprod-eu-west-1` for `eu-west-1` region
- **prod**: switch to workspace `prod-eu-west-1` for `eu-west-1` region

### `remote` backend config
A free account for Holland and Barrett has been created and requires a secret token (should be in PaaS team's password manager) to be able to interact with the remote backend. Configure your local `~/.terraformrc` file with the following:

```
credentials "app.terraform.io" {
  token = "SECRET_TOKEN_PLACEHOLDER"
}
```

## Deployment

#### preprod
```
cd infrastructure/terraform
terraform workspace select preprod-eu-west-1
aws-vault exec <PREPROD-PROFILE> -- terraform init
aws-vault exec <PREPROD-PROFILE> -- terraform plan --var-file ../environments/preprod/eu-west-1/terraform.tfvars -out plan.out
aws-vault exec <PREPROD-PROFILE> -- terraform apply plan.out
```

#### prod
```
cd infrastructure/terraform
terraform workspace select prod-eu-west-1
aws-vault exec <PROD-PROFILE> -- terraform init
aws-vault exec <PROD-PROFILE> -- terraform plan --var-file ../environments/prod/eu-west-1/terraform.tfvars -out plan.out
aws-vault exec <PROD-PROFILE> -- terraform apply plan.out
```
