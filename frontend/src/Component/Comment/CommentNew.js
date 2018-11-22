import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TextField, FormControl, Button } from '@material-ui/core';

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
    this.setState({ id: null, parentId: null, timestamp: null, body: '', author: '' });
  }

  render() {
    //console.log(this.props.history);

    return (
      <React.Fragment>
        <FormControl className="CommentForm">
          <TextField label="Name" value={this.state.author} onChange={evt => this.handleChange(evt.target.value, 'author')} />
          <TextField multiline label="Comment" value={this.state.body} onChange={evt => this.handleChange(evt.target.value, 'body')} />
          <Button onClick={() => this.handleSave()} color="primary">
            Comment!
          </Button>
        </FormControl>
      </React.Fragment>
    );
  }
}
 
const mapStateToProps = state => ({ posts: state.root.posts })
const mapDispatchToProps = dispatch => bindActionCreators({ addComment }, dispatch)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentNew));