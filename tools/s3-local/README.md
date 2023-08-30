# AWS S3 configuration for local development

Purly uses [MiniO](https://min.io/) for local AWS S3 replacement. It provides API itself + convenient dashboard.

As MiniO is AWS S3 compatibile, [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

## Configure credentials for AWS CLI

```sh
aws configure
# Questions answers:
# AWS Access Key ID [None]: test
# AWS Secret Access Key [None]: testtest
# Default region name [None]: us-east-1
# Default output format [None]:
```

## Create bucket for local environment

```sh
aws --endpoint-url=http://localhost:9000 s3api create-bucket --bucket purly-local 
```

## Set access policy to public read only

```sh
aws --endpoint-url=http://localhost:9000 s3api put-bucket-policy --bucket purly-local --policy file://access.json
```

> By default access policy is `private`, so we need to configure it to make it accessible from browser.

### Notes

In real S3 you may also need to set CORS config. MiniO by default allows all origins.
