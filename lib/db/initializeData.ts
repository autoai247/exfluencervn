import { db } from './jsonDb';

// 초기 데이터 생성
export function initializeDatabase() {
  console.log('🔧 Initializing database...');

  // 테스트 사용자 생성
  const users = db.getUsers();
  if (users.length === 0) {
    console.log('📝 Creating test users...');

    // 현재는 localStorage 기반이므로 사용자 데이터는 프론트엔드에서 관리
    // 실제 프로덕션에서는 인증 시스템과 연동
  }

  // 응모 상품 초기화
  const raffleItems = db.getRaffleItems();
  if (raffleItems.length === 0) {
    console.log('🎁 Creating raffle items...');

    db.createRaffleItem({
      name: '🇰🇷 KOREA DREAM 응모권',
      description: '한국 뷰티 체험 여행 (왕복 항공 + 4박5일 + 시술 + 쇼핑)',
      price: 100000,
      totalTickets: 100000,
      currentTickets: 78432,
      prizeValue: '50,000,000 VND (2인)',
      active: true,
    });

    db.createRaffleItem({
      name: '📱 iPhone 15 Pro Max 응모권',
      description: '최신 아이폰 256GB (색상 선택 가능)',
      price: 100000,
      totalTickets: 50000,
      currentTickets: 32145,
      prizeValue: '35,000,000 VND',
      active: true,
    });

    db.createRaffleItem({
      name: '💻 MacBook Pro M3 응모권',
      description: 'MacBook Pro 14인치 M3 칩 (512GB)',
      price: 100000,
      totalTickets: 40000,
      currentTickets: 21567,
      prizeValue: '48,000,000 VND',
      active: true,
    });

    db.createRaffleItem({
      name: '💰 현금 10M VND 응모권',
      description: '즉시 현금 입금 (세금 없음)',
      price: 50000,
      totalTickets: 30000,
      currentTickets: 18234,
      prizeValue: '10,000,000 VND',
      active: true,
    });

    db.createRaffleItem({
      name: '🎁 통합 기프트카드 500K',
      description: '스타벅스/CGV/쿠팡 선택 가능',
      price: 30000,
      totalTickets: 20000,
      currentTickets: 12456,
      prizeValue: '500,000 VND',
      stock: 100,
      active: true,
    });

    console.log('✅ Raffle items created!');
  }

  console.log('✨ Database initialized successfully!');
}

// 서버 시작 시 자동 실행
if (typeof window === 'undefined') {
  // 서버 사이드에서만 실행
  initializeDatabase();
}
