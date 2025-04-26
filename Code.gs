
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var folder = DriveApp.getFolderById("1tnw-RJzXVlNA5ZhermPQ3A4PxaFsedUO");
  var videoBlob = Utilities.newBlob(Utilities.base64Decode(data.oath_video_data), "video/mp4", data.oath_video_name);
  var file = folder.createFile(videoBlob);
  var videoUrl = file.getUrl();

  sheet.appendRow([
    data.name,
    data.father_name,
    data.address,
    data.permanent_address,
    data.email,
    data.parent_mobile,
    data.guardian_mobile,
    data.previous_team,
    data.facebook_link,
    data.verification,
    data.birth_certificate,
    data.birth_date,
    data.photo,
    data.teamRespectConsent,
    videoUrl,
    data.id
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
