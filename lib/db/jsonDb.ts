import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');

// 데이터 디렉토리 생성
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'influencer' | 'advertiser';
  shoppingPoints: number;
  cash: number;
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

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'earning' | 'spending' | 'withdrawal';
  walletType: 'cash' | 'shopping';
  amount: number;
  description: string;
  date: string;
}

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

export interface RaffleDraw {
  id: string;
  raffleId: string;
  winnerId: string;
  winnerName: string;
  drawDate: string;
  totalParticipants: number;
  announced: boolean;
}

class JsonDatabase {
  private readData<T>(filename: string): T[] {
    const filePath = path.join(DB_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  private writeData<T>(filename: string, data: T[]): void {
    const filePath = path.join(DB_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // Users
  getUsers(): User[] {
    return this.readData<User>('users.json');
  }

  getUserById(userId: string): User | undefined {
    return this.getUsers().find(u => u.id === userId);
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    this.writeData('users.json', users);
    return users[index];
  }

  // Raffle Tickets
  getRaffleTickets(userId?: string): RaffleTicket[] {
    const tickets = this.readData<RaffleTicket>('raffle_tickets.json');
    return userId ? tickets.filter(t => t.userId === userId) : tickets;
  }

  getUserRaffleTicket(userId: string, raffleId: string): RaffleTicket | undefined {
    return this.getRaffleTickets(userId).find(t => t.raffleId === raffleId);
  }

  updateRaffleTicket(userId: string, raffleId: string, tickets: number, spent: number): RaffleTicket {
    const allTickets = this.getRaffleTickets();
    const index = allTickets.findIndex(t => t.userId === userId && t.raffleId === raffleId);

    const ticket: RaffleTicket = {
      userId,
      raffleId,
      ticketCount: tickets,
      totalSpent: spent,
      updatedAt: new Date().toISOString(),
    };

    if (index === -1) {
      allTickets.push(ticket);
    } else {
      allTickets[index] = ticket;
    }

    this.writeData('raffle_tickets.json', allTickets);
    return ticket;
  }

  // Purchase History
  getPurchaseHistory(userId?: string): RafflePurchaseHistory[] {
    const history = this.readData<RafflePurchaseHistory>('purchase_history.json');
    return userId ? history.filter(h => h.userId === userId) : history;
  }

  addPurchaseHistory(history: Omit<RafflePurchaseHistory, 'id'>): RafflePurchaseHistory {
    const allHistory = this.getPurchaseHistory();
    const newHistory: RafflePurchaseHistory = {
      id: Date.now().toString(),
      ...history,
    };
    allHistory.push(newHistory);
    this.writeData('purchase_history.json', allHistory);
    return newHistory;
  }

  // Point Transactions
  getPointTransactions(userId?: string): PointTransaction[] {
    const transactions = this.readData<PointTransaction>('point_transactions.json');
    return userId ? transactions.filter(t => t.userId === userId) : transactions;
  }

  addPointTransaction(transaction: Omit<PointTransaction, 'id'>): PointTransaction {
    const transactions = this.getPointTransactions();
    const newTransaction: PointTransaction = {
      id: Date.now().toString(),
      ...transaction,
    };
    transactions.push(newTransaction);
    this.writeData('point_transactions.json', transactions);
    return newTransaction;
  }

  // Raffle Items
  getRaffleItems(): RaffleItem[] {
    return this.readData<RaffleItem>('raffle_items.json');
  }

  getRaffleItemById(raffleId: string): RaffleItem | undefined {
    return this.getRaffleItems().find(r => r.id === raffleId);
  }

  updateRaffleItem(raffleId: string, updates: Partial<RaffleItem>): RaffleItem | null {
    const items = this.getRaffleItems();
    const index = items.findIndex(r => r.id === raffleId);
    if (index === -1) return null;

    items[index] = { ...items[index], ...updates };
    this.writeData('raffle_items.json', items);
    return items[index];
  }

  createRaffleItem(item: Omit<RaffleItem, 'id' | 'createdAt'>): RaffleItem {
    const items = this.getRaffleItems();
    const newItem: RaffleItem = {
      id: Date.now().toString(),
      ...item,
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    this.writeData('raffle_items.json', items);
    return newItem;
  }

  // Raffle Draws
  getRaffleDraws(): RaffleDraw[] {
    return this.readData<RaffleDraw>('raffle_draws.json');
  }

  createRaffleDraw(draw: Omit<RaffleDraw, 'id'>): RaffleDraw {
    const draws = this.getRaffleDraws();
    const newDraw: RaffleDraw = {
      id: Date.now().toString(),
      ...draw,
    };
    draws.push(newDraw);
    this.writeData('raffle_draws.json', draws);
    return newDraw;
  }

  // Rankings
  getUserRankings(category: 'points' | 'tickets' | 'earnings' | 'referrals' | 'attendance'): User[] {
    const users = this.getUsers();

    switch (category) {
      case 'points':
        return users.sort((a, b) => b.shoppingPoints - a.shoppingPoints);
      case 'tickets':
        const tickets = this.getRaffleTickets();
        const userTickets = users.map(user => {
          const totalTickets = tickets
            .filter(t => t.userId === user.id)
            .reduce((sum, t) => sum + t.ticketCount, 0);
          return { ...user, totalTickets };
        });
        return userTickets.sort((a, b) => (b.totalTickets || 0) - (a.totalTickets || 0));
      case 'earnings':
        return users.sort((a, b) => b.cash - a.cash);
      default:
        return users;
    }
  }
}

export const db = new JsonDatabase();
