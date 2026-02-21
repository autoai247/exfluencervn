const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit').default || require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');

const KO_FONT = '/mnt/c/Windows/Fonts/malgun.ttf';
const VI_FONT = '/mnt/c/Windows/Fonts/arial.ttf';
const OUT_DIR = path.join(__dirname, '../public/templates');

const C = {
  black: rgb(0.08, 0.08, 0.08),
  primary: rgb(1, 0.42, 0.42),       // #FF6B6B
  secondary: rgb(0.3, 0.76, 0.76),   // #4ECDC4
  accent: rgb(0.95, 0.8, 0.0),       // #F2CC00
  gray: rgb(0.45, 0.45, 0.45),
  lightGray: rgb(0.92, 0.92, 0.92),
  white: rgb(1, 1, 1),
  divider: rgb(0.85, 0.85, 0.85),
};

async function createDoc(fontPath) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const fontBytes = fs.readFileSync(fontPath);
  const font = await doc.embedFont(fontBytes);
  return { doc, font };
}

function addPage(doc) {
  return doc.addPage([595, 842]); // A4
}

// ─── 공통 헬퍼 ───────────────────────────────────────────────────────────────

function drawRect(page, x, y, w, h, color) {
  page.drawRectangle({ x, y, width: w, height: h, color });
}

function drawText(page, text, { x, y, size = 11, font, color = C.black, maxWidth }) {
  if (!text) return;
  const str = String(text);
  if (maxWidth) {
    // 간단한 줄바꿈
    const words = str.split('');
    let line = '';
    let cy = y;
    for (const ch of words) {
      const test = line + ch;
      const w = font.widthOfTextAtSize(test, size);
      if (w > maxWidth && line.length > 0) {
        page.drawText(line, { x, y: cy, size, font, color });
        cy -= size + 4;
        line = ch;
      } else {
        line = test;
      }
    }
    if (line) page.drawText(line, { x, y: cy, size, font, color });
    return cy - (size + 4);
  }
  page.drawText(str, { x, y, size, font, color });
  return y - (size + 6);
}

function sectionHeader(page, font, text, y) {
  drawRect(page, 40, y - 4, 515, 26, C.primary);
  page.drawText(text, { x: 50, y: y + 4, size: 13, font, color: C.white });
  return y - 36;
}

function divider(page, y) {
  drawRect(page, 40, y, 515, 1, C.divider);
  return y - 12;
}

function badge(page, font, text, x, y, bgColor = C.secondary) {
  const w = font.widthOfTextAtSize(text, 9) + 12;
  drawRect(page, x, y - 2, w, 16, bgColor);
  page.drawText(text, { x: x + 6, y: y + 1, size: 9, font, color: C.white });
  return x + w + 6;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MEDIA KIT
// ─────────────────────────────────────────────────────────────────────────────

async function generateMediaKit(lang) {
  const fontPath = lang === 'ko' ? KO_FONT : VI_FONT;
  const { doc, font } = await createDoc(fontPath);
  const page = addPage(doc);
  const { width, height } = page.getSize();

  const T = lang === 'ko' ? {
    title: '미디어 킷',
    subtitle: '인플루언서 자기소개 템플릿',
    tip: '* 파란색 [] 안의 내용을 본인 정보로 채워주세요.',
    s1: '기본 프로필',
    name: '이름 / 활동명',
    namePh: '[이름 또는 닉네임]',
    location: '활동 지역',
    locationPh: '[도시, 국가]',
    category: '콘텐츠 분야',
    categoryPh: '[뷰티 / 패션 / 푸드 / 라이프스타일 / ...]',
    bio: '자기소개 (2-3줄)',
    bioPh: '[본인만의 콘텐츠 스타일과 강점을 간략히 소개하세요.]',
    s2: 'SNS 채널 현황',
    platform: '플랫폼',
    handle: '계정명',
    followers: '팔로워 수',
    er: '참여율 (ER%)',
    avg: '평균 조회수',
    ig: 'Instagram',
    tt: 'TikTok',
    yt: 'YouTube',
    s3: '팔로워 통계',
    gender: '성별 비율',
    genderPh: '[여성 _% / 남성 _%]',
    age: '주요 연령대',
    agePh: '[18-24세 _% / 25-34세 _% / 35+ _%]',
    geoTop: '상위 지역',
    geoPh: '[도시1 _% / 도시2 _% / 도시3 _%]',
    s4: '협업 사례',
    brand: '브랜드',
    type: '협업 유형',
    result: '성과',
    ph1: '[브랜드명]', ph2: '[게시물/스토리/영상]', ph3: '[조회수, 좋아요 수 등]',
    s5: '서비스 요금 (간략)',
    item: '서비스 항목',
    price: '요금 (VND)',
    igPost: 'Instagram 피드 게시물',
    igStory: 'Instagram 스토리',
    ttVideo: 'TikTok 영상',
    priceNote: '[가격]',
    s6: '연락처',
    email: '이메일',
    kakao: '카카오톡 / Zalo',
    emailPh: '[your@email.com]',
    kakaoPh: '[ID 또는 번호]',
    footer: 'Exfluencer VN | exfluencer.vn | 인플루언서 마케팅 플랫폼',
  } : {
    title: 'Media Kit',
    subtitle: 'Mẫu Giới Thiệu Influencer',
    tip: '* Hãy điền thông tin của bạn vào các ô có dấu [].',
    s1: 'Thông Tin Cơ Bản',
    name: 'Tên / Tên hoạt động',
    namePh: '[Tên hoặc nickname]',
    location: 'Khu vực hoạt động',
    locationPh: '[Thành phố, Quốc gia]',
    category: 'Lĩnh vực nội dung',
    categoryPh: '[Làm đẹp / Thời trang / Ẩm thực / Lifestyle / ...]',
    bio: 'Giới thiệu bản thân (2-3 dòng)',
    bioPh: '[Giới thiệu ngắn gọn về phong cách nội dung và thế mạnh của bạn.]',
    s2: 'Tình Trạng Kênh SNS',
    platform: 'Nền tảng',
    handle: 'Tên tài khoản',
    followers: 'Số người theo dõi',
    er: 'Tỉ lệ tương tác (ER%)',
    avg: 'Lượt xem trung bình',
    ig: 'Instagram',
    tt: 'TikTok',
    yt: 'YouTube',
    s3: 'Thống Kê Người Theo Dõi',
    gender: 'Tỉ lệ giới tính',
    genderPh: '[Nữ _% / Nam _%]',
    age: 'Độ tuổi chính',
    agePh: '[18-24 tuổi _% / 25-34 tuổi _% / 35+ _%]',
    geoTop: 'Khu vực hàng đầu',
    geoPh: '[Thành phố 1 _% / Thành phố 2 _% / ...]',
    s4: 'Ví Dụ Hợp Tác',
    brand: 'Thương hiệu',
    type: 'Loại hợp tác',
    result: 'Kết quả',
    ph1: '[Tên thương hiệu]', ph2: '[Bài đăng/Story/Video]', ph3: '[Lượt xem, lượt thích, ...]',
    s5: 'Bảng Giá Tóm Tắt',
    item: 'Dịch vụ',
    price: 'Giá (VND)',
    igPost: 'Bài đăng feed Instagram',
    igStory: 'Story Instagram',
    ttVideo: 'Video TikTok',
    priceNote: '[Giá]',
    s6: 'Liên Hệ',
    email: 'Email',
    kakao: 'Zalo / KakaoTalk',
    emailPh: '[your@email.com]',
    kakaoPh: '[ID hoặc số điện thoại]',
    footer: 'Exfluencer VN | exfluencer.vn | Nền tảng Influencer Marketing',
  };

  let y = height - 40;

  // ── Header banner
  drawRect(page, 0, height - 90, width, 90, C.primary);
  page.drawText(T.title, { x: 40, y: height - 48, size: 30, font, color: C.white });
  page.drawText(T.subtitle, { x: 40, y: height - 72, size: 13, font, color: rgb(1,0.85,0.85) });
  // logo area
  drawRect(page, 460, height - 80, 100, 70, rgb(0.9,0.3,0.3));
  page.drawText('Exfluencer', { x: 464, y: height - 52, size: 10, font, color: C.white });
  page.drawText('VN', { x: 490, y: height - 65, size: 16, font, color: C.white });

  y = height - 104;
  page.drawText(T.tip, { x: 40, y, size: 9, font, color: C.gray });
  y -= 18;

  // ── S1 기본 프로필
  y = sectionHeader(page, font, T.s1, y);

  const fields1 = [
    [T.name, T.namePh],
    [T.location, T.locationPh],
    [T.category, T.categoryPh],
    [T.bio, T.bioPh],
  ];
  for (const [label, ph] of fields1) {
    page.drawText(label, { x: 50, y, size: 10, font, color: C.gray });
    drawRect(page, 180, y - 4, 370, 18, C.lightGray);
    page.drawText(ph, { x: 185, y: y + 1, size: 9, font, color: rgb(0.6,0.6,0.6) });
    y -= 26;
  }
  y -= 6;
  y = divider(page, y);

  // ── S2 SNS
  y = sectionHeader(page, font, T.s2, y);

  // table header
  const cols = [50, 145, 260, 355, 455];
  const headers = [T.platform, T.handle, T.followers, T.er, T.avg];
  drawRect(page, 40, y - 4, 515, 20, rgb(0.25,0.25,0.25));
  headers.forEach((h, i) => page.drawText(h, { x: cols[i], y: y + 1, size: 8, font, color: C.white }));
  y -= 26;

  const platforms = [T.ig, T.tt, T.yt];
  for (let i = 0; i < platforms.length; i++) {
    const bg = i % 2 === 0 ? C.lightGray : C.white;
    drawRect(page, 40, y - 4, 515, 20, bg);
    page.drawText(platforms[i], { x: cols[0], y: y + 1, size: 9, font, color: C.black });
    ['@[handle]', '[팔로워]', '[_%]', '[조회수]'].forEach((ph, j) =>
      page.drawText(lang === 'ko' ? ph : ph.replace('팔로워','followers').replace('조회수','views'),
        { x: cols[j+1], y: y + 1, size: 9, font, color: rgb(0.6,0.6,0.6) })
    );
    y -= 22;
  }
  y -= 6;
  y = divider(page, y);

  // ── S3 팔로워 통계
  y = sectionHeader(page, font, T.s3, y);
  const stats = [[T.gender, T.genderPh],[T.age, T.agePh],[T.geoTop, T.geoPh]];
  for (const [label, ph] of stats) {
    page.drawText(label, { x: 50, y, size: 10, font, color: C.gray });
    drawRect(page, 210, y - 4, 340, 18, C.lightGray);
    page.drawText(ph, { x: 215, y: y + 1, size: 9, font, color: rgb(0.6,0.6,0.6) });
    y -= 26;
  }
  y -= 4;
  y = divider(page, y);

  // ── S4 협업 사례
  y = sectionHeader(page, font, T.s4, y);
  const cCols = [50, 200, 340];
  const cHdrs = [T.brand, T.type, T.result];
  drawRect(page, 40, y - 4, 515, 20, rgb(0.25,0.25,0.25));
  cHdrs.forEach((h,i) => page.drawText(h, { x: cCols[i], y: y+1, size: 9, font, color: C.white }));
  y -= 24;
  for (let i = 0; i < 3; i++) {
    drawRect(page, 40, y - 4, 515, 20, i % 2 === 0 ? C.lightGray : C.white);
    [T.ph1,T.ph2,T.ph3].forEach((ph,j) =>
      page.drawText(ph, { x: cCols[j], y: y+1, size: 9, font, color: rgb(0.6,0.6,0.6) }));
    y -= 22;
  }
  y -= 4;
  y = divider(page, y);

  // ── S5 요금
  y = sectionHeader(page, font, T.s5, y);
  const pCols = [50, 380];
  drawRect(page, 40, y - 4, 515, 20, rgb(0.25,0.25,0.25));
  [T.item, T.price].forEach((h,i) => page.drawText(h, { x: pCols[i], y: y+1, size: 9, font, color: C.white }));
  y -= 24;
  [T.igPost, T.igStory, T.ttVideo].forEach((item, i) => {
    drawRect(page, 40, y-4, 515, 20, i % 2 === 0 ? C.lightGray : C.white);
    page.drawText(item, { x: pCols[0], y: y+1, size: 9, font, color: C.black });
    page.drawText(T.priceNote, { x: pCols[1], y: y+1, size: 9, font, color: rgb(0.6,0.6,0.6) });
    y -= 22;
  });
  y -= 4;
  y = divider(page, y);

  // ── S6 연락처
  y = sectionHeader(page, font, T.s6, y);
  [[T.email, T.emailPh],[T.kakao, T.kakaoPh]].forEach(([label, ph]) => {
    page.drawText(label, { x: 50, y, size: 10, font, color: C.gray });
    drawRect(page, 180, y-4, 370, 18, C.lightGray);
    page.drawText(ph, { x: 185, y: y+1, size: 9, font, color: rgb(0.6,0.6,0.6) });
    y -= 26;
  });

  // ── Footer
  drawRect(page, 0, 0, width, 30, C.black);
  page.drawText(T.footer, { x: 40, y: 10, size: 8, font, color: rgb(0.6,0.6,0.6) });

  const bytes = await doc.save();
  const outPath = path.join(OUT_DIR, `media-kit-${lang}.pdf`);
  fs.writeFileSync(outPath, bytes);
  console.log(`✅ ${outPath}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. RATE CARD
// ─────────────────────────────────────────────────────────────────────────────

async function generateRateCard(lang) {
  const fontPath = lang === 'ko' ? KO_FONT : VI_FONT;
  const { doc, font } = await createDoc(fontPath);
  const page = addPage(doc);
  const { width, height } = page.getSize();

  const T = lang === 'ko' ? {
    title: '서비스 요금표',
    subtitle: '인플루언서 서비스 단가표',
    tip: '* 가격은 협의 가능합니다. 팔로워 수, 참여율, 캠페인 특성에 따라 달라질 수 있습니다.',
    name: '활동명 / 닉네임',
    namePh: '[이름]',
    handle: '대표 채널',
    handlePh: '@[handle]',
    followers: '총 팔로워',
    followersPh: '[숫자] 명',
    er: '평균 참여율',
    erPh: '[숫자]%',
    igTitle: 'Instagram',
    ttTitle: 'TikTok',
    ytTitle: 'YouTube',
    addTitle: '부가 서비스',
    serviceCol: '서비스',
    specCol: '세부 사항',
    priceCol: '요금 (VND)',
    igRows: [
      ['피드 게시물', '이미지 1장 + 캡션'],
      ['피드 캐러셀', '이미지 3-10장 + 캡션'],
      ['Reels', '15-60초 영상'],
      ['스토리 (1개)', '24시간 노출'],
      ['스토리 패키지 (3개)', '링크 스티커 포함'],
    ],
    ttRows: [
      ['짧은 영상', '15-60초'],
      ['일반 영상', '1-3분'],
      ['라이브 방송', '1시간'],
    ],
    ytRows: [
      ['영상 (언급)', '영상 내 제품 언급'],
      ['영상 (전용)', '전체 제품 리뷰'],
    ],
    addRows: [
      ['사진 촬영만', '편집 없이 원본 사진'],
      ['영상 편집비', '추가 편집 작업'],
      ['콘텐츠 사용권', '브랜드 재사용 허가'],
      ['독점 계약', '경쟁사 광고 제한'],
    ],
    note: '참고 사항',
    notes: [
      '• 위 가격은 기본 단가이며, 캠페인 복잡도에 따라 조정될 수 있습니다.',
      '• 패키지 진행 시 5-15% 할인 협의 가능합니다.',
      '• 제품 제공 + 현금 조합도 협의 가능합니다.',
      '• 콘텐츠 사전 검토는 게시 24시간 전까지 가능합니다.',
    ],
    priceNote: '[금액]',
    footer: 'Exfluencer VN | exfluencer.vn | 인플루언서 마케팅 플랫폼',
  } : {
    title: 'Bảng Giá Dịch Vụ',
    subtitle: 'Bảng Báo Giá Influencer',
    tip: '* Giá có thể thương lượng tùy theo số followers, ER và đặc điểm chiến dịch.',
    name: 'Tên / Nickname',
    namePh: '[Tên]',
    handle: 'Kênh chính',
    handlePh: '@[handle]',
    followers: 'Tổng followers',
    followersPh: '[Con số]',
    er: 'ER trung bình',
    erPh: '[Con số]%',
    igTitle: 'Instagram',
    ttTitle: 'TikTok',
    ytTitle: 'YouTube',
    addTitle: 'Dịch Vụ Bổ Sung',
    serviceCol: 'Dịch vụ',
    specCol: 'Chi tiết',
    priceCol: 'Giá (VND)',
    igRows: [
      ['Bài đăng feed', '1 ảnh + caption'],
      ['Carousel feed', '3-10 ảnh + caption'],
      ['Reels', 'Video 15-60 giây'],
      ['Story (1 cái)', 'Hiển thị 24 giờ'],
      ['Gói Story (3 cái)', 'Bao gồm link sticker'],
    ],
    ttRows: [
      ['Video ngắn', '15-60 giây'],
      ['Video thường', '1-3 phút'],
      ['Livestream', '1 tiếng'],
    ],
    ytRows: [
      ['Video (đề cập)', 'Mention sản phẩm trong video'],
      ['Video (độc quyền)', 'Review toàn bộ sản phẩm'],
    ],
    addRows: [
      ['Chụp ảnh sản phẩm', 'Ảnh gốc không chỉnh sửa'],
      ['Phí chỉnh sửa video', 'Công việc edit thêm'],
      ['Quyền sử dụng nội dung', 'Cho phép thương hiệu tái sử dụng'],
      ['Hợp đồng độc quyền', 'Hạn chế quảng cáo đối thủ'],
    ],
    note: 'Ghi Chú',
    notes: [
      '• Giá trên là giá cơ bản, có thể điều chỉnh tùy độ phức tạp chiến dịch.',
      '• Đặt gói nhiều dịch vụ có thể được giảm 5-15%.',
      '• Có thể kết hợp sản phẩm + tiền mặt theo thỏa thuận.',
      '• Xét duyệt nội dung trước khi đăng (trước 24 giờ).',
    ],
    priceNote: '[Giá]',
    footer: 'Exfluencer VN | exfluencer.vn | Nền tảng Influencer Marketing',
  };

  let y = height - 40;

  // ── Header
  drawRect(page, 0, height - 90, width, 90, C.secondary);
  page.drawText(T.title, { x: 40, y: height - 48, size: 26, font, color: C.white });
  page.drawText(T.subtitle, { x: 40, y: height - 72, size: 12, font, color: rgb(0.9,1,1) });
  drawRect(page, 460, height - 80, 100, 70, rgb(0.2,0.6,0.6));
  page.drawText('Exfluencer', { x: 464, y: height - 52, size: 10, font, color: C.white });
  page.drawText('VN', { x: 490, y: height - 65, size: 16, font, color: C.white });

  y = height - 104;
  page.drawText(T.tip, { x: 40, y, size: 9, font, color: C.gray });
  y -= 20;

  // ── 인플루언서 기본 정보 박스
  drawRect(page, 40, y - 50, 515, 56, C.lightGray);
  const infoFields = [
    [T.name, T.namePh, 50, y-10],
    [T.handle, T.handlePh, 200, y-10],
    [T.followers, T.followersPh, 350, y-10],
    [T.er, T.erPh, 470, y-10],
  ];
  for (const [label, ph, x, iy] of infoFields) {
    page.drawText(label, { x, y: iy + 16, size: 8, font, color: C.gray });
    drawRect(page, x - 2, iy - 4, 130, 18, C.white);
    page.drawText(ph, { x, y: iy + 1, size: 9, font, color: rgb(0.6,0.6,0.6) });
  }
  y -= 66;

  // ── 테이블 공통 함수
  function drawTable(title, rows, colWidths, color) {
    y = sectionHeader(page, font, title, y);
    const cx = [50];
    for (let i = 0; i < colWidths.length - 1; i++) cx.push(cx[i] + colWidths[i]);

    // 헤더
    drawRect(page, 40, y-4, 515, 20, color);
    [T.serviceCol, T.specCol, T.priceCol].forEach((h, i) =>
      page.drawText(h, { x: cx[i], y: y+1, size: 9, font, color: C.white }));
    y -= 22;

    rows.forEach(([service, spec], ri) => {
      drawRect(page, 40, y-4, 515, 20, ri % 2 === 0 ? C.lightGray : C.white);
      page.drawText(service, { x: cx[0], y: y+1, size: 9, font, color: C.black });
      page.drawText(spec, { x: cx[1], y: y+1, size: 8, font, color: C.gray });
      page.drawText(T.priceNote, { x: cx[2], y: y+1, size: 9, font, color: rgb(0.6,0.6,0.6) });
      y -= 22;
    });
    y -= 6;
  }

  const colWidths = [190, 210, 115];
  drawTable(T.igTitle, T.igRows, colWidths, C.primary);
  drawTable(T.ttTitle, T.ttRows, colWidths, C.black);
  drawTable(T.ytTitle, T.ytRows, colWidths, rgb(0.8,0.1,0.1));
  drawTable(T.addTitle, T.addRows, colWidths, C.secondary);

  // ── 참고사항
  y = sectionHeader(page, font, T.note, y);
  for (const note of T.notes) {
    page.drawText(note, { x: 50, y, size: 9, font, color: C.gray });
    y -= 16;
  }

  // ── Footer
  drawRect(page, 0, 0, width, 30, C.black);
  page.drawText(T.footer, { x: 40, y: 10, size: 8, font, color: rgb(0.6,0.6,0.6) });

  const bytes = await doc.save();
  const outPath = path.join(OUT_DIR, `rate-card-${lang}.pdf`);
  fs.writeFileSync(outPath, bytes);
  console.log(`✅ ${outPath}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CAPTION HOOKS 50가지
// ─────────────────────────────────────────────────────────────────────────────

async function generateCaptionHooks(lang) {
  const fontPath = lang === 'ko' ? KO_FONT : VI_FONT;
  const { doc, font } = await createDoc(fontPath);

  const T = lang === 'ko' ? {
    title: '캡션 훅 50가지',
    subtitle: '높은 참여율을 이끄는 캡션 오프너 모음',
    categories: [
      {
        name: '궁금증 유발 (10가지)',
        color: C.primary,
        items: [
          '이걸 알았다면 진작 했을 텐데...',
          '아무도 알려주지 않는 비밀이 있어요.',
          '솔직히 처음엔 반신반의했어요. 근데...',
          '이 방법을 모르면 돈 낭비하는 거예요.',
          '3개월 써봤는데 솔직히 말할게요.',
          '왜 아무도 이걸 안 알려줬을까요?',
          '이 하나가 제 루틴을 완전히 바꿨어요.',
          '1년 동안 숨겨왔던 제 비법을 공개합니다.',
          '이걸 발견하고 나서 다른 건 못 써요.',
          '처음엔 진짜 몰랐어요, 그런데 이제는...',
        ],
      },
      {
        name: '공감 유도 (10가지)',
        color: C.secondary,
        items: [
          '이런 경험 있으신 분 손 들어주세요! 🙋',
          '저만 이런 거 아니죠? 😅',
          '맞아요, 저도 처음엔 그랬어요.',
          '이걸 보는 순간 "나만 그런 게 아니구나" 싶었어요.',
          '여러분이 고민하던 그 문제, 저도 똑같았어요.',
          '공감되시면 댓글에 "나도!"라고 적어주세요.',
          '이 감정, 다들 느껴보셨죠?',
          '완벽하지 않아도 괜찮다는 걸 오늘 깨달았어요.',
          '사실 저도 오랫동안 이게 부끄러웠어요.',
          '같은 고민을 하고 있다면, 이걸 보세요.',
        ],
      },
      {
        name: '정보 제공 (10가지)',
        color: rgb(0.4, 0.2, 0.8),
        items: [
          '오늘 제가 알려드릴 꿀팁은 딱 3가지예요.',
          '전문가도 실천하는 ___의 5가지 원칙.',
          '이것만 알면 90%는 성공합니다.',
          '제가 직접 써보고 검증한 방법만 모았어요.',
          '10년 경력자도 모르는 이 사실.',
          '___에 대해 잘못 알고 있는 것들 TOP 5.',
          '초보도 바로 따라 할 수 있는 단계별 방법.',
          '전문가가 절대 공짜로 가르쳐 주지 않는 것.',
          '이 한 가지만 바꿔도 결과가 달라져요.',
          '오해하기 쉬운 ___의 진실.',
        ],
      },
      {
        name: '행동 유도 (CTA, 10가지)',
        color: rgb(0.9, 0.5, 0.0),
        items: [
          '저장해 두면 나중에 꼭 필요할 거예요! 🔖',
          '친구한테 태그해서 같이 해보세요!',
          '여러분의 경험도 댓글로 알려주세요.',
          '해보신 분들, 결과 댓글에 공유해주세요!',
          '팔로우하면 이런 정보 매일 받아볼 수 있어요.',
          '여기서 멈추지 말고 끝까지 읽어주세요.',
          '링크 클릭하면 더 자세한 내용 있어요! (bio 링크)',
          '시작이 어렵다면 댓글 달아주세요, 도와드릴게요.',
          '다음 편도 올라오니 팔로우 놓치지 마세요.',
          '이 콘텐츠가 도움이 됐다면 저장 + 공유 부탁해요!',
        ],
      },
      {
        name: '스토리텔링 (10가지)',
        color: rgb(0.2, 0.7, 0.4),
        items: [
          '오늘 있었던 일인데요, 충격이었어요.',
          '제 인생을 바꾼 그날의 이야기.',
          '6개월 전과 지금의 제 모습은 완전히 달라요.',
          '처음엔 실패했어요. 근데 포기하지 않았어요.',
          '이게 제 인생에서 가장 후회했던 순간이에요.',
          '아무도 보지 않았으면 했던 제 민낯.',
          '이 사진 찍던 날, 저는 울고 있었어요.',
          '꿈을 이루기까지 걸린 시간: ___ 년.',
          '완벽한 척했지만, 사실 뒤에서는...',
          '오늘 드디어 말할 수 있게 됐어요.',
        ],
      },
    ],
    tip: '💡 팁: 위 훅을 그대로 쓰거나, ___를 본인 콘텐츠에 맞게 변경해서 사용하세요.',
    footer: 'Exfluencer VN | exfluencer.vn | 인플루언서 마케팅 플랫폼',
  } : {
    title: '50 Caption Hooks',
    subtitle: 'Bộ Sưu Tập Caption Mở Đầu Thu Hút Tương Tác Cao',
    categories: [
      {
        name: 'Kích Thích Sự Tò Mò (10 câu)',
        color: C.primary,
        items: [
          'Ước gì biết điều này sớm hơn...',
          'Có một bí mật mà không ai nói với bạn.',
          'Thật ra lúc đầu mình cũng hoài nghi lắm. Nhưng mà...',
          'Không biết cách này là bạn đang lãng phí tiền đó.',
          'Dùng 3 tháng rồi, mình sẽ nói thật với bạn.',
          'Tại sao không ai nói với mình điều này sớm hơn?',
          'Chỉ một thứ này đã thay đổi hoàn toàn routine của mình.',
          'Bí quyết mình giữ 1 năm nay, hôm nay chia sẻ cho bạn.',
          'Sau khi phát hiện ra cái này, mình không dùng gì khác được nữa.',
          'Lúc đầu mình thực sự không biết, nhưng bây giờ...',
        ],
      },
      {
        name: 'Tạo Sự Đồng Cảm (10 câu)',
        color: C.secondary,
        items: [
          'Ai từng như vậy không? Giơ tay nào! 🙋',
          'Không phải chỉ mình mình như vậy chứ? 😅',
          'Đúng rồi, hồi đầu mình cũng vậy.',
          'Nhìn cái này xong mình nghĩ "Ủa không phải chỉ mình sao".',
          'Vấn đề bạn đang gặp, mình cũng từng như vậy.',
          'Đồng cảm thì comment "Mình cũng vậy!" nha.',
          'Cảm giác này, ai cũng từng trải qua chứ?',
          'Hôm nay mình nhận ra rằng không cần hoàn hảo cũng ổn.',
          'Thật ra mình đã xấu hổ về điều này rất lâu.',
          'Nếu bạn đang có cùng nỗi băn khoăn, hãy xem cái này.',
        ],
      },
      {
        name: 'Cung Cấp Thông Tin (10 câu)',
        color: rgb(0.4, 0.2, 0.8),
        items: [
          'Hôm nay mình chia sẻ đúng 3 tip hữu ích nhé.',
          '5 nguyên tắc về ___ mà ngay cả chuyên gia cũng làm.',
          'Chỉ cần biết điều này là thành công 90% rồi.',
          'Mình đã thử nghiệm và chỉ chia sẻ những gì thực sự hiệu quả.',
          'Sự thật về ___ mà 10 năm kinh nghiệm cũng chưa biết.',
          'TOP 5 điều bạn đang hiểu sai về ___.',
          'Cách làm từng bước, người mới cũng làm được ngay.',
          'Thứ mà chuyên gia không bao giờ dạy miễn phí.',
          'Chỉ cần thay đổi một thứ này, kết quả sẽ khác hẳn.',
          'Sự thật ít ai biết về ___.',
        ],
      },
      {
        name: 'Kêu Gọi Hành Động (CTA, 10 câu)',
        color: rgb(0.9, 0.5, 0.0),
        items: [
          'Lưu lại đi, sau này cần đến đó! 🔖',
          'Tag một người bạn để cùng thử nha!',
          'Bạn đã thử chưa? Kể mình nghe trong comment!',
          'Ai đã làm rồi, share kết quả trong comment nha!',
          'Follow để nhận thông tin như này mỗi ngày nhé.',
          'Đừng dừng lại, đọc đến hết nhé.',
          'Nhấn link trong bio để xem chi tiết hơn!',
          'Bắt đầu khó thì comment cho mình biết, mình hỗ trợ nhé.',
          'Phần tiếp theo sắp ra, follow đừng bỏ lỡ.',
          'Nếu hữu ích, lưu lại và chia sẻ cho bạn bè nhé!',
        ],
      },
      {
        name: 'Kể Chuyện (10 câu)',
        color: rgb(0.2, 0.7, 0.4),
        items: [
          'Hôm nay có chuyện xảy ra, mình còn sốc lắm.',
          'Câu chuyện thay đổi cuộc đời mình.',
          'Mình 6 tháng trước và bây giờ khác nhau hoàn toàn.',
          'Ban đầu mình thất bại. Nhưng mình không bỏ cuộc.',
          'Đây là khoảnh khắc mình hối hận nhất trong cuộc đời.',
          'Khuôn mặt thật của mình mà mình không muốn ai thấy.',
          'Ngày chụp bức ảnh này, mình đang khóc.',
          'Thời gian để đạt được ước mơ: ___ năm.',
          'Mình giả vờ ổn, nhưng thật ra phía sau...',
          'Hôm nay mình mới có thể nói điều này.',
        ],
      },
    ],
    tip: '💡 Tip: Dùng nguyên hoặc thay ___ bằng nội dung phù hợp với chủ đề của bạn.',
    footer: 'Exfluencer VN | exfluencer.vn | Nền tảng Influencer Marketing',
  };

  // Page 1
  let page = addPage(doc);
  const { width, height } = page.getSize();

  // Header
  drawRect(page, 0, height - 90, width, 90, rgb(0.4, 0.2, 0.8));
  page.drawText(T.title, { x: 40, y: height - 48, size: 26, font, color: C.white });
  page.drawText(T.subtitle, { x: 40, y: height - 72, size: 11, font, color: rgb(0.85, 0.85, 1) });
  drawRect(page, 460, height - 80, 100, 70, rgb(0.3, 0.1, 0.6));
  page.drawText('Exfluencer', { x: 464, y: height - 52, size: 10, font, color: C.white });
  page.drawText('VN', { x: 490, y: height - 65, size: 16, font, color: C.white });

  let y = height - 104;

  for (let ci = 0; ci < T.categories.length; ci++) {
    const cat = T.categories[ci];

    // 페이지 공간 부족 시 새 페이지
    if (y < 200) {
      page = addPage(doc);
      y = height - 40;
    }

    // 카테고리 헤더
    drawRect(page, 40, y - 4, 515, 24, cat.color);
    page.drawText(cat.name, { x: 50, y: y + 3, size: 12, font, color: C.white });
    y -= 32;

    // 아이템 목록
    for (let i = 0; i < cat.items.length; i++) {
      if (y < 60) {
        page = addPage(doc);
        y = height - 40;
      }
      const bg = i % 2 === 0 ? C.lightGray : C.white;
      drawRect(page, 40, y - 4, 515, 20, bg);
      page.drawText(`${i + 1}.`, { x: 48, y: y + 1, size: 9, font, color: C.gray });
      page.drawText(cat.items[i], { x: 68, y: y + 1, size: 9, font, color: C.black, maxWidth: 480 });
      y -= 22;
    }
    y -= 10;
  }

  // Tip
  if (y < 80) {
    page = addPage(doc);
    y = height - 40;
  }
  drawRect(page, 40, y - 8, 515, 30, rgb(1, 0.97, 0.8));
  page.drawText(T.tip, { x: 50, y: y + 5, size: 9, font, color: rgb(0.5, 0.4, 0.0) });

  // Footer on last page
  drawRect(page, 0, 0, width, 30, C.black);
  page.drawText(T.footer, { x: 40, y: 10, size: 8, font, color: rgb(0.6, 0.6, 0.6) });

  const bytes = await doc.save();
  const outPath = path.join(OUT_DIR, `caption-hooks-${lang}.pdf`);
  fs.writeFileSync(outPath, bytes);
  console.log(`✅ ${outPath}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

(async () => {
  console.log('📄 PDF 생성 시작...');
  await generateMediaKit('ko');
  await generateMediaKit('vi');
  await generateRateCard('ko');
  await generateRateCard('vi');
  await generateCaptionHooks('ko');
  await generateCaptionHooks('vi');
  console.log('🎉 모든 PDF 생성 완료!');
})();
