/**
 * ▼ 캠페인 설정 — A·B·C·D 페이지가 이 파일을 함께 씁니다. 내용은 여기서만 고치면 됩니다.
 *   12월 반려견 캠페인 — 반려견 옷·방석·담요 등 섬유의 잔류세제 걱정 (11/13 브랜드 '추가 반려견 편' 요청 반영)
 *   브랜드 공통 내용(DO/DON'T, 해시태그, 정산)은 brands/resleep.js 에서 가져옵니다.
 *   값을 비워 두거나 지우면 해당 항목은 자동으로 숨겨집니다.
 *   타입·고료는 각 페이지(a~c-type.html)에서 정하고, 화면에는 표시되지 않고 신청서와 함께 시트에만 기록됩니다.
 *   d-type.html(통합 전달용)은 신청 폼 없이 가이드만 보여줍니다.
 */
window.CAMPAIGN = {
  id: '12월 반려견 캠페인',          // 구글시트 탭 이름으로도 쓰입니다
  pageTitle: '12월 반려견 캠페인 가이드라인',
  product: 'cleanbooster',
  format: '릴스 (Reels)',

  details: [
    ['업로드 기간', '<strong><span class="nb">11월 23일 ~ 26일</span></strong>']
  ],

  purpose: {
    title: '캠페인 목적&nbsp;·&nbsp;<span class="nb">반려견과 함께하는 섬유</span>',
    text: '반려견 옷을 가장 많이 챙기는 겨울 시즌이에요. <strong>반려견이 입는 옷, 쉬고 잠드는 방석&middot;담요</strong>까지 세탁 후 남을 수 있는 세제가 걱정됐던 경험을 중심으로, <strong>클린부스터</strong>를 소개해 주세요.'
  },

  recruit: [
    '<strong>반려견</strong>과 함께 지내시는 분 (필수)',
    '반려견이 <strong>옷을 입고 산책</strong>하거나 <strong>방석&middot;담요 등 섬유 위에서 쉬는 모습</strong>을 촬영할 수 있는 분',
    '<strong>본인 목소리로 더빙</strong> 가능하신 분 (AI 더빙 불가)'
  ],

  voiceRequired: true,    // 실제 목소리 더빙 필수
  cleanCutRequired: true, // 업로드 후 클린본 제출 필수

  coreRequest: '<strong>반려견이 옷을 입고 산책하거나, 방석&middot;담요 같은 섬유와 함께하는 모습</strong>을 잘 보여주세요. 잔류세제가 걱정됐던 <strong>내 경험</strong>을 <strong>차분히 설명하듯</strong> 내 목소리로 풀어주시고, 클린부스터를 소개할 때는 <strong>장면 전환을 빠르게 하지 말아주세요.</strong>',

  // '한눈에 보기 > 꼭 지켜주세요' (캡션·공동작업자 항목은 자동으로 붙습니다)
  checks: [
    '<strong>본인 목소리</strong>로 <strong>차분히 설명하듯</strong> 더빙 (AI 더빙 불가)',
    '썸네일&middot;첫 장면은 <strong>반려견 모습 + 화두</strong>',
    '반려견이 <strong>옷 입은 모습</strong>, <strong>방석&middot;담요 위에서 쉬는 모습</strong>',
    '걱정돼서 <strong>헹굼을 추가했던 경험</strong> (말 + 화면)',
    '영상 속 <strong>자막은 크게</strong>'
  ],

  // 브랜드가 '꼭 적용'을 요청한 2가지
  keyAsks: {
    title: '꼭 적용해 주세요 &mdash; 브랜드 중요 요청 2가지',
    intro: '아래 두 가지는 <strong>반드시</strong> 반영해 주세요.',
    items: [
      { title: '걱정했던 경험을 아래 기준에 맞춰 구체적으로',
        desc: '반려견 옷&middot;방석&middot;담요를 세탁하며 <strong>잔류세제가 걱정됐던 내 경험</strong>을 아래 상황 기준에 맞춰 풀어주세요.<br><strong>"치료된다&middot;해결된다"는 표현은 쓸 수 없어요</strong> &rarr; "이런 부분이 걱정된다"로 표현해 주세요.',
        situations: true },
      { title: '썸네일&middot;첫 장면은 반려견 모습 + 화두',
        desc: '썸네일과 영상 시작은 <strong>반려견이 옷을 입거나, 섬유 위에서 쉬거나 생활하는 모습</strong>과 함께 <strong>화두를 던지는 문장</strong>으로 시작해 주세요.<br>아래 참고 영상은 아이가 나오지만, <strong>반려견으로 바꿔서</strong> 표현해 주세요.',
        links: [
          ['https://www.instagram.com/reels/DfHoOKzNTwC/', '썸네일·도입부 참고 릴스 ①'],
          ['https://www.instagram.com/reels/DfHjiCrPtyh/', '썸네일·도입부 참고 릴스 ②']
        ] }
    ]
  },

  productOverrides: {
    url: 'https://brand.naver.com/resleep/products/13766794464',

    // 꼭 적용 1번의 상황 기준: [보호자가 걱정하는 상황, 무엇이 걱정되는지, 예시 문구]
    situationTable: [
      ['추워진 날씨에 산책복을 입힐 때', '다시 입힐 옷이라 오염 제거뿐 아니라 세탁 후 남을 수 있는 세제도 신경 쓰임', '“날이 추워지니까 산책할 때 옷부터 챙기게 돼요. 입고 나갔던 옷을 빨면서 세제가 충분히 헹궈졌는지도 살피게 되더라고요.”'],
      ['실내복을 입고 생활할 때', '몸에 닿아 있는 옷이라 세제 사용량과 헹굼 과정까지 챙기고 싶음', '“집에서도 입고 있는 옷이라, 깨끗하게 빠는 것뿐 아니라 헹굼까지 신경 쓰고 있어요.”'],
      ['옷의 목이나 소매 부분을 핥거나 물 때', '입 주변에 닿는 옷이라 세탁 후 남을 수 있는 성분이 걱정됨', '“가끔 소매 끝을 물기도 해서, 이 옷을 빨 때는 세제량이나 헹굼을 더 살피게 돼요.”'],
      ['겨울 담요에 얼굴을 묻고 잘 때', '코와 입 주변이 닿는 담요라 털 제거 외에 헹굼까지 관리하고 싶음', '“추워져서 꺼내준 담요에 얼굴을 묻고 자더라고요. 털을 떼고 빠는 것만큼 세제가 잘 헹궈졌는지도 챙기고 싶었어요.”'],
      ['사람과 함께 사용할 때', '반려동물 전용 용품뿐 아니라 함께 사용하는 섬유도 관리하고 싶음', '“자기 방석이 있어도 결국 제 담요, 쿠션 위에서 자더라고요. 그래서 함께 쓰는 담요도 헹굼까지 챙기고 있어요.”']
    ],
    // 반려견에게 관리가 필요하다고 느낀 이유 (참고용 예시) — 걱정 칸 없이 [제목, '', 예시]
    moreSituationsTitle: '관리가 필요하다고 느낀 이유',
    moreSituationsDesc: '실제로 반려견을 걱정하는 마음으로 <strong>내 말로</strong> 표현해 주세요.',
    moreSituationsIntro: '① 번이 브랜드가 <strong>가장 추천하는 방향</strong>이에요.',
    moreSituations: [
      ['어디가 불편한지 말해줄 수 없으니까 <span class="hl-text">(추천)</span>', '', '“저는 몸이 불편하면 어디가 어떻게 불편한지 말할 수 있잖아요. 그런데 우리 강아지는 그걸 말로 설명해줄 수 없으니까, 제가 평소에 조금 더 세심하게 살피게 돼요. 겨울이라 옷을 챙겨 입히면서도, 매일 몸에 닿는 옷인데 세제가 충분히 헹궈졌는지까지 신경 쓰이더라고요.”'],
      ['건강을 챙기는 마음으로, 몸에 닿는 것까지', '', '“건강하게 지냈으면 하는 마음에 먹는 것도 꼼꼼히 고르고, 산책도 챙기고 있어요. 그러다 보니 매일 입는 옷이나 얼굴을 묻고 자는 담요도 그냥 넘기고 싶지 않더라고요. 깨끗하게 빠는 것과 함께, 세탁 후 남을 수 있는 세제까지 관리하고 싶어졌어요.”'],
      ['작은 불편함도 놓치고 싶지 않아서', '', '“우리 강아지가 불편한 게 있어도 제가 바로 알아차리지 못할 수 있잖아요. 그래서 평소 먹고 자고 생활하는 것들을 조금 더 살펴보려고 해요. 겨울에 자주 입히는 옷도 그중 하나예요. 몸에 닿는 옷인 만큼 세제량부터 마지막 헹굼까지 챙기고 싶더라고요.”'],
      ['추위만 챙기다가, 옷의 관리까지 생각하게 됐어요', '', '“추워지면 감기라도 걸릴까 걱정돼서 산책할 때 옷부터 챙겼어요. 그런데 따뜻하게 입히는 것만 생각했지, 그 옷을 어떻게 세탁하고 헹구는지는 깊게 생각하지 않았더라고요. 건강을 신경 쓰는 마음으로 입히는 옷이니까, 세탁 마무리도 더 꼼꼼하게 챙겨주고 싶었어요.”'],
      ['피부 상태도 직접 설명해줄 수 없으니까', '', '“저는 피부가 불편하면 어떤 느낌인지 말할 수 있는데, 우리 강아지는 그럴 수 없잖아요. 그래서 목욕할 때나 옷을 갈아입힐 때 몸 상태를 살펴보게 돼요. 매일 입히는 옷도 세탁만 했다고 끝내기보다, 세제가 충분히 헹궈졌는지까지 챙기고 싶더라고요.”'],
      ['내가 대신 챙겨줘야 하는 부분이니까', '', '“우리 강아지는 몸이 불편해도 스스로 병원에 가거나 생활 습관을 바꿀 수 없잖아요. 제가 상태를 살피고 필요한 걸 챙겨줘야 하니까, 평소 생활용품도 더 꼼꼼히 보게 돼요. 이번 겨울에는 옷을 고르는 것뿐 아니라, 세탁 후 헹굼까지 신경 쓰고 있어요.”']
    ],
    situations: [],   // 10월용 상황 예시는 쓰지 않음
    situation: '',
    // 브리프 '브랜드 설명 _ 참고용' 탭 내용은 가이드에서 뺌
    emphasis: [],
    features: [],
    detailImage: null,
    // 브랜드 공통 DO 중 '아이 옷' 표현은 반려견 편과 맞지 않아 제외
    dos: window.BRAND.products.cleanbooster.dos.slice(1),

    flowTitle: '핵심 내용',
    flowRequests: [
      '<strong>잔류세제 제거</strong>에만 집중해 주세요. 부가 기능은 넣지 않아요.',
      '<strong>설명하듯 자연스러운 말투</strong>로 표현해 주세요. 브랜드 문구를 그대로 읽어 <strong>홍보 글처럼</strong> 들리지 않게 해주세요.',
      '반려견 섬유의 잔류세제가 걱정됐던 <strong>내 경험</strong>을 위 기준에 맞춰 구체적으로 풀어주세요. <strong class="hl-text">(꼭 적용)</strong>',
      '걱정돼서 <strong>헹굼을 추가했던 경험</strong>을 말과 화면으로 꼭 보여주세요.',
      '<strong>잔류세제 96.3% 제거</strong>와 <strong>작용 원리(4 STEP)</strong>를 상세 페이지 표현을 활용해 설명해 주세요.',
      '더빙은 <strong>본인 목소리</strong>로, <strong>차분하게 설명하듯</strong> 해주세요.'
    ],

    // 브리프 '작용 원리' — 캡처는 이해용, 영상에서는 상세 페이지 표현으로 설명
    principle: {
      title: '작용 원리, 이렇게 설명해 주세요',
      base: '시간이 지나면서 섬유에는 <strong>세제&middot;섬유유연제&middot;먼지&middot;피지</strong> 같은 잔류세제와 잔여물이 쌓여요. 클린부스터는 아래 4단계로 잔여물을 제거하고, 다시 달라붙는 것을 막아요.',
      steps: [
        ['LOOSEN', '잔여물이 떨어지기 쉬운 상태로 <strong>pH 환경을 조절</strong>'],
        ['RELEASE', '세제와 무기질 등에 얽힌 잔여물의 <strong>결합을 느슨하게</strong> 풀기'],
        ['DISPERSE', '떨어져 나온 잔여물이 다시 뭉치지 않도록 <strong>헹굼수에 분산</strong>'],
        ['PROTECT', '분리된 잔여물이 다시 섬유에 달라붙는 <strong>재침착 방지</strong>']
      ],
      outro: '정리하면, 얽혀 있는 잔여물의 결합을 느슨하게 해 <strong>잔류세제와 잔여물이 떨어져 나오게</strong> 하고, 분리된 잔여물이 <strong>다시 붙지 않고 배출</strong>되도록 돕는 원리예요.'
    },

    scenario: {
      title: '콘텐츠 흐름',
      unit: '단계',
      capLabel: '자막 예시',
      intro: '아래 순서로 이어가 주세요. 멘트와 자막은 <strong>예시</strong>이니 내 말투로 바꿔도 돼요.',
      flow: '썸네일&middot;화두 &rarr; 96.3% &rarr; 걱정 경험 &rarr; 작용 원리 &rarr; 후기 &rarr; 사용법 &rarr; 추천 이유',
      footnote: '* 기존 세탁세제 단독 사용 대비',
      cuts: [
        ['썸네일&middot;도입 &mdash; 반려견 모습 + 화두 <span class="hl-text">(꼭 적용)</span>', '썸네일과 첫 장면에 <strong>옷을 입은 반려견</strong>이나 <strong>방석&middot;담요 위에서 쉬는 모습</strong>을 보여주며 화두를 던져요.', '"매일 입는 산책복이랑 얼굴 묻고 자는 담요, 세제는 제대로 헹궈졌을까요?"', '매일 입고 덮는 섬유, 세제는 다 헹궈졌을까?'],
        ['클린부스터 &middot; 잔류세제 96.3% 제거', '제품과 <strong>상세 페이지의 96.3% 결과</strong>를 보여줘요. 숫자가 충분히 읽히도록 천천히 보여주세요.', '"기존 세탁세제만 썼을 때보다 잔류세제를 96.3% 제거해 준다고 해서 써보고 있어요."', '잔류세제 제거율 96.3%*'],
        ['걱정했던 경험 + 헹굼 추가', '위 <strong>상황 기준</strong>에 맞춘 내 경험을 이야기하고, <strong>헹굼 횟수를 늘리는 화면</strong>을 꼭 넣어요.', '"어디가 불편한지 말해줄 수 없으니까, 혹시나 하는 마음에 헹굼을 더 추가하기도 했어요."', '혹시나 하는 마음에, 헹굼 한 번 더'],
        ['작용 원리 &mdash; 4 STEP', '상세 페이지의 4 STEP 이미지를 보여주며 <strong>차분히 설명</strong>해요.', '"섬유에 쌓인 세제&middot;유연제 잔여물의 결합을 느슨하게 풀어 떨어뜨리고, 헹굼물에 흩어지게 한 다음 다시 달라붙지 않게 해준대요."', '풀고 &rarr; 떼어내고 &rarr; 흘려보내고 &rarr; 다시 붙지 않게'],
        ['후기 &mdash; 향&middot;기능', '직접 써본 느낌을 <strong>내 말로</strong> 이야기해요. <strong>향과 기능</strong>을 함께 담아주세요.', '"잔류세제 제거 기능이 마음에 드는데, 쓰고 나서 담요가 부들부들해진 느낌이에요. 향도 강하지 않은 은은한 피톤치드 향이라 빨래 꺼낼 때 기분이 좋아요."', ''],
        ['사용법', '용기를 <strong>눌러 계량부에 액체가 올라오는 화면</strong> &rarr; <strong>섬유유연제 칸에 넣는 화면</strong>.', '"기능이 달라서 쓰던 세제랑 유연제는 바꿀 필요 없이, 평소 루틴에 클린부스터만 더해서 쓰고 있어요."', '① 꾹 눌러 계량 ② 유연제 칸에 투입'],
        ['추천 이유', '왜 추천하는지 <strong>한두 문장</strong>으로 정리해요.', '"매일 입고 덮는 거니까, 이제는 마지막 헹굼까지 챙겨주고 있어요."', '']
      ]
    },

    mustShots: [
      ['반려견과 섬유', '반려견이 <strong>옷을 입고 산책</strong>하거나 <strong>방석&middot;담요 위에서 쉬는</strong> 모습을 잘 보여주세요.'],
      ['헹굼을 추가하는 화면', '잔류세제가 걱정돼 <strong>헹굼 횟수를 늘리는</strong> 모습을 화면으로 보여주세요.'],
      ['정돈된 반려견 섬유', '반려견 옷, 방석, 담요 등 <strong>자주 몸에 닿는 섬유</strong>를 정돈된 모습으로 보여주세요.'],
      ['세탁실', '세탁 환경을 보여줄 수 있도록 <strong>세탁실</strong>을 촬영해 주세요.'],
      ['제품을 눌러 계량하는 장면', '용기를 눌러 <strong>액체가 계량부로 올라오는 장면</strong>을 담아주세요.'],
      ['섬유유연제 칸에 넣는 장면', '계량한 클린부스터를 <strong>섬유유연제 투입구</strong>에 넣는 장면을 담아주세요.'],
      ['96.3% 결과와 작용 원리', '<strong>상세 페이지</strong>의 96.3% 결과와 4 STEP 원리를 보여주세요. <strong>96.3%는 가장 크게</strong>, 천천히 보여주세요.']
    ],
    proofImages: [
      ['image/detail-residue-96-3.png', '잔류세제 제거율 96.3%'],
      ['image/proof-4step.png', '작용 원리 · 4 STEP'],
      ['image/example-rinse-added.jpg', '헹굼 추가 화면 예시']
    ],
    proofNote: '이해를 돕기 위한 참고 이미지예요. 그대로 쓰지 말고, 영상에는 <strong>상세 페이지</strong>를 직접 캡처해 활용해 주세요.',

    moodIntro: '장면 전환은 <strong>천천히</strong>, <strong>차분히 설명하듯</strong> 촬영해 주세요.',
    mood: [
      '<strong>화이트&middot;아이보리 계열</strong>의 실제 생활 공간에서 <strong>자연광 중심</strong>으로 촬영합니다.',
      '반려견 옷, 방석, 담요, 빨래바구니 정도로 소품을 간결하게 구성하고, <strong>보라색 용기</strong>가 자연스럽게 눈에 들어오도록 합니다.',
      '반려견&middot;손&middot;세탁기&middot;옷감&middot;제품 사용 장면을 충분히 섞어주세요.',
      '빠른 컷 전환이나 빠른 말투보다, 클린부스터를 <strong>차분히 설명</strong>하는 흐름을 원해요.'
    ],
    references: [
      ['https://www.youtube.com/shorts/0tJpoe77D5M', '차분히 설명하는 흐름 예시 (쇼츠)'],
      ['https://www.instagram.com/reel/DYg7Gsoycsf/', '세탁 환경을 잘 표현한 참고 릴스']
    ],

    usage: Object.assign({}, window.BRAND.products.cleanbooster.usage, {
      intro: window.BRAND.products.cleanbooster.usage.intro + '<br>세제나 섬유유연제가 아니라 <strong>헹굼 보조제</strong>예요. 쓰던 세제&middot;유연제는 그대로 두고 기존 루틴에 더해 주세요.'
    })
  },

  extraDonts: [
    '"치료된다&middot;해결된다" 같은 표현 금지 (이런 부분이 걱정된다는 표현으로)',
    '잔류세제가 반려견 피부질환&middot;알레르기의 원인이라는 직접적인 인과 표현 금지'
  ],

  promo: null,            // 할인 기획전 없음

  application: {
    enabled: true,
    gasUrl: 'https://script.google.com/macros/s/AKfycbwt202UzFI0ON1AlCt06ecvDWHS99TOKSXL2qovpwGFAMvqQqGY0zFRkz3IGrYIzlUw4w/exec',
    // 브랜드 요청: 반려견 모습, 옷 보유, 방석 같은 섬유에서 쉬는지 미리 확인
    questions: [
      { key: 'voice', label: '실제 목소리 더빙 가능 여부', sheetLabel: '더빙 가능', type: 'radio', required: true,
        options: ['가능', '불가능'] },
      { key: 'dog', label: '반려견 정보', sheetLabel: '반려견 정보', type: 'text', required: true,
        placeholder: '예: 말티즈 / 3살 / 1마리' },
      { key: 'clothes', label: '반려견 옷 보유', sheetLabel: '반려견 옷', type: 'radio', required: true,
        options: ['여러 벌 있고 자주 입혀요', '몇 벌 있어요', '없어요'] },
      { key: 'fabric', label: '반려견이 주로 쉬는 곳', sheetLabel: '쉬는 섬유', type: 'checkbox', required: true,
        help: '해당하는 곳을 모두 선택해 주세요.',
        options: ['방석', '담요', '쿠션', '반려견 침대', '보호자 침구·소파', '기타'] },
      { key: 'dogpost', label: '반려견이 나온 게시물 링크', sheetLabel: '반려견 게시물', type: 'text', required: false,
        placeholder: '옷 입은 모습이나 방석·담요 위 모습이 보이는 게시물이면 좋아요' }
    ]
  }
};
