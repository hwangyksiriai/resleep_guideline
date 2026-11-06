/**
 * 범용 가이드라인 렌더러
 * window.BRAND (brands/*.js) + window.CAMPAIGN (각 캠페인 페이지) → 가이드 페이지를 그립니다.
 * 캠페인 설정에 값이 없는 섹션은 자동으로 숨겨집니다.
 */
(function () {
  const B = window.BRAND;
  const C = window.CAMPAIGN;
  const P = Object.assign({}, B.products[C.product], C.productOverrides || {});
  const BASE = C.assetBase || '../';
  const params = new URLSearchParams(location.search);
  const formOn = C.application && C.application.enabled && params.get('form') !== 'off';

  const img = (src) => BASE + src;
  const list = (arr) => (arr || []).filter(Boolean);
  const has = (v) => v && (!Array.isArray(v) || v.length);

  // 화면에 나오는 순서대로 STEP 번호를 붙입니다 (신청 폼이 없는 페이지는 자동으로 번호가 당겨짐)
  const steps = [];
  function section(label, title, inner, id) {
    let step = '';
    if (id) { steps.push([id, title]); step = `<span class="step-chip">STEP ${steps.length}</span>`; }
    return `<div class="section"${id ? ` id="${id}"` : ''}>
  ${label ? `<div class="section-label">${label}</div>` : ''}
  ${title ? `<div class="section-title">${step}${title}</div>` : ''}
  ${inner}
</div>`;
  }

  // 제작 가이드의 파트 = 접고 펴는 아코디언 (open: true 인 파트만 처음에 펼쳐짐)
  function part(pt, i) {
    return `<details class="part${pt.cls ? ' ' + pt.cls : ''}"${pt.open ? ' open' : ''}>
  <summary class="part-sum"><span class="part-num">${i + 1}</span><span class="part-txt"><span class="part-title">${pt.title}${pt.tag ? ` <span class="part-tag">${pt.tag}</span>` : ''}</span>${pt.desc ? `<span class="part-desc">${pt.desc}</span>` : ''}</span><span class="part-chev" aria-hidden="true"></span></summary>
  <div class="part-body">${pt.body}</div>
</details>`;
  }

  function fold(icon, title, count, body, cls) {
    return `<details class="fold${cls ? ' ' + cls : ''}">
  <summary class="fold-summary">
    <span class="fold-icon">${icon}</span>
    <span class="fold-title">${title}</span>
    ${count === 'badge' ? '<span class="fold-badge">필수</span>' : `<span class="fold-count">${count}</span>`}
    <span class="fold-chevron">&#8964;</span>
  </summary>
  <div class="fold-body">${body}</div>
</details>`;
  }

  function idea(num, name, desc, extra) {
    return `<div class="idea-item"><div class="idea-num">${String(num).padStart(2, '0')}</div><div>
  <div class="idea-name">${name}</div>${desc ? `<div class="idea-desc">${desc}</div>` : ''}${extra || ''}
</div></div>`;
  }

  // [부모가 걱정하는 상황, 무엇이 걱정되는지, 예시 문구] — 상황만 보이고, 누르면 걱정·예시가 펼쳐짐
  function situationCards(rows) {
    return `<div class="situ-list">${list(rows).map((r, i) => `<details class="situ-card">
  <summary class="situ-head"><span class="situ-num">${i + 1}</span><span class="situ-title">${r[0]}</span><span class="situ-more">예시</span></summary>
  <div class="situ-worry"><span>걱정</span>${r[1]}</div>
  <div class="quote-chip">${r[2]}</div>
</details>`).join('')}</div>`;
  }

  function keyItem(badge, text) {
    return `<div class="key-msg-item"><div class="key-msg-badge">${badge}</div><div class="key-msg-text">${text}</div></div>`;
  }

  // ---------- 배너 ----------
  function banner() {
    return `<div class="banner-wrap">
  <img src="${img(B.banner)}" alt="${B.name} 배너" width="1216" height="812">
  <div class="banner-overlay">
    <div class="header-eyebrow">Influencer Guideline</div>
    <div class="header-title">${C.headerTitle || B.name + ' 가이드라인'}</div>
    <div class="header-sub">${C.headerSub || B.nameEn + ' × Creator Campaign'}</div>
  </div>
</div>`;
  }

  // ---------- 한눈에 보기 ----------
  function glance() {
    const pd = list(C.details).find(d => /기간/.test(d[0])) || [];
    const rows = [[pd[0], pd[1]], ['형식', C.format], ['메인 메시지', P.mainPoint],
      ['할인 기간', C.promo && C.promo.period ? `<strong>${C.promo.period}</strong>` : ''],
      ['할인 표기', C.promo && C.promo.maxDiscount ? `<strong>"최대 ${C.promo.maxDiscount}"</strong>로만 표기` : ''],
      ['업로드 유지', C.keepPeriod || '3개월'], ['2차 활용', C.secondaryUse || '동의']].filter(r => r[1]);
    let checks = list(C.checks);   // 캠페인에서 직접 정하면 그 목록을 씁니다
    if (!checks.length) {
      checks.push('<strong>본인 목소리</strong>로 더빙 (AI 더빙 불가)');
      if (C.childRequired) checks.push('<strong>아이와 함께</strong> 등장하는 장면 넣기');
      checks.push('영상 속 <strong>자막은 크게</strong>');
    }
    checks.push(`캡션 첫 줄 표기 + <strong>공동작업자 초대</strong> (<span class="nb">${B.account}</span>)`);
    return `<div class="glance"><div class="glance-card">
  <div class="glance-title">한눈에 보기</div>
  ${rows.map(r => `<div class="glance-row"><div class="glance-key">${r[0]}</div><div class="glance-val">${r[1]}</div></div>`).join('')}
  <div class="glance-sub">꼭 지켜주세요</div>
  <ul class="check-list">${checks.map(c => `<li>${c}</li>`).join('')}</ul>
</div></div>`;
  }

  function stepNav() {
    const short = { overview: '개요', guide: '제작 가이드', apply: '신청', settle: '정산' };
    return `<nav class="step-nav" aria-label="가이드 목차"><div class="step-nav-inner">${steps.map((s, i) => `<a href="#${s[0]}"><span>${i + 1}</span>${short[s[0]] || s[1]}</a>`).join('')}</div></nav>`;
  }

  // ---------- 브랜드 소개 ----------
  function about() {
    const a = B.about;
    const pillars = list(a.pillars).map(p => `<div class="about-item">
  <div class="about-item-title"><span style="letter-spacing:0.06em;">${p.title}</span></div>
  <div class="about-item-desc"><strong style="display:block;color:var(--text-dark);font-weight:700;margin-bottom:6px;">${p.head}</strong>${p.desc || ''}</div>
</div>`).join('');
    return fold('&#9432;', `${B.name} 브랜드 소개`, '', `<p class="about-lead">
    <strong style="display:block;font-size:17px;font-weight:700;letter-spacing:0.03em;color:var(--text-dark);line-height:1.45;margin-bottom:6px;">${a.title}</strong>
    <span style="display:block;font-size:13px;font-weight:600;letter-spacing:0.04em;color:var(--brand-text);margin-bottom:16px;">${a.subtitle}</span>
    <strong style="display:block;color:var(--text-dark);font-weight:700;font-size:14px;line-height:1.6;margin-bottom:8px;">${a.lead}</strong>
    ${a.body}
  </p>
  <div class="brand-img-wrap"><img src="${img(B.brandImage)}" alt="${B.name} 브랜드"></div>
  <div class="about-grid">${pillars}</div>
  <a href="${B.brandUrl}" target="_blank" rel="noopener" class="brand-link-btn">브랜드 바로가기 →</a>`, 'fold-about');
  }

  // ---------- 캠페인 개요 ----------
  // 기간·형식·업로드 유지 등 기본 정보는 '한눈에 보기'에 있어 여기서는 반복하지 않습니다
  function overview() {

    const items = list(C.overviewItems).map(i => keyItem(i[0], i[1])).join('');
    const purpose = C.purpose ? `<div class="key-msg-box">
  <div class="key-msg-title">${C.purpose.title}</div>
  ${C.purpose.text ? `<div class="key-msg-text">${C.purpose.text}</div>` : ''}
  ${items}
</div>` : '';

    const recruit = has(C.recruit) ? `<div class="note-box recruit-box">
  <div class="note-box-title">👥 모집 조건</div>
  <ul>${C.recruit.map(r => `<li>${r}</li>`).join('')}</ul>
</div>` : '';

    const product = fold('&#129524;', '제공 제품 보기', '', `<div class="product-box">
  <img src="${img(P.image)}" alt="${B.name} ${P.name}" class="product-photo" loading="lazy">
  <div class="product-name">${P.name} ${P.volume ? `<span style="color:var(--text-light);font-weight:500;font-size:12.5px;">(${P.volume})</span>` : ''}</div>
  ${P.role ? `<div style="font-size:12.5px;font-weight:600;color:var(--brand-text);margin-top:-8px;">${P.role}</div>` : ''}
  ${list(P.features).map(f => `<div class="step-feat"><strong>${f[0]}</strong><span>${f[1]}</span></div>`).join('')}
  <a href="${P.url}" target="_blank" rel="noopener" class="product-link-btn">제품 보러가기 →</a>
</div>`, 'fold-about');

    return section('Campaign Info', '캠페인 개요', purpose + recruit + `<div class="fold-group">${product}${about()}</div>`, 'overview');
  }

  // ---------- 제작 가이드 ----------
  function contentGuide() {
    const parts = [];
    const refLinks = (links) => `<div class="ask-links">${links.map(l => `<a href="${l[0]}" target="_blank" rel="noopener" class="concept-ref-link"><span>${l[1]}</span></a>`).join('')}</div>`;

    // 핵심 메시지
    let core = '';
    if (P.brief) core += `<div class="brief-box"><div class="brief-label">One-line Brief</div><div class="brief-line">${P.brief}</div><div class="brief-protocol">${P.briefSub || ''}</div></div>`;
    core += `<div class="key-msg-box"><div class="key-msg-title">핵심 요청사항</div>
  <div class="key-msg-text">${C.coreRequest || ''}</div>
  ${P.situation ? keyItem('상황 표현', P.situation) : ''}
  ${has(P.emphasis) ? keyItem('강조 포인트', `<ul class="sub-list" style="margin-top:0;">${P.emphasis.map(e => `<li>${e}</li>`).join('')}</ul>`) : ''}
</div>`;
    parts.push({ title: '핵심 메시지', desc: '영상 전체를 이 방향으로 풀어주세요.', body: core, open: true });

    // 브랜드가 '꼭 적용'을 요청한 항목 (situations: true 면 상황 기준을 함께 보여줌)
    const ka = C.keyAsks;
    if (ka && has(ka.items)) parts.push({ title: '&#11088; ' + (ka.title || '꼭 적용해 주세요'), desc: ka.intro, cls: 'part-key', open: true,
      body: ka.items.map((it, i) => `<div class="ask-item"><div class="ask-item-head"><span>${i + 1}</span>${it.title}</div>${it.desc ? `<div class="ask-item-desc">${it.desc}</div>` : ''}${it.situations ? `<div class="ask-hint">상황을 누르면 걱정 포인트와 예시 문구가 보여요.</div>${situationCards(P.situationTable)}` : ''}${has(it.links) ? refLinks(it.links) : ''}</div>`).join('') });

    // 핵심 내용 · 작용 원리
    const pc = P.principle;
    if (has(P.flowRequests) || pc) parts.push({ title: (P.flowTitle || '영상 흐름') + (pc ? ' &middot; 작용 원리' : ''), desc: '영상에 담을 내용과 원리 설명 방법이에요.',
      body: (has(P.flowRequests) ? `<ol class="num-list">${P.flowRequests.map(f => `<li>${f}</li>`).join('')}</ol>` : '') +
        (pc ? `<div class="note-box principle-box"><div class="note-box-title">🔬 ${pc.title || '작용 원리'}</div>
  ${pc.base ? `<div class="principle-base">${pc.base}</div>` : ''}
  <ol class="principle-steps">${list(pc.steps).map(st => `<li><strong>${st[0]}</strong><span>${st[1]}</span></li>`).join('')}</ol>
  ${pc.outro ? `<div class="principle-outro">${pc.outro}</div>` : ''}
</div>` : '') });

    // 콘텐츠 흐름 (시나리오)
    const sc = C.scenario === false ? null : P.scenario;
    if (sc) parts.push({ title: `${sc.title || '참고용 시나리오'} &middot; <span class="nb">${sc.cuts.length}${sc.unit || '컷'}</span>`, desc: '이 순서로 이어가 주세요. 멘트는 예시예요.',
      body: `<div class="concept-intro">${sc.intro}</div>
       <div class="bstep-hook"><div class="bstep-hook-label">권장 흐름</div><div class="bstep-hook-line">${sc.flow}</div>${sc.theme ? `<div class="bstep-hook-msg"><span>메인 주제</span>${sc.theme}</div>` : ''}</div>
       <ol class="bstep-list">${sc.cuts.map((c, i) => `<li class="bstep"><div class="bstep-head"><span class="bstep-num">${String(i + 1).padStart(2, '0')}</span><span class="bstep-name">${c[0]}</span></div><div class="bstep-shot">${c[1]}</div>${c[2] ? `<div class="bstep-line">${c[2]}</div>` : ''}${c[3] ? `<div class="bstep-props"><span>${sc.capLabel || '핵심 자막'}</span>${c[3]}</div>` : ''}</li>`).join('')}</ol>
       ${sc.footnote ? `<div class="ref-note" style="margin-top:12px;">${sc.footnote}</div>` : ''}` });

    // 필수 체크리스트
    const must = [];
    must.push(['&#128221;', '<strong class="hl-text">자막은 크게</strong><br>한눈에 읽히도록 크고 또렷하게 넣어주세요.', true]);
    must.push(['&#127908;', '<strong class="hl-text">본인 목소리로 더빙</strong><br>음악만 깔지 말고 음성을 꼭 넣어주세요. <strong>AI 더빙 불가.</strong>', true]);
    if (P.nameRule) must.push(['&#127991;&#65039;', P.nameRule, true]);
    if (C.childRequired) must.push(['&#127916;', '<strong>아이와 함께 등장</strong><br>정돈된 아이 옷&middot;가족 섬유, 세탁실, <strong>실제 사용법</strong>(계량 &rarr; 유연제 칸 투입)을 함께 담아주세요.']);
    list(C.extraMust).forEach(m => must.push(['&#10004;', m]));
    must.push(['&#9997;&#65039;', `<strong>캡션 첫 줄에 <span class="nb">${B.account}</span></strong><br>제품명과 잔류세제 제거 효능을 넣고, 내 경험 위주로 자유롭게 써주세요.`]);
    must.push(['&#128279;', `<strong><span class="nb">${B.account}</span> 공동작업자 초대</strong><br>단순 태그가 아니라 <strong>'공동 작업자 초대'</strong>여야 브랜드 계정에도 노출돼요. 게시 전 수락 여부를 확인해 주세요.`]);
    parts.push({ title: `필수 체크리스트 &middot; <span class="nb">${must.length}가지</span>`, desc: '영상과 캡션에 <strong>빠짐없이</strong> 들어가야 해요.',
      body: `<div class="must-list">${must.map(m => `<div class="must-item${m[2] ? ' key' : ''}"><div class="must-icon">${m[0]}</div><div>${m[1]}</div></div>`).join('')}</div>` });

    // 꼭 담아야 할 화면
    const shots = list(P.mustShots);
    if (shots.length) {
      const proof = has(P.proofImages) ? `<div class="proof-grid">${P.proofImages.map(i => `<a class="proof-thumb" href="${img(i[0])}" target="_blank" rel="noopener"><img src="${img(i[0])}" alt="${i[1]}" loading="lazy"><span>${i[1]}</span></a>`).join('')}</div><div class="proof-save">${P.proofNote || '이미지를 누르면 원본이 열려요. 길게 눌러(PC는 우클릭) 저장한 뒤 영상에 활용해 주세요.'}</div>` : '';
      parts.push({ title: `영상에 꼭 담아야 할 화면 &middot; <span class="nb">${shots.length}가지</span>`, desc: '아래 장면은 영상에 <strong>꼭</strong> 넣어주세요.',
        body: `${shots.map((sh, i) => idea(i + 1, sh[0], sh[1], i === shots.length - 1 ? proof : '')).join('')}
         ${P.detailImage ? `<div class="brand-img-wrap" style="margin:14px 0 0;"><img src="${img(P.detailImage[0])}" alt="상세 페이지 참고 이미지" loading="lazy"></div><div class="proof-save">${P.detailImage[1]}</div>` : ''}` });
    }

    // 기획전
    const pr = C.promo;
    if (pr) parts.push({ title: '기획전 할인 안내', desc: '영상 마지막과 캡션 끝에만 짧게 넣어주세요.',
      body: `<div class="key-msg-box" style="margin-top:0;">
  <div class="key-msg-title">기획전 안내${pr.name ? '&nbsp;·&nbsp;<span class="nb">' + pr.name + '</span>' : ''}</div>
  <div class="key-msg-text">${pr.intro || '메인 메시지는 그대로 <strong>잔류세제 제거</strong>예요.'}</div>
  ${pr.period ? keyItem('할인 기간', `<strong>${pr.period}</strong>`) : ''}
  ${pr.maxDiscount ? keyItem('할인 표현', `<strong>"최대 ${pr.maxDiscount}"</strong>로만 표기 &mdash; 예: "지금 ${pr.sayName || '기획전'}에서 최대 ${pr.maxDiscount} 할인 중이에요."<ul class="sub-list"><li>상품별 가격&middot;최대혜택가는 쿠폰 조건가라 언급하지 않아요.</li></ul>`) : ''}
</div>${has(pr.images) ? `<div class="proof-grid" style="grid-template-columns:repeat(${Math.min(pr.images.length, 3)},1fr);">${pr.images.map(i => `<a class="proof-thumb" href="${img(i[0])}" target="_blank" rel="noopener"><img src="${img(i[0])}" alt="${i[1]}" loading="lazy" style="height:170px;"><span>${i[1]}</span></a>`).join('')}</div><div class="proof-save">기획전 참고용 이미지예요. (이미지를 누르면 원본이 열려요)</div>` : ''}${pr.link ? `<a href="${pr.link}" target="_blank" rel="noopener" class="concept-ref-link" style="margin-top:10px;"><span>${pr.linkLabel || '할인 링크'}</span></a>` : ''}` });

    // 사용법
    if (P.usage) parts.push({ title: '사용법 &middot; 권장 사용량', desc: '유연제 칸에 넣는 방법과 사용량이에요.',
      body: `<div class="concept-intro">${P.usage.intro}</div><div style="margin-top:16px;">${P.usage.tables.map(t => `<div class="usage-table-label">${t[0]}</div><table class="usage-table"><tr><th>세탁방식</th><th>세탁량</th><th>권장 사용량</th></tr>${t[1].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><strong>${r[2]}</strong></td></tr>`).join('')}</table>`).join('')}</div>
       ${P.usage.image ? `<div class="brand-img-wrap" style="margin-bottom:0;"><img src="${img(P.usage.image)}" alt="사용법" loading="lazy"></div>` : ''}` });

    // 촬영 무드 · 레퍼런스
    const refs = list(C.references || P.references);
    if (has(P.mood) || refs.length) parts.push({ title: '촬영 무드 &middot; 참고 레퍼런스', tag: '참고용', desc: P.moodIntro || '자연스러운 장면 위주로 촬영해 주세요.',
      body: `<ul class="sub-list">${list(P.mood).map(m => `<li>${m}</li>`).join('')}</ul>
       ${refs.length ? `<div class="concept-refs"><div class="concept-quotes-label">참고 콘텐츠</div>${refs.map(r => `<a href="${r[0]}" target="_blank" rel="noopener" class="concept-ref-link"><span>${r[1]}</span></a>`).join('')}</div>` : ''}
       <div class="ref-note" style="margin-top:12px;">&bull; 레퍼런스는 <strong>톤&middot;구성 참고용</strong>이에요. 똑같이 따라 하지 않아도 되고, 채널 톤에 맞게 바꿔도 돼요.</div>` });

    // 상황 예시 (참고용)
    if (has(P.moreSituations)) parts.push({ title: `추가 상황 아이디어 &middot; <span class="nb">${P.moreSituations.length}가지</span>`, tag: '참고용', desc: '<strong>내 경험과 맞는 것</strong>만 골라 써주세요.', body: situationCards(P.moreSituations) });
    if (has(P.situations)) parts.push({ title: `상황적 소구 포인트 &middot; <span class="nb">예시 ${P.situations.length}가지</span>`, tag: '참고용', desc: '실제로 겪은 상황을 골라 자연스럽게 표현해 주세요.',
      body: P.situations.map((st, i) => idea(i + 1, '', '', `<div class="concept-quotes" style="margin-top:0;">${st.map(q => `<div class="quote-chip">"${q}"</div>`).join('')}</div>`)).join('') });

    // 표현 주의 · 해시태그
    const dos = list(P.dos).concat(list(C.extraDos));
    const donts = list(P.donts).concat(list(C.extraDonts));
    const tags = list(C.hashtags || P.hashtags);
    parts.push({ title: '표현 주의 &middot; 해시태그', desc: '광고 심의와 관련된 내용이라 꼭 확인해 주세요.',
      body: `<div class="guard-title do">&#10003; 이렇게 해주세요</div><div class="guard-grid"><div class="guard-box must">${dos.map(d => `<div class="guard-item">${d}</div>`).join('')}</div></div>
  <div class="guard-title dont">&#10005; 이렇게 하지 말아주세요 <span>포함되면 수정 요청이 나갈 수 있어요</span></div><div class="guard-grid"><div class="guard-box avoid">${donts.map(d => `<div class="guard-item">${d}</div>`).join('')}</div></div>
  ${tags.length ? `<div class="hashtag-section"><div class="hashtag-label">필수 해시태그 <span class="required">필수</span> <span class="hashtag-tip">눌러서 복사</span></div><div class="hashtag-wrap">${tags.map(t => `<div class="hashtag req">${t}</div>`).join('')}</div><div class="ref-note">&bull; 그 외 협의된 개별 해시태그가 있으면 함께 추가해 주세요.</div></div>` : ''}` });

    let h = `<div class="part-tools"><span>항목을 눌러 펼쳐보세요</span><button type="button" class="part-toggle" id="partToggle">모두 펼치기</button></div><div class="part-list">${parts.map(part).join('')}</div>`;

    // cleanCutRequired: 업로드 후 클린본(자막·텍스트·할인 내용 없는 영상)을 필수로 받는 캠페인
    const review = list(B.ops.draftReview).concat(C.cleanCutRequired ? ['<strong class="hl-text">클린본 제출 (필수):</strong> 업로드 후, <strong>자막&middot;텍스트&middot;기획전 할인 내용이 없는 클린본 영상</strong>을 꼭 함께 전달해 주세요.'] : []);
    if (review.length) h += `<div class="note-box" style="margin-top:20px;"><div class="note-box-title">📌 콘텐츠 초안 전달 및 검수 안내</div><ul>${review.map(d => `<li>${d}</li>`).join('')}</ul></div>`;
    h += `<div class="warning-box">&#9888;&#65039; <strong>업로드 기한 내 올리지 않으면 고료 지급이 불가해요.</strong></div>`;

    return section('Content Guide', '제작 가이드', h, 'guide');
  }

  // ---------- 신청 폼 ----------
  function questionField(q) {
    const req = q.required ? '<span class="req">*</span>' : '<span class="opt">(선택)</span>';
    let input;
    if (q.type === 'radio' || q.type === 'checkbox') {
      input = `<div class="choice-wrap">${q.options.map((o, i) => `<label class="choice"><input type="${q.type}" name="q_${q.key}" value="${o}"${q.required && q.type === 'radio' && i === 0 ? ' required' : ''}><span>${o}</span></label>`).join('')}</div>`;
    } else {
      input = `<input type="text" name="q_${q.key}" class="form-input" placeholder="${q.placeholder || ''}"${q.required ? ' required' : ''}>`;
    }
    return `<div class="form-group" data-q="${q.key}"><label class="form-label">${q.label}${req}</label>${q.help ? `<div class="ref-note" style="margin:-4px 0 8px;">${q.help}</div>` : ''}${input}</div>`;
  }

  function application() {
    const qs = list(C.application.questions);
    return section('Application', '캠페인 신청', `<form id="applicationForm">
  <div class="form-group"><label class="form-label" for="appName">이름<span class="req">*</span></label><input type="text" id="appName" name="name" class="form-input" placeholder="홍길동" required></div>
  <div class="form-group"><label class="form-label" for="appInstagram">인스타그램 링크<span class="req">*</span></label><input type="text" id="appInstagram" name="instagram" class="form-input" placeholder="@username 또는 instagram.com/username" required></div>
  <div class="form-group"><label class="form-label" for="appPhone">휴대폰<span class="req">*</span></label><input type="tel" id="appPhone" name="phone" class="form-input" placeholder="010-0000-0000" inputmode="numeric" pattern="[0-9\\-]*" required></div>
  <div class="form-group"><label class="form-label" for="appEmail">이메일<span class="opt">(선택)</span></label><input type="email" id="appEmail" name="email" class="form-input" placeholder="name@email.com"></div>
  ${qs.map(questionField).join('')}
  <div class="form-group"><label class="form-label" for="appZip">우편번호<span class="req">*</span></label><div class="form-row-zip"><input type="text" id="appZip" name="zipcode" class="form-input" placeholder="00000" inputmode="numeric" maxlength="5" readonly required><button type="button" class="zip-search-btn" id="zipBtn">주소 검색</button></div></div>
  <div class="form-group"><label class="form-label" for="appRoadAddress">배송지 주소<span class="req">*</span></label><input type="text" id="appRoadAddress" name="roadAddress" class="form-input" placeholder="도로명 주소" readonly required></div>
  <div class="form-group"><label class="form-label" for="appDetailAddress">상세 주소<span class="req">*</span></label><input type="text" id="appDetailAddress" name="detailAddress" class="form-input" placeholder="동·호수 등" required></div>
  <div class="form-group"><label class="form-label" for="appNote">요청사항<span class="opt">(선택)</span></label><textarea id="appNote" name="note" class="form-textarea" placeholder="배송 관련 요청사항을 적어주세요"></textarea></div>
  <div class="warning-box">⚠️ <strong>배송지는 매 캠페인마다 새로 확인합니다.</strong><br>오배송 방지를 위해 입력값을 다시 한번 체크해 주세요.</div>
  <div class="note-box" style="margin-top:16px;"><div class="note-box-title">📌 콘텐츠 활용</div><ul><li>브랜드 계정 스토리&middot;피드, 그리고 2차 활용 동의 시 ${B.name} 홈페이지&middot;SNS&middot;플랫폼에 활용될 수 있어요.</li></ul></div>
  <label class="agree-row"><input type="checkbox" name="agree" required><span>안내된 캠페인별 가이드라인 및 고료 조건을 확인했으며 이에 동의합니다.<br><br>제작된 콘텐츠는 브랜드 및 SIRIAI의 2차 활용에 동의합니다.<br><br><strong>(필수)</strong> 진행 제품은 브랜드 프로모션 상황에 따라 일부 변경될 수 있습니다.<br><br><strong>[필수]</strong> 캠페인 선정 후 개인 변심 및 일방적인 취소는 불가하며, 취소 시 <strong>제공된 제품 비용이 발생할 수 있음</strong>에 동의합니다.</span></label>
  <button type="submit" class="submit-btn">${B.name} 캠페인 지원서 제출하기</button>
</form>`, 'apply');
  }

  // ---------- 정산 ----------
  function settlement() {
    const s = B.ops.settlement;
    return section('Settlement', '정산', `<div class="settlement-lead">캠페인 선정 완료 후 정산을 위한 서류 및 연락처를 누락 없이 제출해 주세요.<br>정산은 <strong>정산 자료 제출 후 ${s.days}</strong> 이내 지급됩니다.</div>
  <div class="settle-tag-label">제출 서류</div><div class="settle-doc-text">— ${s.docs}</div>
  <div class="settle-tag-label">수신 이메일</div><div class="settle-copy-box"><span>${s.email}</span><button type="button" class="settle-copy-btn" data-copy="${s.email}">복사</button></div>
  <div class="settle-tag-label">메일 제목</div><div class="settle-copy-box"><span>${s.subject}</span><button type="button" class="settle-copy-btn" data-copy="${s.subject}">복사</button></div>
  <div class="warning-box">! 정산 자료는 브랜드로부터 확인 안내를 받은 인플루언서에 한해서 제출해 주세요.<br>! 확정 안내를 받지 못한 경우 서류를 제출하지 마세요.</div>`, 'settle');
  }

  // ---------- 그리기 ----------
  document.title = `${B.name} — ${C.pageTitle || '인플루언서 가이드라인'}`;
  const body = overview() + contentGuide() + (formOn ? application() : '') + settlement();
  document.getElementById('app').innerHTML = banner() + glance() + stepNav() + body +
    `<div class="footer"><strong>${B.nameEn} (${B.name})</strong><br>본 가이드라인은 선별된 크리에이터에게만 제공되는 자료입니다.<br>문의사항이 있으시면 담당자에게 연락해 주세요.</div><div class="copy-toast" id="copyToast"></div>`;

  // ---------- 동작 ----------
  function showToast(text) {
    const t = document.getElementById('copyToast');
    t.textContent = text; t.classList.add('show');
    clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove('show'), 1500);
  }
  function copyText(text) { navigator.clipboard.writeText(text).then(() => showToast('"' + text + '" 복사됨')); }
  document.querySelectorAll('.hashtag').forEach(el => el.addEventListener('click', () => copyText(el.textContent.replace('⎘', '').trim())));
  document.querySelectorAll('[data-copy]').forEach(el => el.addEventListener('click', () => copyText(el.dataset.copy)));

  // 제작 가이드: 모두 펼치기 / 접기
  const partToggle = document.getElementById('partToggle');
  if (partToggle) {
    const allParts = [...document.querySelectorAll('.part')];
    const sync = () => { partToggle.textContent = allParts.every(d => d.open) ? '모두 접기' : '모두 펼치기'; };
    partToggle.addEventListener('click', () => { const open = !allParts.every(d => d.open); allParts.forEach(d => { d.open = open; }); sync(); });
    allParts.forEach(d => d.addEventListener('toggle', sync));
    sync();
  }

  // 목차: 지금 보고 있는 STEP 표시
  const navLinks = [...document.querySelectorAll('.step-nav a')];
  if ('IntersectionObserver' in window && navLinks.length) {
    const io = new IntersectionObserver((entries) => entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-70px 0px -60% 0px' });
    steps.forEach(s => io.observe(document.getElementById(s[0])));
  }

  if (!formOn) return;
  const form = document.getElementById('applicationForm');
  const $ = (id) => document.getElementById(id);
  const fullAddress = () => [$('appRoadAddress').value.trim(), $('appDetailAddress').value.trim()].filter(Boolean).join(' ');
  $('zipBtn').addEventListener('click', () => {
    new daum.Postcode({ oncomplete: (d) => { $('appZip').value = d.zonecode; $('appRoadAddress').value = d.roadAddress; $('appDetailAddress').focus(); } }).open();
  });
  const normIg = (v) => {
    v = (v || '').trim(); if (!v) return ''; if (/^https?:\/\//i.test(v)) return v;
    return 'https://instagram.com/' + v.replace(/^@/, '').replace(/^(www\.)?instagram\.com\//i, '').replace(/^\/+|\/+$/g, '');
  };
  $('appInstagram').addEventListener('blur', (e) => { if (e.target.value.trim()) e.target.value = normIg(e.target.value); });
  const utf8ToBase64 = (str) => btoa(unescape(encodeURIComponent(str)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // 체크박스 문항 필수 확인
    for (const q of list(C.application.questions)) {
      if (q.required && q.type === 'checkbox' && !form.querySelector(`input[name="q_${q.key}"]:checked`)) {
        showToast(`'${q.label}' 항목을 선택해 주세요`); return;
      }
    }
    const fields = [
      ...(C.tier ? [['타입', C.tier], ['고료', C.price || '']] : []),
      ['이름', form.name.value.trim()],
      ['인스타그램', normIg(form.instagram.value)],
      ['휴대폰', form.phone.value.trim()],
      ['이메일', form.email.value.trim()]
    ];
    list(C.application.questions).forEach(q => {
      const v = q.type === 'checkbox'
        ? [...form.querySelectorAll(`input[name="q_${q.key}"]:checked`)].map(i => i.value).join(', ')
        : (form.querySelector(`[name="q_${q.key}"]:checked`) || form.querySelector(`[name="q_${q.key}"]`) || {}).value || '';
      fields.push([q.sheetLabel || q.label, v]);
    });
    fields.push(['우편번호', form.zipcode.value.trim()], ['주소', fullAddress()], ['요청사항', form.note.value.trim()]);
    const payload = { campaign: C.application.sheetTab || C.id, fields };

    const url = C.application.gasUrl;
    if (!url) { console.log('캠페인 신청 데이터', payload); showToast('구글시트 연동 URL이 설정되지 않았습니다'); return; }
    const btn = form.querySelector('.submit-btn'); btn.disabled = true; btn.textContent = '제출 중...';
    fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: utf8ToBase64(JSON.stringify(payload)) })
      .then(() => { showToast('제출이 완료되었습니다'); form.reset(); })
      .catch(() => showToast('제출 중 오류가 발생했습니다. 다시 시도해 주세요.'))
      .finally(() => { btn.disabled = false; btn.textContent = `${B.name} 캠페인 지원서 제출하기`; });
  });
})();
