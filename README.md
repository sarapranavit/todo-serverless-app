# Serverless - Todo API Management

This project have developed for Todo List Management

## Installation/deployment instructions

- Credated IAM role to Attach policies
    - Lambda Basic excection [AWS Managed]
    - DyanmoDB Table Access - GetItem, PutItem, ScanItem [Custom]
    - S3 Bucket policy for Serveless deployment
- Run `serverless deploy --stage <dev/production>` to Serverless Application to server
- Todo Serverless appliction deployed as API gateway

### Locally

In order to test the todo API  service locally, run the following command:

-  Run `npm i` to install the project dependencies
-  Add Dynamo DB Resource End of serverless.yml file
-  Run `npm start` to run the Todo Serverless application


### Application Overview

- Using NodeJS+Typescript+Express this tech stack to created Todo Serverless application
- DynamoDB was used in backend to store Data
- Using Middlewares to handled  the basic request validation
- Using DynamoDB Mapper to handle Data models

## Create Todo:
  Sample Request Body - ALL fields are Required

  ```
  {
    "name": "Node Learn test",
    "dueDate": "2022/08/01 11:12:00",
    "descrption": "tsdsadadadd"
  }
  ``` 

Sample Response 

```
{
    "id": "699d8134-26dc-4736-8bdd-59f44fe45630",
    "name": "Node Learn test",
    "status": "ACTIVE",
    "descrption": "tsdsadadadd",
    "dueDate": "2022-08-01T11:12:00.000Z",
    "createdAt": "2022-06-18T14:27:06.000Z",
    "updatedAt": "2022-06-18T14:27:06.000Z"
}

```

## Update Todo

when modify the todo item Todo Id is Required in the request param

Sample Request Body -  ALL are optional 

```
  {
    "name": "Node Learn update ",
    "dueDate": "2022/08/01 11:12:00",
    "descrption": "tsdsadadadd"
  }
```

Sample Response 

```
{
    "id": "699d8134-26dc-4736-8bdd-59f44fe45630",
    "name": "Node Learn test",
    "status": "ACTIVE",
    "descrption": "tsdsadadadd",
    "dueDate": "2022-08-01T11:12:00.000Z",
    "createdAt": "2022-06-18T14:27:06.000Z",
    "updatedAt": "2022-06-18T14:27:06.000Z"
}

```
### API Endpoints
  Create ToDo: https://svr2***/execute-api.us-east-1.amazonaws.com/todo [POST]
  Update ToDo: https://svr2***/execute-api.us-east-1.amazonaws.com/todo/:id [PUT]
  Get all ToDo List: https://svr2***/execute-api.us-east-1.amazonaws.com/todo [GET]
  Get Todo: https://svr2***/execute-api.us-east-1.amazonaws.com/todo/:id  [GET]
  Delete Todo: https://svr2***/execute-api.us-east-1.amazonaws.com/todo/:id [DELETE]


### Future Enhancements/Changes in Todo API Management

- Add unit test coverage using Jest
- Request validator middleware enhancements


### Resources
resources:
  Resources:
    TodoManagement:
      Type: AWS::DynamoDB::Table
      Properties:
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST
        TableName: ${env:Todo_Dynamo_TABLE} 