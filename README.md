# Export core

Lambda function that is the final point of a serverless
architecture.

## Technologies used

- Serverless framework (3.x)
- Nodejs (14.x)
- AWS SQS
- AWS DynamoDB
- AWS SDK
- AWS Aurora Mysql
- AWS Secrets Manager

## Setup

To run locally execute this commands:
```shell
  $env:AWS_PROFILE = <profile> # set the profile where we are running the lambda
  serverless offline start --stage qa --httpPort 8080 --websocketPort 8081 --lambdaPort 8082
```

## Deployment

To deploy run this command:
```shell
    serverless deploy --aws-profile <profile> --stage <stage> 
```

## Architecture

on progress
