# Netlify 이전 체크리스트 (사이트 수정 다 끝난 뒤 진행)

## 왜 옮기나
Netlify Forms(무료 월 100건)로 상담신청을 **대시보드 + 이메일 알림**으로 받기 위해.
현재는 GitHub Pages + FormSubmit(이메일 전송)로 이미 작동 중 — 급하지 않으면 그대로 둬도 됨.

---

## 네가 할 일 (브라우저, 약 2분)
1. https://app.netlify.com 접속 → **GitHub 계정으로 로그인**
2. **Add new site → Import an existing project → GitHub → `billiards-lesson` 레포 선택**
3. 빌드 설정: Publish directory `.` (netlify.toml에 이미 있음) → **Deploy**
4. 배포되면 `random-name.netlify.app` 주소가 나옴 → **Site settings → Change site name** 에서 `mia-optimus24` 등으로 변경 → 주소: `mia-optimus24.netlify.app`
5. **Forms → Form notifications → Add notification → Email notification** → 받을 주소 `ansgud1862@gmail.com` 입력
   (이제 상담신청 오면 이 메일로 알림 + Netlify 대시보드에 기록)

## 내가 할 일 (네가 "netlify로 옮기자" 하면)
- 상담신청 폼을 **Netlify Forms 형식**으로 변환
  (`data-netlify="true"`, `form-name` 히든필드, 허니팟, action→ 감사 페이지)
  → FormSubmit 관련 히든필드 제거
- `canonical` / `og:url` / `sitemap.xml` / robots의 도메인을 **새 netlify.app 주소로 일괄 교체**
- `thanks.html`(제출 완료 페이지) 추가
- 커밋·푸시 → Netlify 자동 재배포

## 도메인
- 지금: 무료 `xxx.netlify.app`
- 나중에 `.com`/`.co.kr` 사면 → Netlify → Domain settings에서 연결 (무료 SSL 자동)

## 참고
- GitHub Pages 주소(heyjyu.github.io/billiards-lesson)는 그대로 살아있음. 원하면 Netlify로 일원화하거나, GitHub Pages를 비활성화하면 됨.
- 검색 등록(네이버·구글)은 **최종 주소 확정 후** 하는 게 좋음 (주소 바뀌면 재등록 필요).
