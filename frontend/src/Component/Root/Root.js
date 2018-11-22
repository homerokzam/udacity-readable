import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  Button
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';

import SelectSorting from './SelectSorting';
import PostListitem from '../Posts/PostListItem';

import { getCategories, getPosts } from '../../Actions/RootActions';

class Root extends Component {
  constructor() {
    super();

    this.state = {
      selectedCategory: 'ALL'
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  selectCategory(name) {
    if (this.state.selectedCategory === name) {
      this.setState({ ...this.state, selectedCategory: 'ALL' });
    } else {
      this.setState({ ...this.state, selectedCategory: name });
    }
  }

  render() {
    const { categories, posts } = this.props;
    const { selectedCategory } = this.state;
    const filteredPosts = posts.filter(p => selectedCategory === 'ALL' ? true : p.category === selectedCategory);

    console.log('Root.render');
    //console.log(posts);

    return(
      <Grid container>
        <Grid item xs={12} className="RootHeader">
          <Typography>Category:</Typography>
          <Typography color="primary" className="RootCategory"> {selectedCategory} </Typography>
        </Grid>
        
        <Grid item xs={3} className="CategoriesContainer">
          <List>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <Typography>Categories</Typography>
            </ListItem>

            {categories &&
              categories.map(category => (
                <ListItem key={category.name} button onClick={() => this.selectCategory(category.name)} className={ category.name === this.state.selectedCategory ? 'SelectedCategory' : ''} >
                  <ListItemText className="CategoryName">
                    {category.name}
                  </ListItemText>
                </ListItem>
              ))}

          </List>
        </Grid>

        <Grid item xs={9} className="PostContainer">
          <Button variant="fab" color="primary" aria-label="Add" className="AddButton" >
            <AddIcon />
          </Button>
          <SelectSorting />
          {(!filteredPosts || !filteredPosts.length) && (
            <Card className="PostCardContainer">Nenhum post encontrado :(</Card>
          )}
          {filteredPosts && !!filteredPosts.length && (
            <List>
              {filteredPosts.map(p => (
                <PostListitem post={p} key={p.id} />
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  console.log('Root.mapStateToProsp');
  //console.log(state.root.posts);
  //console.log(state.root.sorting);

  return { categories: state.root.categories, posts: state.root.posts }
}
const mapDispatchToProps = dispatch => bindActionCreators({ getCategories, getPosts }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Root)