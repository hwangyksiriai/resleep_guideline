/**
 * ▼ 캠페인 설정 — A·B·C·D 페이지가 이 파일을 함께 씁니다. 내용은 여기서만 고치면 됩니다.
 *   12월 프레스키트 캠페인 — 기능성 의류(아웃도어·캠핑) 발수 저하와 마지막 헹굼
 *   (11/13 브랜드 '기능성 의류 헹굼의 과학' 에디토리얼 가이드 반영. 11월 육아 필수 조건은 적용하지 않음, 할인 기획전 없음)
 *   브랜드 공통 내용(DO/DON'T, 해시태그, 정산)은 brands/resleep.js 에서 가져옵니다.
 *   값을 비워 두거나 지우면 해당 항목은 자동으로 숨겨집니다.
 *   타입·고료는 각 페이지(a~c-type.html)에서 정하고, 화면에는 표시되지 않고 신청서와 함께 시트에만 기록됩니다.
 *   d-type.html(통합 전달용)은 신청 폼 없이 가이드만 보여줍니다.
 */
window.CAMPAIGN = {
  id: '12월 프레스키트',            // 구글시트 탭 이름으로도 쓰입니다
  pageTitle: '12월 프레스키트 가이드라인',
  product: 'cleanbooster',
  format: '릴스 (Reels)',

  details: [
    ['진행 기간', '<strong><span class="nb">12월 초</span></strong> 진행 예정']
  ],

  // 프레스키트는 판매용이 아닌 시딩용이지만, 페이지에는 '참여 인플루언서에게만 드리는 스페셜 키트'로 안내
  glanceRows: [
    ['제공 제품', '<strong>클린부스터 프레스키트</strong><br><span class="nb">15만원 상당</span> &middot; 인플루언서 전용 스페셜 키트'],
    ['키트 일정', '<span class="nb">11월 25일</span> 생산 완료 예정<br><strong><span class="nb">11월 27일</span></strong> 출고 가능 예정']
  ],

  purpose: {
    title: '캠페인 목적&nbsp;·&nbsp;<span class="nb">기능성 의류의 마지막 헹굼</span>',
    text: '이번 캠페인만을 위해 특별히 제작한 <strong>클린부스터 프레스키트</strong>를 <strong>참여 인플루언서분들께만</strong> 보내드려요. 아웃도어&middot;캠핑에서 입는 <strong>기능성 의류</strong>를 통해, 세탁 후 남을 수 있는 세제와 <strong>마지막 헹굼</strong>의 중요성을 이야기해 주세요.'
  },
  overviewItems: [
    ['제공 키트', '<strong>클린부스터 프레스키트</strong> (15만원 상당)<br>참여 인플루언서에게만 제공되는 <strong>한정 스페셜 키트</strong>예요.'],
    ['키트 일정', '11월 25일 생산 완료 예정 &rarr; <strong>11월 27일 출고 가능 예정</strong> &rarr; 12월 초 진행']
  ],

  recruit: [
    '<strong>아웃도어&middot;캠핑&middot;등산&middot;러닝</strong> 등을 즐기며 <strong>기능성 의류</strong>(방수&middot;발수 재킷 등)를 입고 직접 관리하시는 분',
    '기능성 의류를 <strong>세탁하는 과정</strong>과 <strong>원단 위 물방울</strong>을 촬영할 수 있는 분'
  ],

  // 본인 목소리 더빙 필수는 이번 브리프에 없어 적용하지 않음 (voiceRequired 없음)
  cleanCutRequired: true, // 업로드 후 클린본 제출 필수

  coreRequest: '"깨끗하게 세탁했는데도, <strong>왜 물방울은 예전처럼 굴러가지 않을까?</strong>"라는 질문에서 시작해 주세요. 발수 저하의 원인이 마모만은 아닐 수 있다는 것, 그래서 아웃도어 브랜드들이 <strong>충분한 헹굼</strong>을 권한다는 것을 <strong>차분히 설명하듯</strong> 풀어주세요.',

  // '한눈에 보기 > 꼭 지켜주세요' (캡션·공동작업자 항목은 자동으로 붙습니다)
  checks: [
    '썸네일&middot;첫 장면은 <strong>기능성 의류 위 물방울 + 화두</strong>',
    '<strong>프레스키트 언박싱</strong> 장면 포함',
    '<strong>의류 라벨&middot;제조사 세탁 지침</strong>을 우선해서 세탁',
    '영상 속 <strong>자막은 크게</strong>'
  ],

  // 브랜드가 '꼭 적용'을 요청한 항목
  keyAsks: {
    title: '꼭 적용해 주세요',
    intro: '아래 두 가지는 <strong>반드시</strong> 반영해 주세요.',
    items: [
      { title: '썸네일&middot;첫 장면은 기능성 의류 위 물방울 + 화두',
        desc: '물방울이 <strong>또르르 굴러가지 않고 스며드는</strong> 재킷 표면을 클로즈업하며 질문을 던져 주세요.<br>예: "깨끗하게 빨았는데, 왜 물방울이 예전처럼 안 굴러갈까?" / "고어텍스 브랜드들이 두 번 헹구라고 하는 이유"' },
      { title: '프레스키트 언박싱',
        desc: '받은 <strong>프레스키트를 직접 여는 장면</strong>을 꼭 담아주세요. 키트 구성이 잘 보이도록 천천히 보여주세요.' }
    ]
  },

  productOverrides: {
    name: '클린부스터 프레스키트',
    volume: '15만원 상당',
    role: '참여 인플루언서에게만 드리는 스페셜 키트',

    brief: '좋은 옷을 선택하는 안목은<br><em>마지막 헹굼</em>까지 이어진다',
    briefSub: 'FUNCTIONAL WEAR CARE',

    // 육아 중심 11월 내용은 쓰지 않음
    situationTable: [],
    moreSituations: [],
    situations: [],
    situation: '',
    emphasis: [],
    features: [],
    detailImage: null,
    // 브랜드 공통 DO 중 아이·가족 세탁 표현은 이 캠페인과 맞지 않아 제외
    dos: window.BRAND.products.cleanbooster.dos.slice(2),

    flowTitle: '핵심 내용',
    flowRequests: [
      '<strong>증상</strong> &mdash; 처음엔 물방울이 굴러가던 재킷이 어느 순간 비를 머금기 시작해요. "발수 코팅이 닳았나?" 하는 익숙한 추측에 <strong>"정말 마모 때문일까?"</strong>라고 질문을 던져 주세요.',
      '<strong>근거</strong> &mdash; 아크테릭스&middot;노스페이스&middot;고어텍스 등 아웃도어 브랜드의 공식 세탁 가이드는 세제 잔여물이 남지 않도록 <strong>두 번 헹굼(충분한 헹굼)</strong>을 권해요.',
      '<strong>원리</strong> &mdash; 발수 표면은 물을 밀어내도록 만들어졌는데, 물을 끌어당기는 <strong>친수성 세제 잔여물</strong>이 남으면 물방울이 굴러떨어지지 않고 퍼지거나 머무를 수 있어요.',
      '<strong>변수</strong> &mdash; 수돗물의 칼슘&middot;마그네슘이 세정 성분과 만나 찌꺼기를 만들거나, 떨어진 오염이 다시 붙는 <strong>재침착</strong>도 생길 수 있어요. <strong>헹굼 횟수만으로는</strong> 모든 잔여물이 빠진다고 장담하기 어려워요.',
      '<strong>제언</strong> &mdash; 그래서 <strong>마지막 헹굼</strong>까지 관리해요. 여기서 잔류세제 제거를 돕는 <strong>클린부스터</strong>를 소개해 주세요. (잔류세제 96.3% 제거, 4 STEP 원리)',
      '정보를 전하듯 <strong>차분하게</strong> 풀어주세요. 브랜드 문구를 그대로 읽지 말고 내 말로 풀어주세요.'
    ],

    principle: {
      title: '클린부스터 작용 원리, 이렇게 설명해 주세요',
      base: '시간이 지나면서 섬유에는 <strong>세제&middot;섬유유연제&middot;먼지&middot;피지</strong> 같은 잔류세제와 잔여물이 쌓여요. 클린부스터는 아래 4단계로 잔여물을 제거하고, 다시 달라붙는 것을 막아요.',
      steps: [
        ['LOOSEN', '잔여물이 떨어지기 쉬운 상태로 <strong>pH 환경을 조절</strong>'],
        ['RELEASE', '세제와 무기질 등에 얽힌 잔여물의 <strong>결합을 느슨하게</strong> 풀기'],
        ['DISPERSE', '떨어져 나온 잔여물이 다시 뭉치지 않도록 <strong>헹굼수에 분산</strong>'],
        ['PROTECT', '분리된 잔여물이 다시 섬유에 달라붙는 <strong>재침착 방지</strong>']
      ],
      outro: '앞에서 말한 <strong>수질&middot;재침착</strong> 이야기와 자연스럽게 이어져요. 단, 클린부스터가 <strong>발수 성능을 되살린다고 단정하지는</strong> 말아주세요.'
    },

    scenario: {
      title: '콘텐츠 흐름',
      unit: '단계',
      capLabel: '자막 예시',
      intro: '아래 순서로 이어가 주세요. 멘트와 자막은 <strong>예시</strong>이니 내 말투로 바꿔도 돼요.',
      flow: '물방울 화두 &rarr; 언박싱 &rarr; 브랜드들의 두 번 헹굼 &rarr; 친수성 잔여물 &rarr; 헹굼만으론 부족한 이유 &rarr; 클린부스터 &middot; 96.3% &rarr; 사용법 &rarr; 마무리',
      theme: '"섬유에 무엇을 남기지 않을 것인가까지 고민할 때, 비로소 세탁은 완성된다"',
      footnote: '* 기존 세탁세제 단독 사용 대비',
      cuts: [
        ['물방울 화두 <span class="hl-text">(꼭 적용)</span>', '재킷 원단 위 <strong>물방울이 스며드는 모습</strong>을 클로즈업하며 질문을 던져요.', '"분명 깨끗하게 빨았는데, 왜 물방울이 예전처럼 안 굴러갈까요? 발수 코팅이 다 닳은 걸까요?"', '깨끗하게 빨았는데, 왜 물방울이 안 굴러갈까?'],
        ['프레스키트 언박싱 <span class="hl-text">(꼭 적용)</span>', '받은 <strong>프레스키트를 직접 여는 장면</strong>. 키트 구성이 잘 보이도록 천천히 꺼내 보여주세요.', '"이번에 리슬립에서 인플루언서에게만 보내주는 프레스키트를 받았어요."', '인플루언서에게만 온 리슬립 프레스키트'],
        ['브랜드들은 왜 두 번 헹굴까', '<strong>세탁 라벨</strong>이나 <strong>헹굼 설정 화면</strong>을 보여주며 이야기해요. 브랜드 로고&middot;사이트 캡처 대신 말로 전해 주세요.', '"찾아보니 아크테릭스나 고어텍스 같은 브랜드들이 세탁할 때 두 번 헹구라고 권하더라고요."', '아웃도어 브랜드들이 두 번 헹구라는 이유'],
        ['물을 밀어내는 표면, 물을 끌어당기는 잔여물', '물방울이 맺히는 원단과 퍼지는 원단을 비교하듯 보여줘요. 개념 설명 그래픽은 <strong>"개념도"</strong>로 표기해 주세요.', '"물을 밀어내야 하는 겉감에, 물을 끌어당기는 세제 잔여물이 남으면 물방울이 굴러가지 않고 퍼질 수 있대요."', '발수 표면 + 세제 잔여물 = 물방울이 퍼진다'],
        ['물로 여러 번 헹구면 충분할까', '헹굼을 추가하는 세탁기 화면과 함께, 수질&middot;재침착 이야기를 짧게 전해요.', '"그런데 수돗물 속 미네랄이 세정 성분과 만나 찌꺼기를 만들기도 하고, 떨어진 때가 다시 붙기도 해서 헹굼 횟수만으로는 한계가 있대요."', '헹굼 횟수만으로는 부족할 수 있어요'],
        ['클린부스터 &middot; 잔류세제 96.3% 제거', '제품과 <strong>상세 페이지의 96.3% 결과</strong>, 4 STEP 원리를 천천히 보여줘요.', '"그래서 마지막 헹굼 단계에 잔류세제 제거를 돕는 클린부스터를 더하고 있어요. 기존 세제만 썼을 때보다 잔류세제를 96.3% 제거해 준대요."', '마지막 헹굼까지, 잔류세제 제거율 96.3%*'],
        ['사용법', '<strong>의류 라벨을 확인</strong>한 뒤, 용기를 눌러 계량 &rarr; <strong>섬유유연제 칸에 넣는 화면</strong>.', '"쓰던 세제는 그대로 두고, 헹굼 단계에서 쓰이도록 유연제 칸에 넣어주면 돼요."', '① 라벨 확인 ② 꾹 눌러 계량 ③ 유연제 칸에 투입'],
        ['마무리', '정리된 재킷이나 캠핑 장비와 함께 마무리해요.', '"좋은 옷을 고르는 만큼, 마지막 헹굼까지 챙겨주려고요."', '좋은 옷을 고르는 안목은, 마지막 헹굼까지']
      ]
    },

    mustShots: [
      ['원단 위 물방울 클로즈업', '기능성 의류 겉감 위 <strong>물방울의 움직임</strong>을 매크로로 담아주세요. 실제 소재의 색과 질감이 보이도록 해주세요.'],
      ['프레스키트 언박싱', '받은 <strong>프레스키트를 직접 여는 장면</strong>을 꼭 담아주세요.'],
      ['세탁 라벨&middot;헹굼 설정', '의류의 <strong>세탁 관리 라벨</strong>과 세탁기의 <strong>헹굼 설정</strong> 화면을 보여주세요.'],
      ['손과 세탁기의 실제 동작', '용기를 눌러 계량하고 <strong>섬유유연제 칸에 넣는 장면</strong>을 담아주세요.'],
      ['96.3% 결과와 작용 원리', '<strong>상세 페이지</strong>의 96.3% 결과와 4 STEP 원리를 보여주세요. <strong>96.3%는 가장 크게</strong>, 천천히 보여주세요.']
    ],
    proofImages: [
      ['image/detail-residue-96-3.png', '잔류세제 제거율 96.3%'],
      ['image/proof-4step.png', '작용 원리 · 4 STEP']
    ],
    proofNote: '이해를 돕기 위한 참고 이미지예요. 그대로 쓰지 말고, 영상에는 <strong>상세 페이지</strong>를 직접 캡처해 활용해 주세요.',

    moodIntro: '원단 질감과 <strong>물의 움직임</strong> 중심으로, 정보를 전하듯 <strong>차분하게</strong> 촬영해 주세요.',
    mood: [
      '<strong>블루 블랙&middot;슬레이트 그레이&middot;오프화이트</strong> 톤. 원단 질감과 물방울의 움직임이 잘 보이게 촬영해요.',
      '<strong>매크로 디테일</strong>, 손과 세탁기의 <strong>실제 동작</strong> 위주로 담아주세요.',
      '과도한 실험 연출이나 <strong>다른 브랜드 로고</strong>가 크게 보이는 장면은 피해주세요.',
      '원리를 설명하는 그래픽은 <strong>"개념도"</strong>로 표기하고, 실제 시험 결과처럼 보이지 않게 해주세요.'
    ],
    references: [
      ['https://www.youtube.com/shorts/0tJpoe77D5M', '차분히 설명하는 흐름 예시 (쇼츠)']
    ],

    usage: Object.assign({}, window.BRAND.products.cleanbooster.usage, {
      intro: window.BRAND.products.cleanbooster.usage.intro + '<br>세제나 섬유유연제가 아니라 <strong>헹굼 보조제</strong>예요. 쓰던 세제는 그대로 두고 기존 루틴에 더해 주세요.<br><strong>기능성 의류는 의류 라벨과 제조사 세탁 지침을 먼저 확인해 주세요.</strong>'
    })
  },

  extraDos: [
    '발수(겉감이 물을 튕겨내는 기능)와 방수(물이 안으로 들어오지 않는 기능)는 <strong>다른 기능</strong>으로 구분해서 설명',
    '세제 잔여물은 발수 저하의 <strong>가능한 원인 중 하나</strong>로 표현',
    '의류 라벨과 제조사 세탁 지침을 우선한다는 점을 함께 안내'
  ],
  extraDonts: [
    '겉감이 젖는 것을 <strong>방수 기능 손상</strong>과 같은 의미로 설명하지 않음',
    '세제 잔여물을 <strong>모든 성능 저하의 원인</strong>으로 단정하지 않음',
    '클린부스터가 <strong>발수 성능을 회복시킨다</strong>고 단정하지 않음',
    '수질&middot;재침착 연구를 <strong>고어텍스에서 직접 검증된 결과</strong>처럼 표현하지 않음',
    '아크테릭스&middot;고어텍스 등 다른 브랜드가 <strong>클린부스터를 추천&middot;인증한 것처럼</strong> 표현하지 않음',
    '다른 브랜드의 로고&middot;공식 사이트 캡처를 영상에 쓰지 않음 (말로 출처만 언급)',
    '개념 그래픽이나 연출 이미지를 <strong>실제 전후 비교 실험</strong>처럼 쓰지 않음'
  ],

  promo: null,            // 할인 기획전 없음

  application: {
    enabled: true,
    gasUrl: 'https://script.google.com/macros/s/AKfycbwt202UzFI0ON1AlCt06ecvDWHS99TOKSXL2qovpwGFAMvqQqGY0zFRkz3IGrYIzlUw4w/exec',
    questions: [
      { key: 'activity', label: '주로 즐기는 활동', sheetLabel: '활동 분야', type: 'checkbox', required: true,
        help: '해당하는 것을 모두 선택해 주세요.',
        options: ['캠핑', '등산', '러닝', '골프', '스키·보드', '기타 아웃도어'] },
      { key: 'gear', label: '보유한 기능성 의류', sheetLabel: '기능성 의류', type: 'text', required: true,
        placeholder: '예: 고어텍스 재킷, 바람막이, 기능성 레인재킷' }
    ]
  }
};
