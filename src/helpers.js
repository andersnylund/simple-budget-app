export const fileToString = (file, onReadCallBack) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const { result } = fileReader;
    onReadCallBack(result);
  };
  fileReader.readAsText(file);
};

export default {
  fileToString
};
