export const transactions = [
  {
    date: new Date().toISOString(),
    party: 'party1',
    amount: 10.2
  },
  {
    date: new Date().toISOString(),
    party: 'party2',
    amount: 10.6
  },
  {
    date: new Date().toISOString(),
    party: 'party1',
    amount: 10
  },
  {
    date: new Date().toISOString(),
    party: 'party3',
    amount: 121
  }
];

export const categories = [
  {
    title: 'category1',
    parties: ['party1']
  },
  {
    title: 'category2',
    parties: ['party2', 'party3']
  }
];

export const spending = [
  {
    title: 'category1',
    spending: -124
  },
  {
    title: 'category2',
    spending: -2354.5
  },
  {
    title: 'category1',
    spending: -1243.1
  }
];

export default { transactions, categories };
