import papa from 'papaparse';
import moment from 'moment';

export const fileToString = (file, onLoadEnd) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const { result } = fileReader;
    onLoadEnd(result);
  };
  fileReader.readAsText(file);
};

export const parse = (csvString, bank) => {
  const transactions = papa.parse(csvString).data.filter((_, i) => i !== 0); // remove first item
  const data = transactions.map(transaction => ({
    date: moment(transaction[bank.dateHeaderIndex], bank.dateHeaderFormat),
    amount: transaction[bank.amountIndex],
    party: transaction[bank.partyIndex]
  }));
  return data;
};

export default {
  fileToString,
  parse
};
