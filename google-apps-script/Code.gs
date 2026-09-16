/**
 * 리슬립 캠페인 신청서 → 구글시트 연동
 * 스프레드시트: https://docs.google.com/spreadsheets/d/1yi-2p_KWBN3Vph9HCWXdi3o01Hnj4pjVxL7UckKUPSQ/edit
 *
 * 설치 방법
 * 1) 위 스프레드시트 열기 → 확장 프로그램 > Apps Script
 * 2) 기본 생성된 코드를 지우고 이 파일 내용을 전체 붙여넣기
 * 3) 상단 "배포 > 새 배포" → 유형: 웹 앱
 *    - 실행 계정: 나(본인)
 *    - 액세스 권한이 있는 사용자: 모든 사용자
 * 4) 배포 후 발급되는 웹 앱 URL을 복사
 * 5) a-type.html / b-type.html / c-type.html 안의 GAS_WEB_APP_URL 에 붙여넣기
 */

var SPREADSHEET_ID = '1yi-2p_KWBN3Vph9HCWXdi3o01Hnj4pjVxL7UckKUPSQ';
var SHEET_NAME = '시트1';
var HEADERS = ['접수일시', '타입', '고료', '이름', '인스타그램', '휴대폰', '이메일', '우편번호', '주소', '요청사항'];

function doPost(e) {
  try {
    // e.postData.contents는 멀티바이트(한글) 문자가 깨지는 경우가 있어
    // 원본 바이트를 UTF-8로 직접 디코딩해서 사용합니다.
    var contents = Utilities.newBlob(e.postData.getBytes()).getDataAsString('UTF-8');
    var data = JSON.parse(contents);
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      // 휴대폰·우편번호는 앞자리 0이 보존되도록 텍스트 서식 고정
      sheet.getRange(2, 6, 2000, 1).setNumberFormat('@');
      sheet.getRange(2, 8, 2000, 1).setNumberFormat('@');
    }

    sheet.appendRow([
      new Date(),
      data.tier || '',
      data.price || '',
      data.name || '',
      data.instagram || '',
      String(data.phone || ''),
      data.email || '',
      String(data.zipcode || ''),
      data.address || '',
      data.note || ''
    ]);

    sortByPrice(sheet);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 고료(가격) 오름차순으로 정렬해, 같은 고료 신청 건끼리 모이도록 유지
function sortByPrice(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = HEADERS.length;
  if (lastRow < 3) return;

  var range = sheet.getRange(2, 1, lastRow - 1, lastCol);
  var values = range.getValues();

  values.sort(function (a, b) {
    return parsePrice(a[2]) - parsePrice(b[2]);
  });

  range.setValues(values);
}

function parsePrice(value) {
  var digits = String(value).replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}
