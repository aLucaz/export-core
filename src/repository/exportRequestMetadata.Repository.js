const DynamoDB = require('../../centralized-parent/aws/dynamodb');
const Status = require('../constant/exportStatus');

class ExportRequestMetadataRepository {
  constructor() {
    this.dynamodb = new DynamoDB();
    this.tableName = 'export_request_metadata';
    this.primaryKey = 'user';
    this.sortKey = 'creation_date';
  }

  updateExportStatus(user, creationDate, status) {
    return this.dynamodb.update(
      this.tableName,
      {
        [this.primaryKey]: user,
        [this.sortKey]: creationDate,
      },
      `set export_status = ${status}`,
    );
  }

  getExportTable(user, startDate, endDate, reportType) {
    let keyConditionExpr = '';
    if (user) {
      keyConditionExpr += `contains(user, ${user})`;
    }
    if (startDate && endDate) {
      keyConditionExpr += `  and creation_date between ${startDate} and ${endDate}`;
    }
    let filterExpr = '';
    if (reportType) {
      filterExpr += `contains(report_type, ${reportType})`;
    }
    return this.dynamodb.query(
      this.tableName,
      keyConditionExpr,
      filterExpr,
    );
  }
}

module.exports = ExportRequestMetadataRepository;
