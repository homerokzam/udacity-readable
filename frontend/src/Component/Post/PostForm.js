import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TextField, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import uuidv1 from 'uuid/v1';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(this.props.post);
  }

  getInitialState(post) {

    const state = post 
    ? {
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    } : {
      title: '',
      body: '',
      author: '',
      category: '',
    };

    return state;
  }

  componentWillReceiveProps = ({ post }) => {
    this.setState(this.getInitialState(post));
  }

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { onSubmit, post } = this.props;
    const { title, body, author, category } = this.state;

    onSubmit({
      id: post ? post.id : uuidv1(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    });

    this.setState({
      title: '',
      body: '',
      author: '',
      category: ''
    });

  }
 
  render() {
    const { title, body, author, category } = this.state;
    const { classes, variant, categories } = this.props;

    const index = categories.findIndex(item => item.name === 'ALL');
    //console.log(index);
    if (index !== -1) {
      categories.splice(index, 1);
      //console.log(categories);
    }

    return (
      <ValidatorForm autoComplete="off" onSubmit={this.handleSubmit}>
        <TextValidator id="title" label="Title" multiline rows="1" fullWidth value={title} onChange={this.handleChange('title')}
          margin="normal" variant={variant} name="title" validators={['required']} errorMessages={['Este campo é obrigatório']}
        />
        <TextValidator id="body" label="Body" multiline rows="8" fullWidth value={body} onChange={this.handleChange('body')}
          margin="normal" variant={variant} name="body" validators={['required']} errorMessages={['Este campo é obrigatório']}
        />
        <TextValidator id="author" label="Author" multiline rows="1" fullWidth value={author} onChange={this.handleChange('author')}
          margin="normal" variant={variant} name="author" validators={['required']} errorMessages={['Este campo é obrigatório']}
        />
        <SelectValidator id="select-category" select label="Select" name="category" fullWidth value={category} onChange={this.handleChange('category')}
          validators={['required']} errorMessages={['Este campo é obrigatório']}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal" variant={variant}
        >
          {categories.map(category => (
            <MenuItem key={category.path} value={category.path}>
              {category.name}
            </MenuItem>
          ))}
        </SelectValidator>

        <div className={classes.submit}>
          <Button variant="outlined" color="default" className={classes.button} onClick={() => {this.props.history.goBack()}}>
            Back
          </Button> 
          <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Save
          </Button>
        </div>
      </ValidatorForm>
    )
  }
}

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
});

const mapStateToProps = state => ({ categories: state.categories.categories, posts: state.posts.posts });
export default withStyles(styles)(connect(mapStateToProps)(withRouter(PostForm)));