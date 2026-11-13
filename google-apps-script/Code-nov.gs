/**
 * 리슬립 캠페인 신청서 → 구글시트 연동 ([응답] 리슬립 11월 스프레드시트)
 * 스프레드시트: https://docs.google.com/spreadsheets/d/1jTNNjWFGIqxM3aes_O5-i2f7HtXwKTy_REQmm-OExm8/edit
 *
 * - 신청서가 보낸 탭 이름(campaign)으로 저장합니다: '11월 자체 기획전', '12월 (프레스키트)', '12월 (반려견)'
 * - 탭이 비어 있으면 그 캠페인에 맞는 컬럼을 먼저 만들고, 고료(5만 → 10만 → 20만) 순으로 묶어 정렬합니다.
 * - 휴대폰·우편번호는 텍스트로 저장해 앞자리 0이 사라지지 않습니다.
 *
 * 코드를 바꾼 뒤에는
 * 1) 확장 프로그램 > Apps Script 에서 기존 코드를 지우고 이 파일 전체를 붙여넣기 → 저장
 * 2) 위쪽 함수 선택에서 'setupColumns' 실행 → 비어 있는 탭에 컬럼이 만들어집니다
 * 3) (선택) 'testDecember' 실행 → 12월 두 탭에 A·B·C 테스트 행이 들어갑니다. 확인 후 'deleteTests' 실행
 * 4) 배포 > 배포 관리 > 연필(수정) > 버전: 새 버전 > 배포
 *    ('새 배포'를 누르면 URL이 바뀌니 꼭 '배포 관리'에서 수정해 주세요)
 */

// 탭별 컬럼 — 신청서 항목 이름(sheetLabel)과 같아야 해당 칸에 들어갑니다
var TAB_HEADERS = {
  '11월 자체 기획전': ['접수일시', '타입', '고료', '이름', '인스타그램', '휴대폰', '이메일',
    '더빙 가능', '자녀 연령', '반려동물', '우편번호', '주소', '요청사항'],
  '12월 (프레스키트)': ['접수일시', '타입', '고료', '이름', '인스타그램', '휴대폰', '이메일',
    '활동 분야', '촬영 의류', '우편번호', '주소', '요청사항'],
  '12월 (반려견)': ['접수일시', '타입', '고료', '이름', '인스타그램', '휴대폰', '이메일',
    '더빙 가능', '반려견 정보', '반려견 옷', '쉬는 섬유', '반려견 게시물', '우편번호', '주소', '요청사항']
};
var DEFAULT_TAB = '11월 자체 기획전';
var TEXT_COLUMNS = ['휴대폰', '우편번호'];
var TEST_MARK = '[테스트]';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var contents = Utilities.newBlob(Utilities.base64Decode(e.postData.contents)).getDataAsString('UTF-8');
    var data = JSON.parse(contents);
    var sheet = prepareSheet(data.campaign || DEFAULT_TAB);
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

// 탭이 없거나 비어 있으면 그 탭에 맞는 컬럼(헤더)을 만들어 둡니다
function prepareSheet(tabName) {
  var name = String(tabName).replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 90);
  var headers = TAB_HEADERS[name] || TAB_HEADERS[DEFAULT_TAB];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      .setFontWeight('bold').setBackground('#EFEAFA');
    sheet.setFrozenRows(1);
    TEXT_COLUMNS.forEach(function (h) {
      sheet.getRange(2, headers.indexOf(h) + 1, sheet.getMaxRows() - 1, 1).setNumberFormat('@');
    });
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(headers.indexOf('인스타그램') + 1, 220);
    sheet.setColumnWidth(headers.indexOf('주소') + 1, 280);
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

// 비어 있는 탭에 컬럼 만들기 (이미 내용이 있는 탭은 건드리지 않음)
function setupColumns() {
  Object.keys(TAB_HEADERS).forEach(prepareSheet);
}

function sendTest(tab, tier, price, extra) {
  var fields = [
    ['타입', tier], ['고료', price],
    ['이름', TEST_MARK + ' ' + tier + '타입'], ['인스타그램', 'https://instagram.com/test_' + tier.toLowerCase()],
    ['휴대폰', '010-0000-0000'], ['이메일', '']
  ].concat(extra).concat([['우편번호', '01234'], ['주소', '테스트 주소'], ['요청사항', '연동 테스트 — 확인 후 삭제']]);
  var e = { postData: { contents: Utilities.base64Encode(JSON.stringify({ campaign: tab, fields: fields }), Utilities.Charset.UTF_8) } };
  var res = JSON.parse(doPost(e).getContent());
  if (res.status !== 'ok') throw new Error(tab + ' ' + tier + '타입 테스트 실패: ' + res.message);
}

// 12월 두 탭에 실제 신청서와 같은 형식으로 A·B·C 테스트 신청을 한 건씩 넣습니다 (일부러 섞어서 넣어 정렬도 확인)
function testDecember() {
  [['C', '20만원'], ['A', '5만원'], ['B', '10만원']].forEach(function (t) {
    sendTest('12월 (프레스키트)', t[0], t[1], [['활동 분야', '캠핑, 패션'], ['촬영 의류', '다운 패딩, 캐시미어 니트']]);
    sendTest('12월 (반려견)', t[0], t[1], [['더빙 가능', '가능'], ['반려견 정보', '말티즈 / 3살 / 1마리'],
      ['반려견 옷', '여러 벌 있고 자주 입혀요'], ['쉬는 섬유', '방석, 담요'], ['반려견 게시물', '']]);
  });
}

// 모든 탭에서 이름이 [테스트]로 시작하는 행만 지웁니다
function deleteTests() {
  Object.keys(TAB_HEADERS).forEach(function (tab) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab);
    if (!sheet || sheet.getLastRow() < 2) return;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
    var nameCol = headers.indexOf('이름');
    if (nameCol === -1) return;
    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    for (var i = values.length - 1; i >= 0; i--) {
      if (String(values[i][nameCol]).indexOf(TEST_MARK) === 0) sheet.deleteRow(i + 2);
    }
  });
}
