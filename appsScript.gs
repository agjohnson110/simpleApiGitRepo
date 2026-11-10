const SECRET =
  PropertiesService
    .getScriptProperties()
    .getProperty("SECRET");

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return jsonResponse({
        success: false,
        error: "Unauthorized"
      });
    }

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Entries");

    sheet.appendRow([
      new Date(),
      data.name
    ]);

    return jsonResponse({
      success: true,
      message: "Record added"
    });

  } catch (err) {
    return jsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

function doGet() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Entries");

  const values = sheet.getDataRange().getValues();

  return jsonResponse({
    success: true,
    data: values
  });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
