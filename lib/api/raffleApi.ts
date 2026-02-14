// Raffle API 클라이언트

export interface RaffleItem {
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

export interface RaffleTicket {
  userId: string;
  raffleId: string;
  ticketCount: number;
  totalSpent: number;
  updatedAt: string;
}

export interface RafflePurchaseHistory {
  id: string;
  userId: string;
  raffleId: string;
  tickets: number;
  pointsSpent: number;
  date: string;
}

// 응모 상품 목록 조회
export async function getRaffleItems(activeOnly: boolean = true): Promise<RaffleItem[]> {
  const response = await fetch(`/api/raffle/items?activeOnly=${activeOnly}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || '응모 상품 조회 실패');
  }

  return data.items;
}

// 응모권 구매
export async function purchaseRaffle(
  userId: string,
  raffleId: string,
  ticketCount: number,
  pointsSpent: number
): Promise<{
  raffleTicket: RaffleTicket;
  purchaseHistory: RafflePurchaseHistory;
  newBalance: number;
}> {
  const response = await fetch('/api/raffle/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      raffleId,
      ticketCount,
      pointsSpent,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || '응모권 구매 실패');
  }

  return data;
}

// 사용자의 응모권 조회
export async function getUserRaffleTickets(userId: string): Promise<{
  tickets: RaffleTicket[];
  history: RafflePurchaseHistory[];
}> {
  const response = await fetch(`/api/raffle/purchase?userId=${userId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || '응모권 조회 실패');
  }

  return data;
}

// 관리자: 추첨 실행
export async function executeRaffleDraw(
  raffleId: string,
  adminPassword: string
): Promise<any> {
  const response = await fetch('/api/admin/raffle/draw', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      raffleId,
      adminPassword,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || '추첨 실행 실패');
  }

  return data;
}

// 추첨 결과 조회
export async function getDrawResults(raffleId?: string): Promise<any[]> {
  const url = raffleId
    ? `/api/admin/raffle/draw?raffleId=${raffleId}`
    : '/api/admin/raffle/draw';

  const response = await fetch(url);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || '추첨 결과 조회 실패');
  }

  return data.results;
}
