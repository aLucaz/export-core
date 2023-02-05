const AWS = require('aws-sdk');

class Dynamodb {
  constructor() {
    this.connection = new AWS.DynamoDB.DocumentClient();
  }

  update(tableName, keysInfo, updateExpr) {
    const params = {
      TableName: tableName,
      Key: keysInfo,
      UpdateExpression: updateExpr,
      ReturnValues: 'UPDATED_NEW',
    };
    return this.connection.update(params).promise();
  }

  query(tableName, keyConditionExpr, filterExpr) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpr,
      FilterExpression: filterExpr,
    };
    return this.connection.query(params).promise();
  }
}

module.exports = Dynamodb;
