import papa from 'papaparse';

export const fileToString = (file, onLoadEnd) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const { result } = fileReader;
    onLoadEnd(result);
  };
  fileReader.readAsText(file);
};

export const parse = (csvString, bank) => {};

export default {
  fileToString,
  parse
};
