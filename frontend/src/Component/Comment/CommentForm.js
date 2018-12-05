import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TextField, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import uuidv1 from 'uuid/v1';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

class CommentForm extends Component {
  constructor(props) {
    super(props);    
    this.state = this.getInitialState(this.props.comment);
    //console.log(this.state);
  }

  getInitialState(comment) {

    const state = comment 
    ? {
      author: comment.author,
      body: comment.body
    } : {
      author: '',
      body: ''
    };

    return state
  }

  componentWillReceiveProps = ({ comment }) => {
    this.setState(this.getInitialState(comment));
  }

  handleChange = (name) => event => {
    this.setState({ [name]: event.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { onSubmit, comment } = this.props;
    const { author, body } = this.state;

    onSubmit({
      id: comment ? comment.id : uuidv1(),
      author,
      body,
      parentId: comment.parentId
    });

    this.setState({ author: '', body: '' });
  }

  render() { 
    const { author, body } = this.state;
    const { classes } = this.props;

    return (
      <ValidatorForm autoComplete="off" onSubmit={this.handleSubmit}>
        <TextValidator id="author" label="Autor" multiline rows="1" fullWidth value={author} onChange={this.handleChange('author')}
          margin="normal" name="author" validators={['required']} errorMessages={['Este campo é obrigatório']}
        />
        <TextValidator id="comment" label="Comment" multiline rows="1" fullWidth value={body} onChange={this.handleChange('body')}
          margin="normal" name="Comment" validators={['required']} errorMessages={['Este campo é obrigatório']}
        />

        <div className={classes.submit}>
          <Button variant="outlined" color="default" className={classes.button} onClick={() => {this.props.history.goBack()}}>
            Back
          </Button> 
          <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Save
          </Button>
        </div>
      </ValidatorForm>
    );
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

const mapStateToProps = state => ({ posts: state.posts.posts, comments: state.comments.comments });
export default withStyles(styles)(connect(mapStateToProps)(withRouter(CommentForm)));