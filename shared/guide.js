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

  function section(label, title, inner) {
    return `<div class="section">
  ${label ? `<div class="section-label">${label}</div>` : ''}
  ${title ? `<div class="section-title">${title}</div>` : ''}
  ${inner}
</div>`;
  }

  function concept(num, name, body) {
    return `<details class="concept">
  <summary class="concept-summary">
    <span class="concept-num">${num}</span>
    <span class="concept-name">${name}</span>
    <span class="concept-chevron">&#8964;</span>
  </summary>
  <div class="concept-body">${body}</div>
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

  // ---------- 브랜드 소개 ----------
  function about() {
    const a = B.about;
    const pillars = list(a.pillars).map(p => `<div class="about-item">
  <div class="about-item-title"><span style="letter-spacing:0.06em;">${p.title}</span></div>
  <div class="about-item-desc"><strong style="display:block;color:var(--text-dark);font-weight:700;margin-bottom:6px;">${p.head}</strong>${p.desc || ''}</div>
</div>`).join('');
    return section('About Brand', '', `<p class="about-lead">
    <strong style="display:block;font-size:17px;font-weight:700;letter-spacing:0.03em;color:var(--text-dark);line-height:1.45;margin-bottom:6px;">${a.title}</strong>
    <span style="display:block;font-size:13px;font-weight:600;letter-spacing:0.04em;color:var(--brand-text);margin-bottom:16px;">${a.subtitle}</span>
    <strong style="display:block;color:var(--text-dark);font-weight:700;font-size:14px;line-height:1.6;margin-bottom:8px;">${a.lead}</strong>
    ${a.body}
  </p>
  <div class="brand-img-wrap"><img src="${img(B.brandImage)}" alt="${B.name} 브랜드"></div>
  <div class="about-grid">${pillars}</div>
  <a href="${B.brandUrl}" target="_blank" rel="noopener" class="brand-link-btn">브랜드 바로가기 →</a>`);
  }

  // ---------- 캠페인 개요 ----------
  function overview() {
    const rows = [['형식', C.format]].concat(list(C.details)).concat([
      ['공동작업자', `<strong>필수&nbsp;·&nbsp;<span class="nb">${B.account}</span></strong>`],
      ['2차 활용', C.secondaryUse || '동의'],
      ['업로드 유지', C.keepPeriod || '3개월']
    ]).filter(r => r[1]);
    const info = `<div class="info-box"><div class="info-box-title">Campaign Details</div>
  ${rows.map(r => `<div class="info-row"><div class="info-key">${r[0]}</div><div class="info-val">${r[1]}</div></div>`).join('')}
</div>`;

    const items = list(C.overviewItems).map(i => keyItem(i[0], i[1])).join('');
    const purpose = C.purpose ? `<div class="key-msg-box" style="margin-top:20px;">
  <div class="key-msg-title">${C.purpose.title}</div>
  ${C.purpose.text ? `<div class="key-msg-text" style="margin-top:-8px;margin-bottom:4px;">${C.purpose.text}</div>` : ''}
  ${items}
</div>` : '';

    const recruit = has(C.recruit) ? `<div class="note-box" style="margin-top:4px;">
  <div class="note-box-title">👥 모집 조건</div>
  <ul>${C.recruit.map(r => `<li>${r}</li>`).join('')}</ul>
</div>` : '';

    const product = `<div style="font-size:12px;font-weight:700;color:var(--text-mid);margin:20px 0 10px;letter-spacing:0.05em;">제공 제품</div>
<div class="product-box">
  <img src="${img(P.image)}" alt="${B.name} ${P.name}" class="product-photo" loading="lazy">
  <div class="product-name">${P.name} ${P.volume ? `<span style="color:var(--text-light);font-weight:500;font-size:12.5px;">(${P.volume})</span>` : ''}</div>
  ${P.role ? `<div style="font-size:12.5px;font-weight:600;color:var(--brand-text);margin-top:-8px;">${P.role}</div>` : ''}
  ${list(P.features).map(f => `<div class="step-feat"><strong>${f[0]}</strong><span>${f[1]}</span></div>`).join('')}
  <a href="${P.url}" target="_blank" rel="noopener" class="product-link-btn">제품 보러가기 →</a>
</div>`;

    return section('Campaign Info', '캠페인 개요', info + purpose + recruit + product);
  }

  // ---------- 제작 가이드 ----------
  function contentGuide() {
    let h = '';
    if (P.brief) h += `<div class="brief-box"><div class="brief-label">One-line Brief</div><div class="brief-line">${P.brief}</div><div class="brief-protocol">${P.briefSub || ''}</div></div>`;

    h += `<div class="key-msg-box"><div class="key-msg-title">핵심 요청사항</div>
  <div class="key-msg-text" style="margin-top:-8px;">${C.coreRequest || ''}</div>
  ${P.mainPoint ? keyItem('메인 포인트', P.mainPoint) : ''}
  ${P.situation ? keyItem('상황 표현', P.situation) : ''}
  ${has(P.emphasis) ? keyItem('강조 포인트', `<ul class="sub-list" style="margin-top:0;">${P.emphasis.map(e => `<li>${e}</li>`).join('')}</ul>`) : ''}
</div>`;

    if (has(P.flowRequests)) h += `<div class="note-box" style="margin-top:20px;"><div class="note-box-title">🎯 영상 전체 흐름 &middot; 브랜드 핵심 요청사항</div>
  <ol style="padding-left:18px;font-size:12.5px;color:var(--text-mid);line-height:1.8;">${P.flowRequests.map(f => `<li>${f}</li>`).join('')}</ol></div>`;

    // 필수 포함
    const must = [];
    must.push(['&#128221;', '<strong class="hl-text">[중요] 영상 속 자막을 크게 넣어주세요.</strong><br><span class="hl">자막은 한눈에 잘 읽히도록 가독성 있게, 크게 넣어주세요.</span>', true]);
    if (C.voiceRequired) must.push(['&#127908;', '<strong class="hl-text">[필수] 본인의 실제 목소리로 더빙(내레이션)해 주세요.</strong><br>배경에 음악만 나오지 않게 음성을 함께 넣어주세요. <strong>AI 더빙은 사용할 수 없습니다.</strong>', true]);
    if (P.nameRule) must.push(['&#127991;&#65039;', P.nameRule, true]);
    if (C.childRequired) must.push(['&#127916;', '<strong>[영상]</strong> <strong>아이와 함께 등장하는 장면을 꼭 넣어주세요.</strong> 정돈된 아이 옷&middot;가족 옷&middot;침구&middot;수건과 함께, 세탁 환경(세탁실)과 <strong>실제 사용법</strong>(계량 &rarr; 유연제 칸 투입 &rarr; 마지막 헹굼)이 잘 드러나도록 담아주세요.']);
    list(C.extraMust).forEach(m => must.push(['&#10004;', m]));
    must.push(['&#9997;&#65039;', `<strong>[캡션]</strong> 제품명과 잔류세제 제거 효능을 정확히 적어주시고, 실제 경험 위주로 자유롭게 작성해 주세요. <strong>캡션 최상단 첫 줄에 <span class="nb">${B.account}</span></strong>을 표기해 주세요.`]);
    must.push(['&#128279;', `<strong>[공동작업자]</strong> <span class="nb">${B.account}</span> 초대 <strong>필수</strong>입니다. 업로드 시 '공동 작업자 초대' 기능으로 ${B.name} 공식 계정을 초대해 주세요.`]);
    h += `<div class="sub-head">&#10004; 영상 및 캡션 필수 포함</div><div class="must-list">${must.map(m => `<div class="must-item"${m[2] ? ' style="border:1.5px solid var(--brand-deep);"' : ''}><div class="must-icon">${m[0]}</div><div>${m[1]}</div></div>`).join('')}</div>`;

    // 기획전
    const pr = C.promo;
    if (pr) {
      h += `<div class="key-msg-box" style="margin-top:4px;margin-bottom:10px;">
  <div class="key-msg-title">기획전 안내${pr.name ? '&nbsp;·&nbsp;<span class="nb">' + pr.name + '</span>' : ''}</div>
  <div class="key-msg-text" style="margin-top:-8px;margin-bottom:4px;">${pr.intro || '영상 <strong>마지막 컷</strong>과 <strong>캡션 끝</strong>에 할인 소식을 짧게 덧붙여 주세요. 메인 메시지는 그대로 잔류세제 제거입니다.'}</div>
  ${pr.period ? keyItem('할인 기간', `<strong>${pr.period}</strong>`) : ''}
  ${pr.maxDiscount ? keyItem('할인 표현', `할인은 <strong>"최대 ${pr.maxDiscount}"</strong>로만 표기해 주세요.<ul class="sub-list"><li>예시 자막&middot;멘트: "지금 ${pr.sayName || '기획전'}에서 최대 ${pr.maxDiscount} 할인 중이에요."</li><li>상품별 가격&middot;최대혜택가는 쿠폰 조건이 붙은 가격이라 영상과 캡션에서 언급하지 않습니다.</li></ul>`) : ''}
</div>`;
      if (has(pr.images)) h += `<div class="proof-grid" style="grid-template-columns:repeat(${Math.min(pr.images.length, 3)},1fr);">${pr.images.map(i => `<a class="proof-thumb" href="${img(i[0])}" target="_blank" rel="noopener"><img src="${img(i[0])}" alt="${i[1]}" loading="lazy" style="height:170px;"><span>${i[1]}</span></a>`).join('')}</div><div class="proof-save">기획전 참고용 이미지예요. (이미지를 누르면 원본이 열려요)</div>`;
      if (pr.link) h += `<a href="${pr.link}" target="_blank" rel="noopener" class="concept-ref-link" style="margin-top:10px;"><span>${pr.linkLabel || '할인 링크'}</span></a>`;
    }

    // 상세 가이드
    let n = 0; const cs = [];
    if (has(P.situations)) cs.push(concept(++n, `상황적 소구 포인트&nbsp;&middot;&nbsp;<span class="nb">예시 ${P.situations.length}가지</span>`,
      `<div class="concept-intro"><strong>어떤 순간에 잔류세제가 걱정됐는지</strong>, 혹시 세제가 남아 있지 않을까 하는 불안감이 언제 생겼는지 상황적인 표현에 집중해 주세요.<br><span class="hl">아래 예시는 참고만 해주시고, 본인이 실제로 경험한 상황과 행동을 골라 자연스럽게 표현해 주세요.</span></div>
       <div style="margin-top:12px;">${P.situations.map((s, i) => idea(i + 1, '', '', `<div class="concept-quotes" style="margin-top:0;">${s.map(q => `<div class="quote-chip">"${q}"</div>`).join('')}</div>`)).join('')}</div>`));

    const sc = C.scenario === false ? null : P.scenario;
    if (sc) cs.push(concept(++n, `참고용 시나리오&nbsp;&middot;&nbsp;<span class="nb">${sc.cuts.length}컷</span>`,
      `<div class="concept-intro">${sc.intro}</div>
       <div class="bstep-hook"><div class="bstep-hook-label">권장 흐름</div><div class="bstep-hook-line">${sc.flow}</div>${sc.theme ? `<div class="bstep-hook-msg"><span>메인 주제</span>${sc.theme}</div>` : ''}</div>
       <ol class="bstep-list">${sc.cuts.map((c, i) => `<li class="bstep"><div class="bstep-head"><span class="bstep-num">${String(i + 1).padStart(2, '0')}</span><span class="bstep-name">${c[0]}</span></div><div class="bstep-shot">${c[1]}</div><div class="bstep-line">${c[2]}</div><div class="bstep-props"><span>핵심 자막</span>${c[3]}</div></li>`).join('')}</ol>
       ${sc.footnote ? `<div class="ref-note" style="margin-top:12px;">${sc.footnote}</div>` : ''}`));

    const shots = [];
    if (C.childRequired) shots.push(['아이와 함께 촬영하기 <span class="hl-text">(필수)</span>', '이번 캠페인의 메인은 <strong>아이와 함께 촬영하는 콘텐츠</strong>예요. 아이가 함께 등장하는 장면을 꼭 넣어주세요.']);
    list(P.mustShots).forEach(s => shots.push(s));
    if (shots.length) {
      const proof = has(P.proofImages) ? `<div class="proof-grid">${P.proofImages.map(i => `<a class="proof-thumb" href="${img(i[0])}" target="_blank" rel="noopener"><img src="${img(i[0])}" alt="${i[1]}" loading="lazy"><span>${i[1]}</span></a>`).join('')}</div><div class="proof-save">이미지를 누르면 원본이 열려요. 길게 눌러(PC는 우클릭) 저장한 뒤 영상에 활용해 주세요.</div>` : '';
      cs.push(concept(++n, `영상에 꼭 담아야 할&nbsp;<span class="nb">${shots.length}가지</span>`,
        `<div class="concept-intro">아래 ${shots.length}가지는 영상에 <strong>꼭 표현</strong>해 주세요.</div>
         <div style="margin-top:12px;">${shots.map((s, i) => idea(i + 1, s[0], s[1], i === shots.length - 1 ? proof : '')).join('')}</div>
         ${P.detailImage ? `<div class="brand-img-wrap" style="margin:14px 0 0;"><img src="${img(P.detailImage[0])}" alt="상세 페이지 참고 이미지" loading="lazy"></div><div class="proof-save">${P.detailImage[1]}</div>` : ''}`));
    }

    const refs = list(C.references || P.references);
    if (has(P.mood) || refs.length) cs.push(concept(++n, '촬영 무드&nbsp;·&nbsp;<span class="nb">참고 레퍼런스</span>',
      `<div class="concept-intro">자연스러운 장면 위주로 촬영해 주세요.</div>
       <ul class="sub-list" style="margin-top:12px;">${list(P.mood).map(m => `<li>${m}</li>`).join('')}</ul>
       ${refs.length ? `<div class="concept-refs"><div class="concept-quotes-label">참고 콘텐츠</div>${refs.map(r => `<a href="${r[0]}" target="_blank" rel="noopener" class="concept-ref-link"><span>${r[1]}</span></a>`).join('')}</div>` : ''}
       <div class="ref-note" style="margin-top:12px;">&bull; 위 레퍼런스는 <strong>톤&middot;구성 참고용</strong>입니다. 동일하게 따라 하실 필요는 없으며, 채널 톤에 맞게 자유롭게 재해석해 주세요.</div>`));

    if (P.usage) cs.push(concept(++n, '사용법 가이드&nbsp;·&nbsp;<span class="nb">권장 사용량</span>',
      `<div class="concept-intro">${P.usage.intro}</div><div style="margin-top:16px;">${P.usage.tables.map(t => `<div class="usage-table-label">${t[0]}</div><table class="usage-table"><tr><th>세탁방식</th><th>세탁량</th><th>권장 사용량</th></tr>${t[1].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><strong>${r[2]}</strong></td></tr>`).join('')}</table>`).join('')}</div>
       ${P.usage.image ? `<div class="brand-img-wrap" style="margin-bottom:0;"><img src="${img(P.usage.image)}" alt="사용법" loading="lazy"></div>` : ''}`));

    if (cs.length) h += `<div class="sub-head">&#9654; 상세 가이드 <span style="font-weight:500;color:var(--text-light);">— 항목을 탭하여 펼쳐보세요</span></div>
  <div class="concept-list">
    <div class="pick-note"><div class="pick-note-badge">참고용</div><div class="pick-note-text">아래 예시와 시나리오는 <strong>참고용</strong>이에요. 대본을 외우기보다 핵심 방향만 지키고, <strong>평소 말투와 실제 습관에 맞게</strong> 편하게 바꿔 담아주세요.${C.childRequired ? '<br>단, <strong>아이와 함께 촬영하는 장면은 꼭 포함</strong>해 주세요.' : ''}</div></div>
    ${cs.join('')}
  </div>`;

    // DO / DON'T / 규정 / 해시태그
    const dos = (C.childRequired ? ['아이와 함께 촬영하고, 정돈된 아이 옷&middot;가족 옷&middot;침구&middot;수건이 잘 보이도록 표현'] : []).concat(list(P.dos), list(C.extraDos));
    const donts = list(P.donts).concat(C.promo && C.promo.maxDiscount ? [`기획전 할인은 '최대 ${C.promo.maxDiscount}'로만 표기하고, 상품별 가격&middot;최대혜택가 등 구체적인 금액은 언급 금지`] : [], list(C.extraDonts));
    const tags = list(C.hashtags || P.hashtags);
    h += `<div class="divider"></div><div class="fold-group">
  ${fold('&#10003;', '이렇게 해주세요', dos.length, `<div class="guard-grid"><div class="guard-box must">${dos.map(d => `<div class="guard-item">${d}</div>`).join('')}</div></div>`)}
  ${fold('&#10005;', '이렇게 하지 말아주세요', donts.length, `<div class="ref-note" style="margin-bottom:12px;">아래 항목은 <strong>반드시 피해야 하는 표현</strong>입니다. 광고 심의와 직결되는 부분이라 해당 내용이 포함되면 수정 요청이 나갈 수 있습니다.</div><div class="guard-grid"><div class="guard-box avoid">${donts.map(d => `<div class="guard-item">${d}</div>`).join('')}</div></div>`, 'fold-avoid')}
  ${fold('&#128203;', '진행 규정', 2, `<div class="rule-grid">
    <div class="rule-card"><div class="rule-num">01</div><div class="rule-title">브랜드 공동작업 요청</div><div class="rule-sub"><span class="nb">${B.account}</span> 초대 필수</div><div class="rule-body"><p>게시물 업로드 시 <strong>'공동 작업자 초대'</strong> 기능으로 ${B.name} 공식 계정을 초대해 주세요.</p><p>단순 태그가 아닌 <strong>공동작업 요청</strong>이어야 브랜드 계정에도 함께 노출됩니다.</p></div></div>
    <div class="rule-card"><div class="rule-num">02</div><div class="rule-title">필수 표기 가이드</div><div class="rule-sub">협업 표기 및 계정 태그</div><div class="rule-body"><p>캡션 <strong>최상단 첫 줄</strong>에 <span class="nb">${B.account}</span> 표기</p><p>필수 해시태그는 아래 <strong>해시태그</strong> 항목을 참고해 주세요.</p></div></div>
  </div><div class="ref-note" style="margin-top:12px;text-align:center;">&#8251; 공동작업 수락까지 시간이 소요될 수 있으니, 게시 전 요청 상태를 확인해 주세요.</div>`)}
  ${tags.length ? fold('#', '해시태그', 'badge', `<div class="hashtag-section" style="margin-top:0;"><div class="hashtag-label">필수 해시태그 <span class="required">필수</span></div><div class="hashtag-wrap">${tags.map(t => `<div class="hashtag req">${t}</div>`).join('')}</div><div class="ref-note">&bull; 그 외 협의된 개별 해시태그가 있는 경우 함께 추가해 주세요.</div></div>`) : ''}
</div>`;

    if (has(B.ops.draftReview)) h += `<div class="note-box" style="margin-top:20px;"><div class="note-box-title">📌 콘텐츠 초안 전달 및 검수 안내</div><ul>${B.ops.draftReview.map(d => `<li>${d}</li>`).join('')}</ul><div class="ref-note" style="margin-top:6px;">※ 원활한 캠페인 진행을 위한 절차이오니 너른 양해와 협조 부탁드립니다.</div></div>`;
    h += `<div class="warning-box">&#9888;&#65039; <strong>업로드 기한을 반드시 준수해주세요.</strong><br>기간 내 업로드가 이루어지지 않을 경우 고료 지급이 불가합니다.<br><br><span class="nb">공동작업자 설정</span> 및 콘텐츠 2차 활용에 동의하는 것으로 간주됩니다.</div>`;

    return section('Content Guide', '제작 가이드', h);
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
  <div class="note-box" style="margin-top:16px;"><div class="note-box-title">📌 업로드·정산 안내</div><ul><li>안내된 업로드 마감일까지 업로드 시 정산이 진행됩니다.</li><li>정산 자료 제출 후 <strong>${B.ops.settlement.days}</strong> 이내 지급됩니다.</li></ul></div>
  <div class="note-box"><div class="note-box-title">📌 콘텐츠 활용 안내</div><ul><li>콘텐츠는 브랜드 계정 내 스토리, 피드에 활용될 수 있습니다.</li><li>2차 활용에 동의해 주신 분들의 콘텐츠는 ${B.name} 공식 홈페이지, SNS, 플랫폼 등에 활용될 수 있는 점 참고 부탁드립니다.</li></ul></div>
  <label class="agree-row"><input type="checkbox" name="agree" required><span>안내된 캠페인별 가이드라인 및 고료 조건을 확인했으며 이에 동의합니다.<br><br>제작된 콘텐츠는 브랜드 및 SIRIAI의 2차 활용에 동의합니다.<br><br><strong>(필수)</strong> 진행 제품은 브랜드 프로모션 상황에 따라 일부 변경될 수 있습니다.<br><br><strong>[필수]</strong> 캠페인 선정 후 개인 변심 및 일방적인 취소는 불가하며, 취소 시 <strong>제공된 제품 비용이 발생할 수 있음</strong>에 동의합니다.</span></label>
  <button type="submit" class="submit-btn">${B.name} 캠페인 지원서 제출하기</button>
</form>`);
  }

  // ---------- 정산 ----------
  function settlement() {
    const s = B.ops.settlement;
    return section('Settlement', '정산', `<div class="settlement-lead">캠페인 선정 완료 후 정산을 위한 서류 및 연락처를 누락 없이 제출해 주세요.<br>정산은 <strong>정산 자료 제출 후 ${s.days}</strong> 이내 지급됩니다.</div>
  <div class="settle-tag-label">제출 서류</div><div class="settle-doc-text">— ${s.docs}</div>
  <div class="settle-tag-label">수신 이메일</div><div class="settle-copy-box"><span>${s.email}</span><button type="button" class="settle-copy-btn" data-copy="${s.email}">복사</button></div>
  <div class="settle-tag-label">메일 제목</div><div class="settle-copy-box"><span>${s.subject}</span><button type="button" class="settle-copy-btn" data-copy="${s.subject}">복사</button></div>
  <div class="warning-box">! 정산 자료는 브랜드로부터 확인 안내를 받은 인플루언서에 한해서 제출해 주세요.<br>! 확정 안내를 받지 못한 경우 서류를 제출하지 마세요.</div>`);
  }

  // ---------- 그리기 ----------
  document.title = `${B.name} — ${C.pageTitle || '인플루언서 가이드라인'}`;
  document.getElementById('app').innerHTML = banner() + about() + overview() + contentGuide() + (formOn ? application() : '') + settlement() +
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
