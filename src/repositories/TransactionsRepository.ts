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
    const balance = this.transactions.reduce(
      (acumulator, transaction) => {
        return transaction.type === 'income'
          ? {
              income: acumulator.income + transaction.value,
              outcome: acumulator.outcome,
              total: acumulator.total + transaction.value,
            }
          : {
              income: acumulator.income,
              outcome: acumulator.outcome + transaction.value,
              total: acumulator.total - transaction.value,
            };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

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
