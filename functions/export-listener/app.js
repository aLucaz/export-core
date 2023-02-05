const S3 = require('../../centralized-parent/aws/s3');
const Status = require('../../src/constant/exportStatus');
const MySqlDriver = require('../../centralized-parent/database/mysql');
const Querys = require('../../src/constant/querys');
const ExcelBuilder = require('../../centralized-parent/helper/excel.builder');
const ExportRequestMetadataRepository = require('../../src/repository/exportRequestMetadata.Repository');

module.exports.handler = async (event) => {
  for (const record of event.Records) {
    const request = JSON.parse(record.body);
    // on progress export_status
    const repository = new ExportRequestMetadataRepository();
    await repository.updateExportStatus(request.user, request.creationDate, Status.ON_PROGRESS);
    // query from database
    const mysql = new MySqlDriver(
      'localhost',
      'fmlocal',
      'administrator',
      '66swl9YEDv',
    );
    const response = await mysql.execute(
      Querys.SELECT_ALL,
    );
    // create Excel file
    const file = ExcelBuilder.jsonToExcelBuffer(response);
    console.log(file);
    // upload aws s3
    const s3 = new S3('genericpoctesting');
    const awsResponse = await s3.upload(
      file,
      request.fileName,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    console.log(awsResponse);
    // update status to finished
    await repository.updateExportStatus(request.user, request.creationDate, Status.FINISHED);
  }
  return true;
};
