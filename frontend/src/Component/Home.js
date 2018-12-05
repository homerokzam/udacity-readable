import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Typography, List, ListItem, ListItemText, ListItemIcon, Card, Button } from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';

import SelectSorting from './SelectSorting';
import PostList from './Post/PostList';

import { getCategories } from '../Actions/CategoryActions';
import { getPosts } from '../Actions/PostActions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 'ALL'
    };
  }

  componentDidMount() {
    //this.props.getCategories();
    //this.props.getPosts();

    if (this.props.category)
      this.setState({ ...this.state, selectedCategory: this.props.category });
  }

  selectCategory(path) {
    //console.log('Home.selectCategory');
    //console.log(path);
    //console.log(this.props.history);
    this.props.history.push(`/${path}`);
    // if (this.state.selectedCategory === name) {
    //   this.setState({ ...this.state, selectedCategory: 'ALL' });
    // } else {
    //   this.setState({ ...this.state, selectedCategory: name });
    // }
  }

  handleAddPost() {
    this.props.history.push('newpost');
  }

  render() {
    const { categories, posts } = this.props;
    const { selectedCategory } = this.state;
    const filteredPosts = posts.filter(p => selectedCategory === 'ALL' ? true : p.category === selectedCategory);

    //console.log('Home.render');
    //console.log(categories);
    if (categories.findIndex(item => item.name === 'ALL') === -1)
      categories.push({ name: 'ALL', path: '' });

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
                <ListItem key={category.name} button onClick={() => this.selectCategory(category.path)} className={ category.name === this.state.selectedCategory ? 'SelectedCategory' : ''} >
                  <ListItemText className="CategoryName">
                    {category.name}
                  </ListItemText>
                </ListItem>
              ))}

          </List>
        </Grid>

        <Grid item xs={9} className="PostContainer">
          <Button variant="fab" color="primary" aria-label="Add" className="AddButton" onClick={() => this.handleAddPost()} >
            <AddIcon />
          </Button>
          <SelectSorting />
          {(!filteredPosts || !filteredPosts.length) && (
            <Card className="PostCardContainer">Nenhum post encontrado :(</Card>
          )}
          {filteredPosts && !!filteredPosts.length && (
            <List>
              {filteredPosts.map(p => (
                <PostList post={p} key={p.id} />
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  //console.log('Root.mapStateToProsp');
  //console.log(state.root.posts);
  //console.log(state.root.sorting);

  return { categories: state.categories.categories, posts: state.posts.posts }
}
const mapDispatchToProps = dispatch => bindActionCreators({ getCategories, getPosts }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)