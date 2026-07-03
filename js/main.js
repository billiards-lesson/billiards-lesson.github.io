// 모바일 메뉴 토글
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // 링크 클릭 시 메뉴 닫기
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
})();

// 상담신청 폼
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var p1 = document.getElementById('p1');
  var p2 = document.getElementById('p2');
  var p3 = document.getElementById('p3');
  var combined = document.getElementById('phoneCombined');

  // 숫자만 + 자동 다음칸 이동
  [p1, p2, p3].forEach(function (el, i) {
    if (!el) return;
    var next = [p1, p2, p3][i + 1];
    el.addEventListener('input', function () {
      el.value = el.value.replace(/[^0-9]/g, '');
      if (next && el.value.length >= el.maxLength) next.focus();
    });
  });

  // 상담 신청하기 → 문자앱 자동 채움 (받는번호 010-7758-1862, 손님은 전송만)
  var OWNER = '01077581862';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (document.getElementById('name').value || '').trim();
    var a = (p1.value || '').trim(), b = (p2.value || '').trim(), c = (p3.value || '').trim();
    var memo = (document.getElementById('memo').value || '').trim();
    if (!name) { alert('성함을 입력해 주세요.'); return; }
    if (b.length < 3 || c.length < 4) { alert('휴대폰 번호를 정확히 입력해 주세요.'); p2.focus(); return; }
    if (!memo) { alert('문의 내용을 입력해 주세요.'); return; }

    var phone = a + '-' + b + '-' + c;
    if (combined) combined.value = phone;
    var body = '[상담신청]\n작성자: ' + name + '\n연락처: ' + phone + '\n문의: ' + memo;
    // sms:번호?&body= → iOS·안드로이드 공통 호환
    window.location.href = 'sms:' + OWNER + '?&body=' + encodeURIComponent(body);

    // 문자앱 열린 뒤 안내 메시지 표시
    var ok = document.getElementById('formOk');
    if (ok) { form.style.display = 'none'; ok.style.display = 'block'; }
  });
})();

// 갤러리 라이트박스 (사진 클릭 → 확대)
(function () {
  var figs = document.querySelectorAll('.gallery figure');
  if (!figs.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lb-close" aria-label="닫기">&times;</button>' +
                  '<button class="lb-nav lb-prev" aria-label="이전">&#8249;</button>' +
                  '<img alt=""><div class="lb-cap"></div>' +
                  '<button class="lb-nav lb-next" aria-label="다음">&#8250;</button>';
  document.body.appendChild(box);
  var lbImg = box.querySelector('img');
  var lbCap = box.querySelector('.lb-cap');

  var items = [];
  figs.forEach(function (fig, i) {
    var img = fig.querySelector('img');
    if (!img) return;
    var cap = fig.querySelector('figcaption');
    items.push({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '', cap: cap ? cap.textContent : '' });
    fig.style.cursor = 'zoom-in';
    fig.addEventListener('click', function () { open(i); });
  });

  var cur = 0;
  function open(i) {
    cur = i;
    var it = items[cur];
    lbImg.src = it.src; lbImg.alt = it.alt;
    lbCap.textContent = it.cap;
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; }
  function go(d) { open((cur + d + items.length) % items.length); }

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); go(-1); });
  box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); go(1); });
  box.addEventListener('click', function (e) { if (e.target === box || e.target === lbImg) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });
})();
