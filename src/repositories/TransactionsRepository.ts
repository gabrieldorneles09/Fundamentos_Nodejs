/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        total += transaction.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        total += transaction.value;
      }
      return total;
    }, 0);

    const result = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        total += transaction.value;
      } else {
        total -= transaction.value;
      }
      return total;
    }, 0);

    const balance = {
      income,
      outcome,
      total: result,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
