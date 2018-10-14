import RestaurantMenu from '@material-ui/icons/RestaurantMenu';

export class Category {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
}

const categories = [new Category('Restaurants', RestaurantMenu)];

export default categories;
