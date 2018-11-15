import papa from 'papaparse';
import moment from 'moment';

export const parse = (csvString, bank) => {
  const transactions = papa.parse(csvString).data.filter((j, i) => i !== 0); // remove first item
  const data = transactions.map(transaction => ({
    date: moment.utc(transaction[bank.dateHeaderIndex], bank.dateHeaderFormat).toISOString(),
    amount: parseFloat(transaction[bank.amountIndex].replace(',', '.')),
    party: transaction[bank.partyIndex]
  }));
  return data;
};

export const combinedAmountOfParties = (transactions, parties) => {
  let amount = 0;

  transactions.forEach(transaction => {
    if (parties.includes(transaction.party)) {
      amount += transaction.amount;
    }
  });

  return amount;
};

export const combinedSpendingOfParties = (transactions, parties) => {
  let spending = 0;

  transactions.filter(t => t.amount < 0).forEach(t => {
    if (parties.includes(t.party)) {
      spending += t.amount;
    }
  });

  return spending;
};

export const significantParties = transactions => {
  const parties = [...new Set(transactions.map(t => t.party))].map(p => ({
    title: p,
    amount: 0
  }));

  transactions.forEach(t => {
    const party = parties.find(p => p.title === t.party);
    if (party) {
      party.amount += t.amount;
    }
  });

  const sorted = parties.sort((a, b) => a.amount < b.amount);

  const most = sorted.slice(0, Math.min(sorted.length - 1, 5));
  const least = sorted.slice(Math.max(0, sorted.length - 5), sorted.length);

  const result = [...new Set(most.concat(...least))];
  return result;
};

export default {
  parse,
  combinedAmountOfParties,
  significantParties
};
