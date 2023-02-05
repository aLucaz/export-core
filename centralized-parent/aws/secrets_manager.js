const AWS = require('aws-sdk');

class SecretsManager {
  constructor() {
    this.connection = new AWS.SecretsManager();
  }

  async getSecrets(secretName) {
    const data = await this.connection.getSecretValue({
      SecretId: secretName,
    }).promise();
    return data.secrets;
  }
}

module.exports = SecretsManager;
