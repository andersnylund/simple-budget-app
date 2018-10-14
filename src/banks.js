export class Bank {
  constructor(name, dateHeaderIndex, dateHeaderFormat, partyIndex, amountIndex) {
    this.name = name;
    this.dateHeaderIndex = dateHeaderIndex;
    this.dateHeaderFormat = dateHeaderFormat;
    this.partyIndex = partyIndex;
    this.amountIndex = amountIndex;
  }
}

const danske = new Bank('Danske Bank', 0, 'DD.MM.YYYY', 1, 2);
const op = new Bank('Osuuspankki', 0, 'DD.MM.YYYY', 5, 2);

export default [danske, op];
