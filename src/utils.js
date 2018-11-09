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

export const amountByEachParty = transactions => {
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

  return parties.sort((a, b) => a.amount < b.amount);
};

export default {
  parse,
  combinedAmountOfParties,
  amountByEachParty
};
