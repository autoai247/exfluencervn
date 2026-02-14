# 🎫 응모권 및 포인트 시스템 완전 가이드

## 📋 목차
1. [시스템 개요](#시스템-개요)
2. [백엔드 API](#백엔드-api)
3. [프론트엔드 구조](#프론트엔드-구조)
4. [관리자 기능](#관리자-기능)
5. [사용 방법](#사용-방법)
6. [테스트](#테스트)

---

## 🎯 시스템 개요

### 주요 기능
- ✅ **이중 화폐 시스템** (현금 vs 쇼핑 포인트)
- ✅ **응모권 구매 시스템** (5개 주요 상품)
- ✅ **자동 추첨 시스템** (확률 기반)
- ✅ **랭킹 시스템** (포인트, 응모권, 수익 등)
- ✅ **알림 시스템** (당첨, 구매 성공 등)
- ✅ **통계 대시보드** (사용 내역, 트렌드)
- ✅ **관리자 페이지** (상품 관리, 추첨 실행)

### 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **데이터베이스**: JSON 파일 기반 (개발용, 추후 PostgreSQL/MongoDB 권장)
- **상태 관리**: React Context API
- **스타일링**: Tailwind CSS

---

## 🔧 백엔드 API

### API 엔드포인트 목록

#### 1. 포인트 거래 API (`/api/points/transaction`)

**POST** - 포인트 거래 생성
```typescript
// Request
{
  userId: string;
  type: 'earning' | 'spending' | 'withdrawal';
  walletType: 'cash' | 'shopping';
  amount: number;  // 차감 시 음수
  description: string;
}

// Response
{
  success: true,
  transaction: PointTransaction,
  newBalance: number
}
```

**GET** - 거래 내역 조회
```
GET /api/points/transaction?userId={userId}
```

#### 2. 응모권 구매 API (`/api/raffle/purchase`)

**POST** - 응모권 구매
```typescript
// Request
{
  userId: string;
  raffleId: string;
  ticketCount: number;
  pointsSpent: number;
}

// Response
{
  success: true,
  raffleTicket: RaffleTicket,
  purchaseHistory: RafflePurchaseHistory,
  newBalance: number
}
```

**GET** - 사용자 응모권 조회
```
GET /api/raffle/purchase?userId={userId}
```

#### 3. 응모 상품 API (`/api/raffle/items`)

**GET** - 상품 목록 조회
```
GET /api/raffle/items?activeOnly=true
```

**POST** - 새 상품 생성 (관리자)
```typescript
{
  name: string;
  description: string;
  price: number;
  totalTickets: number;
  prizeValue: string;
  stock?: number;
  active: boolean;
}
```

**PUT** - 상품 수정 (관리자)
```typescript
{
  id: string;
  // 수정할 필드들...
}
```

#### 4. 랭킹 API (`/api/ranking`)

**GET** - 랭킹 조회
```
GET /api/ranking?category=points&limit=100
```

카테고리: `points`, `tickets`, `earnings`, `referrals`, `attendance`

#### 5. 관리자 추첨 API (`/api/admin/raffle/draw`)

**POST** - 추첨 실행
```typescript
{
  raffleId: string;
  adminPassword: string;  // 기본값: 'admin123'
}
```

**GET** - 추첨 결과 조회
```
GET /api/admin/raffle/draw?raffleId={raffleId}
```

---

## 🎨 프론트엔드 구조

### 주요 페이지

#### 1. 포인트 상점 (`/main/influencer/shop`)
- 5개 주요 응모 상품 표시
- 카테고리별 필터링
- 실시간 재고 관리
- 구매 확인 모달

#### 2. 내 응모권 (`/main/influencer/my-raffles`)
- 보유 응모권 목록
- 당첨 확률 계산
- 구매 히스토리

#### 3. 랭킹 (`/main/influencer/ranking`)
- 5개 카테고리 (포인트, 출석, 수익, 추천, 응모권)
- TOP 3 포디움 표시
- 월간 보상 시스템

#### 4. 통계 대시보드 (`/main/influencer/points-stats`)
- 총 적립/사용 포인트
- 이번 달 지출 트렌드
- 응모당 평균 지출
- 최근 거래 내역

#### 5. 관리자 페이지 (`/main/admin/raffle-manager`)
- 응모 상품 관리
- 추첨 실행
- 당첨자 확인
- 통계 보기

### 재사용 가능한 컴포넌트

#### NotificationToast
```tsx
import { useNotification } from '@/contexts/NotificationContext';

const { showSuccess, showError, showWinner } = useNotification();

// 성공 알림
showSuccess('구매 완료', '응모권 1장을 획득했습니다');

// 에러 알림
showError('구매 실패', '포인트가 부족합니다');

// 당첨 알림
showWinner('축하합니다!', 'iPhone 15 Pro Max에 당첨되었습니다!');
```

#### PurchaseSuccessModal
```tsx
import PurchaseSuccessModal from '@/components/common/PurchaseSuccessModal';

<PurchaseSuccessModal
  itemName="🇰🇷 KOREA DREAM 응모권"
  ticketsEarned={1}
  pointsSpent={100000}
  remainingPoints={2400000}
  onClose={() => setShowModal(false)}
/>
```

---

## 👨‍💼 관리자 기능

### 추첨 시스템 사용법

1. **관리자 페이지 접속**
   ```
   /main/admin/raffle-manager
   ```

2. **추첨 가능 확인**
   - 진행률이 100%에 도달한 응모 상품
   - "추첨하기" 버튼 활성화

3. **추첨 실행**
   - 추첨하기 버튼 클릭
   - 관리자 비밀번호 입력 (기본: `admin123`)
   - 자동 추첨 → 당첨자 알림

4. **추첨 알고리즘**
   ```typescript
   // 티켓 수에 비례한 확률적 추첨
   const ticketPool = [];
   participants.forEach(p => {
     for (let i = 0; i < p.ticketCount; i++) {
       ticketPool.push(p.userId);
     }
   });

   // 무작위 선택
   const winnerId = ticketPool[Math.floor(Math.random() * ticketPool.length)];
   ```

### 당첨 확률 계산
```
당첨 확률 = (사용자의 티켓 수 / 전체 티켓 수) × 100%
```

**예시:**
- 전체 티켓: 100,000장
- 내 티켓: 50장
- 당첨 확률: 0.05%

---

## 🚀 사용 방법

### 1. 개발 서버 시작
```bash
npm run dev
```

### 2. 초기 데이터 생성
서버 시작 시 자동으로 초기 응모 상품 5개 생성:
- 🇰🇷 KOREA DREAM (100K SP)
- 📱 iPhone 15 Pro Max (100K SP)
- 💻 MacBook Pro M3 (100K SP)
- 💰 현금 10M VND (50K SP)
- 🎁 기프트카드 500K (30K SP)

### 3. 테스트 사용자 생성
프론트엔드에서 회원가입 후:
```typescript
// localStorage에 사용자 데이터 생성
localStorage.setItem('exfluencer_user', JSON.stringify({
  id: 'user123',
  email: 'test@example.com',
  name: '테스트 사용자',
  userType: 'influencer',
  shoppingPoints: 2500000,  // 초기 포인트
  cash: 1000000
}));
```

### 4. 응모권 구매 테스트
1. `/main/influencer/shop` 접속
2. 응모권 선택
3. 구매 확인
4. 성공 모달 확인

### 5. 추첨 테스트
1. `/main/admin/raffle-manager` 접속
2. 진행률 100% 상품 선택
3. 추첨 실행 (비밀번호: `admin123`)
4. 당첨자 확인

---

## 🧪 테스트

### API 테스트 (Thunder Client / Postman)

#### 응모권 구매
```
POST http://localhost:3001/api/raffle/purchase
Content-Type: application/json

{
  "userId": "user123",
  "raffleId": "korea-dream",
  "ticketCount": 1,
  "pointsSpent": 100000
}
```

#### 랭킹 조회
```
GET http://localhost:3001/api/ranking?category=tickets&limit=10
```

#### 추첨 실행
```
POST http://localhost:3001/api/admin/raffle/draw
Content-Type: application/json

{
  "raffleId": "korea-dream",
  "adminPassword": "admin123"
}
```

### 프론트엔드 테스트

1. **포인트 잔액 확인**
   - Header에 현재 포인트 표시
   - Wallet 페이지에서 상세 확인

2. **응모권 구매**
   - Shop 페이지에서 구매
   - 성공 모달 확인
   - 잔액 감소 확인

3. **랭킹 확인**
   - Ranking 페이지에서 자신의 순위 확인
   - 카테고리별 필터링

4. **통계 확인**
   - Points Stats 페이지에서 사용 내역
   - 그래프 및 트렌드 확인

---

## 🔒 보안 고려사항

### 현재 구현 (개발용)
- JSON 파일 기반 데이터베이스
- 간단한 비밀번호 인증 (`admin123`)
- 클라이언트 사이드 포인트 관리

### 프로덕션 권장 사항
1. **데이터베이스**
   - PostgreSQL / MongoDB로 마이그레이션
   - 트랜잭션 관리
   - 데이터 무결성 보장

2. **인증**
   - JWT 토큰 기반 인증
   - 역할 기반 권한 관리 (RBAC)
   - 세션 관리

3. **보안**
   - 포인트 거래 서버 검증
   - SQL Injection 방지
   - XSS/CSRF 방지
   - Rate Limiting

4. **감사**
   - 모든 거래 로그 저장
   - 비정상 활동 감지
   - 롤백 시스템

---

## 📊 데이터 구조

### JSON 파일 위치
```
/data
  ├── users.json                  # 사용자 정보
  ├── raffle_items.json           # 응모 상품
  ├── raffle_tickets.json         # 사용자별 응모권
  ├── purchase_history.json       # 구매 히스토리
  ├── point_transactions.json     # 포인트 거래 내역
  └── raffle_draws.json           # 추첨 결과
```

### 데이터베이스 스키마

#### users.json
```typescript
{
  id: string;
  email: string;
  name: string;
  userType: 'influencer' | 'advertiser';
  shoppingPoints: number;
  cash: number;
  createdAt: string;
}
```

#### raffle_items.json
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  totalTickets: number;
  currentTickets: number;
  prizeValue: string;
  stock?: number;
  active: boolean;
  createdAt: string;
}
```

#### raffle_tickets.json
```typescript
{
  userId: string;
  raffleId: string;
  ticketCount: number;
  totalSpent: number;
  updatedAt: string;
}
```

---

## 🎨 UI/UX 개선 사항

### 구현된 기능
- ✅ 구매 성공 애니메이션 (confetti)
- ✅ Toast 알림 시스템
- ✅ 진행률 바 애니메이션
- ✅ 부드러운 페이지 전환
- ✅ 반응형 디자인

### 향후 개선 아이디어
- [ ] 응모권 당첨 시 푸시 알림
- [ ] 소셜 공유 기능
- [ ] 친구 초대 시스템 강화
- [ ] 일일 미션 및 보상
- [ ] 응모권 선물 기능

---

## 🆘 문제 해결

### 문제: 포인트가 차감되지 않음
**해결:**
1. 브라우저 콘솔 확인
2. API 응답 확인 (Network 탭)
3. localStorage 데이터 확인
4. 서버 로그 확인

### 문제: 추첨이 실행되지 않음
**해결:**
1. 진행률이 100%인지 확인
2. 관리자 비밀번호 확인 (`admin123`)
3. 참여자가 있는지 확인
4. 서버 콘솔 에러 확인

### 문제: 데이터가 사라짐
**해결:**
1. `/data` 폴더 백업
2. `initializeData.ts` 재실행
3. localStorage 초기화
4. 서버 재시작

---

## 📞 지원

문제가 발생하면:
1. 서버 콘솔 로그 확인
2. 브라우저 개발자 도구 확인
3. `/data` 폴더의 JSON 파일 확인
4. GitHub Issues에 문의

---

## 📝 변경 이력

### v2.0.0 (2026-02-14)
- ✅ 백엔드 API 전면 구축
- ✅ JSON 데이터베이스 시스템
- ✅ 관리자 추첨 시스템
- ✅ 알림 시스템
- ✅ 통계 대시보드
- ✅ 구매 애니메이션

### v1.0.0 (이전)
- localStorage 기반 시스템
- 기본 응모권 기능

---

**🎉 모든 기능이 정상적으로 구현되었습니다!**

필요한 부분이 있으면 언제든지 문의해주세요.
