/**
 * 범용 캠페인 신청서 → 구글시트 연동 (한 번만 배포해서 모든 캠페인에 재사용)
 *
 * - 신청서가 보낸 캠페인 이름(campaign)으로 시트 탭을 자동으로 만들고, 그 탭에 저장합니다.
 * - 열(헤더)은 신청서 항목 이름 그대로 자동 생성됩니다. 캠페인마다 질문이 달라도 코드를 고칠 필요가 없습니다.
 * - 모든 값은 텍스트로 저장해 휴대폰·우편번호의 앞자리 0이 사라지지 않습니다.
 *
 * 설치 방법 (최초 1회)
 * 1) 신청서를 모을 구글 스프레드시트를 새로 만들기 → 확장 프로그램 > Apps Script
 * 2) 기본 코드를 지우고 이 파일 내용을 전체 붙여넣기 → 저장
 * 3) 배포 > 새 배포 → 유형: 웹 앱
 *    - 실행 계정: 나(본인)
 *    - 액세스 권한이 있는 사용자: 모든 사용자
 * 4) 발급된 웹 앱 URL을 각 캠페인 페이지의 application.gasUrl 에 붙여넣기
 *    (같은 URL을 모든 캠페인에 그대로 쓰면 됩니다)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var contents = Utilities.newBlob(Utilities.base64Decode(e.postData.contents)).getDataAsString('UTF-8');
    var data = JSON.parse(contents);
    var tabName = String(data.campaign || '신청서').replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 90);
    var fields = data.fields || [];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);

    // 헤더 준비: 없는 항목은 오른쪽에 열을 추가
    var headers = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String)
      : ['접수일시'];
    fields.forEach(function (f) {
      if (headers.indexOf(f[0]) === -1) headers.push(f[0]);
    });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);

    var row = headers.map(function (h) {
      if (h === '접수일시') return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
      for (var i = 0; i < fields.length; i++) if (fields[i][0] === h) return String(fields[i][1] == null ? '' : fields[i][1]);
      return '';
    });
    var next = sheet.getLastRow() + 1;
    var range = sheet.getRange(next, 1, 1, row.length);
    range.setNumberFormat('@');
    range.setValues([row]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
