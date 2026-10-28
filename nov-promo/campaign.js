/**
 * ▼ 캠페인 설정 — A·B·C·D 페이지가 이 파일을 함께 씁니다. 내용은 여기서만 고치면 됩니다.
 *   브랜드 공통 내용(제품 핵심 내용, 상황 예시, 시나리오, DO/DON'T, 해시태그, 정산)은 brands/resleep.js 에서 가져옵니다.
 *   값을 비워 두거나 지우면 해당 항목은 자동으로 숨겨집니다.
 *   타입·고료는 각 페이지(a~c-type.html)에서 정하고, 화면에는 표시되지 않고 신청서와 함께 시트에만 기록됩니다.
 *   d-type.html(통합 전달용)은 신청 폼 없이 가이드만 보여줍니다.
 */
window.CAMPAIGN = {
  id: '11월 자체 기획전',            // 구글시트 탭 이름으로도 쓰입니다
  pageTitle: '11월 기획전 가이드라인',
  product: 'cleanbooster',
  format: '릴스 (Reels)',

  details: [
    ['캠페인 기간', '<strong><span class="nb">11월 9일 ~ 22일</span></strong>']
  ],

  purpose: {
    title: '캠페인 목적&nbsp;·&nbsp;<span class="nb">자체 기획전</span>',
    text: '리슬립 <strong>자체 기획전</strong>과 함께 진행하는 <strong>클린부스터</strong> 릴스 캠페인입니다. 메인 메시지는 <strong>잔류세제 96.3% 제거</strong>이고, 영상 마지막에 기획전 할인 소식을 함께 전달해 주세요.'
  },
  overviewItems: [
    ['메인 상품', '잔류세제제거 4X 초고농축 <strong>클린부스터</strong>'],
    ['최대 할인율', '<strong>최대 53%</strong>']
  ],

  recruit: [
    '<strong>본인의 실제 목소리로 더빙</strong>이 가능하신 분 (AI 더빙 불가)',
    '<strong>어린 자녀</strong>가 있으신 분 &mdash; <strong>영유아 자녀를 더 희망</strong>하며, 초등학생 이상 자녀는 해당되지 않아요.',
    '반려견&middot;반려묘 여부는 신청서에서 <strong>체크만</strong> 해주세요.'
  ],

  childRequired: true,   // 아이와 함께 촬영 필수 강조
  voiceRequired: true,   // 실제 목소리 더빙 필수

  coreRequest: '<strong>아이와 함께 촬영</strong>하는 것이 이번 캠페인의 메인이에요. 핵심 기능인 <strong>잔류세제 제거 96.3%</strong>에 집중하고, <strong>잔류세제가 걱정됐던 실제 상황</strong>을 중심으로 <strong>본인의 실제 목소리</strong>로 클린부스터를 풀어가 주세요.',

  promo: {
    name: '리슬립 자체 기획전',
    sayName: '리슬립 기획전',
    period: '',            // 기획전 할인 기간 확정 시 입력 (예: '11월 9일 ~ 22일')
    maxDiscount: '53%',
    link: '',              // 할인 링크 확정 시 입력
    images: []             // 예: [['image/파일명.jpg', '기획전 메인']]
  },

  application: {
    enabled: true,
    gasUrl: '',            // google-apps-script/Code-universal.gs 배포 후 웹 앱 URL 입력
    questions: [
      { key: 'voice', label: '실제 목소리 더빙 가능 여부', sheetLabel: '더빙 가능', type: 'radio', required: true,
        options: ['가능', '불가능'] },
      { key: 'child', label: '자녀 연령', sheetLabel: '자녀 연령', type: 'checkbox', required: true,
        help: '자녀가 여러 명이면 모두 선택해 주세요.',
        options: ['0~12개월', '1~3세', '4~7세 (미취학)', '초등학생 이상', '자녀 없음'] },
      { key: 'pet', label: '반려동물', sheetLabel: '반려동물', type: 'checkbox', required: true,
        options: ['반려견', '반려묘', '없음'] }
    ]
  }
};
