import {
  UPDATE_ALL_AMOUNTS,
  setSumOfCategory,
  setSpendingOfCategory,
  setSpendingByMonthOfCategory
} from './reducers/amountReducer';
import { sumAndSpendingOfParties } from './utils';

const amountServiceMiddleware = () => ({ dispatch, getState }) => next => action => {
  if (action.type === UPDATE_ALL_AMOUNTS) {
    const { categories } = getState().userReducer;
    const { transactions } = getState().appReducer;

    categories.forEach(category => {
      const { sum, spending, spendingByMonth } = sumAndSpendingOfParties(
        transactions,
        category.parties
      );
      dispatch(setSumOfCategory(sum, category.title));
      dispatch(setSpendingOfCategory(spending, category.title));
      dispatch(setSpendingByMonthOfCategory(spendingByMonth, category.title));
    });
  }

  return next(action);
};

export default amountServiceMiddleware;

// TODO update all amounts when user leaves categorization page
// TODO look if setSignificantParties should be moved out from FileTransactionReader
// TODO add instuctions on the visualization pages on what data is being shown
