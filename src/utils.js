import papa from 'papaparse';
import moment from 'moment';
import _ from 'lodash';

export const parse = (csvString, bank) => {
  const transactions = papa.parse(csvString).data.filter((j, i) => i !== 0); // remove first item
  const data = transactions.map(transaction => ({
    date: moment.utc(transaction[bank.dateHeaderIndex], bank.dateHeaderFormat).toISOString(),
    amount: parseFloat(transaction[bank.amountIndex].replace(',', '.')),
    party: transaction[bank.partyIndex]
  }));
  return data;
};

export const categoryOfParty = (party, categories) => {
  let returnValue = null;

  categories.forEach(category => {
    if (category.parties.includes(party)) {
      returnValue = category.title;
    }
  });
  return returnValue;
};

export const amountByCategory = (initialTransactions, categories) => {
  const categoryMap = categories.reduce((prev, curr) => {
    const temp = _.cloneDeep(prev);
    temp[curr.title] = 0;
    return temp;
  }, {});

  initialTransactions.forEach(transaction => {
    const category = categoryOfParty(transaction.party, categories);
    if (category !== null) {
      categoryMap[category] += transaction.amount;
    }
  });

  return Object.keys(categoryMap).map(key => ({
    title: key,
    amount: categoryMap[key]
  }));
};

export default {
  parse,
  amountByCategory,
  categoryOfParty
};
