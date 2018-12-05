import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TextField, FormControl, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { v4 } from 'uuid';

import { addComment } from '../../Actions/CommentActions';

class CommentNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.post ? props.post.id : v4(),
      parentId: null,
      timestamp: props.post ? props.post.timestamp : Date.now(),
      body: '',
      author: ''
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { parentId } = this.props;
    this.setState({ ...this.state, parentId: parentId });
  }

  handleChange = (val, field) => {
    this.setState({ ...this.state, [field]: val });
  }

  handleSave = async () => {
    const { body, author } = this.state;
    if (!body || !author) {
      alert('Feel all fields!');
      return;
    }
    const id = '_' + Math.random().toString(36).substr(2, 9);

    await this.setState({ ...this.state, id: id, timestamp: new Date().getTime() });
    this.props.addComment(this.state);
    //this.setState({ id: null, parentId: null, timestamp: null, body: '', author: '' });
    this.props.history.goBack();
  }

  render() {
    //console.log(this.props.history);
    const { classes } = this.props;

    return (
      <React.Fragment>
        <FormControl className="CommentForm">
          <TextField label="Name" value={this.state.author} onChange={evt => this.handleChange(evt.target.value, 'author')} />
          <TextField multiline label="Comment" value={this.state.body} onChange={evt => this.handleChange(evt.target.value, 'body')} />
          <Button onClick={() => this.handleSave()} color="primary">
            Comment!
          </Button>
          <div className={classes.submit}>
            <Button variant="outlined" color="default" className={classes.button} onClick={() => {this.props.history.goBack()}}>
              Back
            </Button> 
            <Button variant="contained" color="primary" type="submit" className={classes.button}>
              Save
            </Button>
          </div>
        </FormControl>
      </React.Fragment>
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

const mapStateToProps = state => ({ posts: state.posts.posts })
const mapDispatchToProps = dispatch => bindActionCreators({ addComment }, dispatch)
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentNew)));