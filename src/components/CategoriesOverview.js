import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';

import {
  removeCategory as removeCategoryFromStore,
  addCategory as addCategoryFromStore
} from '../reducers/userReducer';

const Category = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;

  &:hover {
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
`;

const Container = styled.div`
  margin: 0 auto;
`;

// const CategoriesOverview = ({ categories, removeCategory, addCategory }) => {
class CategoriesOverview extends React.Component {
  state = {
    newCategory: 'Rent'
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
      <Category onClick={() => removeCategory(category.title)} key={category.title}>
        {category.title}
        <ClearIcon />
      </Category>
    ));
    return (
      <Container>
        <Typography variant="body2" gutterBottom>
          Now lets create some categories!
          <br />
          The parties you saw seconds ago will be added to these categories. To get you started we
          already created a few categories for you. Feel free to add or remove categories!
        </Typography>
        {categoriesList}
        <InputContainer>
          <TextField
            id="new-category-input"
            label="Add New Category"
            value={newCategory}
            onChange={this.handleChange('newCategory')}
          />
          <Button onClick={this.handleClick} variant="contained" component="span">
            Add New Category
          </Button>
        </InputContainer>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  categories: state.userReducer.categories
});

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

export default connect(
  mapStateToProps,
  {
    removeCategory: removeCategoryFromStore,
    addCategory: addCategoryFromStore
  }
)(CategoriesOverview);
