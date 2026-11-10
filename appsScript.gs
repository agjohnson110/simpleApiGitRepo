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

    // Validate secret without changing anything
    if (data.action === "validate") {
      return jsonResponse({
        success: true
      });
    }

    // Add a row
    if (data.action === "addRecord") {

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
    }

    return jsonResponse({
      success: false,
      error: "Unknown action"
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
