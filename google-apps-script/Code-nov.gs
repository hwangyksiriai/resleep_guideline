/**
 * 리슬립 11월 자체 기획전 신청서 → 구글시트 연동
 * 스프레드시트: https://docs.google.com/spreadsheets/d/1jTNNjWFGIqxM3aes_O5-i2f7HtXwKTy_REQmm-OExm8/edit
 *
 * - 신청이 들어오면 '11월 자체 기획전' 탭에 저장하고, 고료(5만 → 10만 → 20만) 순으로 묶어 정렬합니다.
 * - 휴대폰·우편번호는 텍스트로 저장해 앞자리 0이 사라지지 않습니다.
 *
 * 처음 한 번
 * 1) 확장 프로그램 > Apps Script 에서 기존 코드를 지우고 이 파일 전체를 붙여넣기 → 저장
 * 2) 위쪽 함수 선택에서 'setupColumns' 실행 → 탭과 컬럼이 만들어집니다
 * 3) 'testByFee' 실행 → A·B·C 고료별 테스트 행 3개가 들어갑니다. 확인 후 'deleteTests' 실행
 * 4) 배포 > 배포 관리 > 연필(수정) > 버전: 새 버전 > 배포
 *    ('새 배포'를 누르면 URL이 바뀌니 꼭 '배포 관리'에서 수정해 주세요)
 */

var TAB_NAME = '11월 자체 기획전';
var HEADERS = ['접수일시', '타입', '고료', '이름', '인스타그램', '휴대폰', '이메일',
  '더빙 가능', '자녀 연령', '반려동물', '우편번호', '주소', '요청사항'];
var TEXT_COLUMNS = ['휴대폰', '우편번호'];
var TEST_MARK = '[테스트]';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var contents = Utilities.newBlob(Utilities.base64Decode(e.postData.contents)).getDataAsString('UTF-8');
    var data = JSON.parse(contents);
    var sheet = prepareSheet(data.campaign || TAB_NAME);
    var fields = data.fields || [];

    // 정해진 컬럼에 없는 항목이 오면 오른쪽에 컬럼을 추가
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
    fields.forEach(function (f) {
      if (headers.indexOf(f[0]) === -1) {
        headers.push(f[0]);
        sheet.getRange(1, headers.length).setValue(f[0]).setFontWeight('bold');
      }
    });

    var row = headers.map(function (h) {
      if (h === '접수일시') return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
      for (var i = 0; i < fields.length; i++) if (fields[i][0] === h) return String(fields[i][1] == null ? '' : fields[i][1]);
      return '';
    });
    var range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    range.setNumberFormat('@');
    range.setValues([row]);

    sortByPrice(sheet);
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 탭이 없거나 비어 있으면 컬럼(헤더)을 만들어 둡니다
function prepareSheet(tabName) {
  var name = String(tabName).replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 90);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
      .setFontWeight('bold').setBackground('#EFEAFA');
    sheet.setFrozenRows(1);
    TEXT_COLUMNS.forEach(function (h) {
      sheet.getRange(2, HEADERS.indexOf(h) + 1, sheet.getMaxRows() - 1, 1).setNumberFormat('@');
    });
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(HEADERS.indexOf('인스타그램') + 1, 220);
    sheet.setColumnWidth(HEADERS.indexOf('주소') + 1, 280);
  }
  return sheet;
}

// 고료 오름차순, 같은 고료 안에서는 접수 순서대로
function sortByPrice(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 3) return;
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  var priceCol = headers.indexOf('고료') + 1;
  if (!priceCol) return;
  var range = sheet.getRange(2, 1, lastRow - 1, headers.length);
  var values = range.getValues();
  // 고료가 '5만원' 같은 글자라 숫자만 뽑아 비교 (글자 정렬이면 10만 < 20만 < 5만이 됨)
  values.sort(function (a, b) {
    return parsePrice(a[priceCol - 1]) - parsePrice(b[priceCol - 1]) || String(a[0]).localeCompare(String(b[0]));
  });
  range.setNumberFormat('@');
  range.setValues(values);
}

function parsePrice(value) {
  var digits = String(value).replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

// ---------- 편집기에서 직접 실행하는 함수 ----------

// 탭과 컬럼 만들기

function setupColumns() {
  prepareSheet(TAB_NAME);
}

// 실제 신청서와 같은 형식으로 A·B·C 고료별 테스트 신청을 한 건씩 넣습니다
function testByFee() {
  var tiers = [['C', '20만원'], ['A', '5만원'], ['B', '10만원']]; // 일부러 섞어서 넣어 정렬도 확인
  tiers.forEach(function (t) {
    var payload = {
      campaign: TAB_NAME,
      fields: [
        ['타입', t[0]], ['고료', t[1]],
        ['이름', TEST_MARK + ' ' + t[0] + '타입'], ['인스타그램', 'https://instagram.com/test_' + t[0].toLowerCase()],
        ['휴대폰', '010-0000-0000'], ['이메일', ''],
        ['더빙 가능', '가능'], ['자녀 연령', '1~3세'], ['반려동물', ''],
        ['우편번호', '01234'], ['주소', '테스트 주소'], ['요청사항', '연동 테스트 — 확인 후 삭제']
      ]
    };
    var e = { postData: { contents: Utilities.base64Encode(JSON.stringify(payload), Utilities.Charset.UTF_8) } };
    var res = JSON.parse(doPost(e).getContent());
    if (res.status !== 'ok') throw new Error(t[0] + '타입 테스트 실패: ' + res.message);
  });
}

// 이름이 [테스트]로 시작하는 행만 지웁니다
function deleteTests() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB_NAME);
  if (!sheet || sheet.getLastRow() < 2) return;
  var nameCol = HEADERS.indexOf('이름');
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (String(values[i][nameCol]).indexOf(TEST_MARK) === 0) sheet.deleteRow(i + 2);
  }
}
