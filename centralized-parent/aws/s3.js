const AWS = require('aws-sdk');

class S3 {
  constructor(bucketName = '') {
    this.connection = new AWS.S3();
    this.bucketName = bucketName;
  }

  upload(stream, name, mimeType) {
    const params = {
      Bucket: this.bucketName,
      Key: name,
      ContentType: mimeType,
      Body: stream,
    };
    // Uploading a stream with concurrency of 1 and partSize of 10mb
    const options = {
      partSize: 10 * 1024 * 1024,
      queueSize: 1,
    };
    return this.connection.upload(params, options).promise();
  }

  getPresignedUrl(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };
    return this.connection.getSignedUrlPromise('getObject', params);
  }
}

module.exports = S3;
