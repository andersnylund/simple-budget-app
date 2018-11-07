import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: pointer;
  }
`;

// const CategoriesOverview = ({ categories, removeCategory, addCategory }) => {
class CategoriesOverview extends React.Component {
  state = {
    newCategory: 'Cat in the Hat'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick = () => {
    const { newCategory } = this.state;
    const { addCategory } = this.props;
    addCategory(newCategory);
  };

  render() {
    const { newCategory } = this.state;
    const { categories, removeCategory } = this.props;

    const categoriesList = categories.map(category => (
      <Container onClick={() => removeCategory(category.title)} key={category.title}>
        {category.title}
        <ClearIcon />
      </Container>
    ));
    return (
      <div>
        <Typography variant="subtitle1">Now lets create some categories!</Typography>
        <Typography variant="body2">
          The parties you saw seconds ago will be added to these categories. To get you started we
          already created a few categories for you. Feel free to add or remove categories!
        </Typography>
        {categoriesList}
        <TextField
          id="new-category-input"
          label="Create a new category"
          value={newCategory}
          onChange={this.handleChange('newCategory')}
        />
        <Button onClick={this.handleClick} variant="contained" component="span">
          Add Category
        </Button>
      </div>
    );
  }
}

CategoriesOverview.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      parties: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  removeCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired
};

export default CategoriesOverview;
