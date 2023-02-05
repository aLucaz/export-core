const xlsx = require('xlsx');

class ExcelBuilder {
  static jsonToExcelBuffer(data) {
    const sheet = xlsx.utils.json_to_sheet(data, { skipHeader: false });
    const book = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(book, sheet);
    return xlsx.write(book, { type: 'buffer', bookType: 'xlsx' });
  }
}

module.exports = ExcelBuilder;
