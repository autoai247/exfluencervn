// Points API 클라이언트

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'earning' | 'spending' | 'withdrawal';
  walletType: 'cash' | 'shopping';
  amount: number;
  description: string;
  date: string;
}

// 포인트 거래
export async function createTransaction(
  userId: string,
  type: 'earning' | 'spending' | 'withdrawal',
  walletType: 'cash' | 'shopping',
  amount: number,
  description: string
): Promise<{
  transaction: PointTransaction;
  newBalance: number;
}> {
  const response = await fetch('/api/points/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      type,
      walletType,
      amount,
      description,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Giao dịch điểm thất bại');
  }

  return data;
}

// 포인트 거래 내역 조회
export async function getTransactions(userId: string): Promise<PointTransaction[]> {
  const response = await fetch(`/api/points/transaction?userId=${userId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Không thể truy vấn lịch sử giao dịch');
  }

  return data.transactions;
}

// 포인트 지급 (출석, 추천 등)
export async function earnPoints(
  userId: string,
  walletType: 'cash' | 'shopping',
  amount: number,
  description: string
): Promise<{
  transaction: PointTransaction;
  newBalance: number;
}> {
  return createTransaction(userId, 'earning', walletType, amount, description);
}

// 포인트 차감
export async function spendPoints(
  userId: string,
  walletType: 'cash' | 'shopping',
  amount: number,
  description: string
): Promise<{
  transaction: PointTransaction;
  newBalance: number;
}> {
  return createTransaction(userId, 'spending', walletType, -Math.abs(amount), description);
}

// 현금 출금
export async function withdrawCash(
  userId: string,
  amount: number
): Promise<{
  transaction: PointTransaction;
  newBalance: number;
}> {
  return createTransaction(userId, 'withdrawal', 'cash', -Math.abs(amount), 'Rút tiền mặt');
}
