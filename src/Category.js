import Restaurant from '@material-ui/icons/Restaurant';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import FitnessCenter from '@material-ui/icons/FitnessCenter';

export class Category {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
}

export const categories = [
  new Category('Restaurants', Restaurant),
  new Category('Travelling', FlightTakeoff),
  new Category('Sports', FitnessCenter)
];

export default Category;
