import papa from 'papaparse';
import moment from 'moment';
import has from 'lodash/has';

export const parse = (csvString, bank) => {
  const transactions = papa
    .parse(csvString)
    .data.filter(
      (t, i) =>
        t.length >= Math.max(bank.dateHeaderIndex, bank.amountIndex, bank.partyIndex) &&
        !isNaN(parseFloat(t[bank.amountIndex].replace(',', '.')))
    );

  const data = transactions.map(transaction => ({
    date: moment.utc(transaction[bank.dateHeaderIndex], bank.dateHeaderFormat).toISOString(),
    amount: parseFloat(transaction[bank.amountIndex].replace(',', '.')),
    party: transaction[bank.partyIndex]
  }));
  return data;
};

export const sumAndSpendingOfParties = (transactions, listOfParties) => {
  let sum = 0;
  let spending = 0;
  const spendingByMonth = {};

  transactions
    .filter(transaction => listOfParties.includes(transaction.party))
    .map(transaction => {
      sum += transaction.amount;
      return transaction;
    })
    .filter(t => t.amount < 0)
    .map(transaction => {
      const month = moment(transaction.date).format('YYYY-MM');
      if (has(spendingByMonth, month)) {
        const previous = spendingByMonth[month];
        spendingByMonth[month] = previous + transaction.amount;
      } else {
        spendingByMonth[month] = transaction.amount;
      }
      return transaction;
    })
    .forEach(t => {
      spending += t.amount;
    });

  return { sum, spending, spendingByMonth };
};

export const getMonthsFromTransactions = transactions => {
  const months = new Set();
  transactions.forEach(t => {
    months.add(moment(t.date).format('YYYY-MM'));
  });
  return months;
};

export const significantParties = transactions => {
  const parties = [...new Set(transactions.map(t => t.party))].map(p => ({
    title: p,
    sum: 0
  }));

  transactions.forEach(t => {
    const party = parties.find(p => p.title === t.party);
    if (party) {
      party.sum += t.amount;
    }
  });

  const sorted = parties.sort((a, b) => a.sum < b.sum);

  const most = sorted.slice(0, Math.min(sorted.length - 1, 5));
  const least = sorted.slice(Math.max(0, sorted.length - 5), sorted.length);

  const result = [...new Set(most.concat(...least))];
  return result;
};

export default {
  parse,
  significantParties
};
