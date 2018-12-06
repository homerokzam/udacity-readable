import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { v4 } from 'uuid';

import CommentForm from './CommentForm';
import { addComment } from '../../Actions/CommentActions';

class CommentAdd extends Component {

  handleOnSubmit (comment) {
    const { history, addComment, posts } = this.props;
    const post = posts.find(p => p.id === comment.parentId);

    //console.log('CommentAdd.handleOnSubmit');
    //console.log(comment);
    addComment(post, comment)
    history.goBack();//.push(`/posts/${comment.parentId}`);
  }

  render() { 
    const { id: parentId } = this.props.match.params;
    //console.log('CommentAdd.render');
    //console.log(parentId);
    //console.log(this.props.match.params);
    
    const comment = {
      id: v4(),
      parentId: parentId,
      timestamp: Date.now(),
      body: '',
      author: ''
    };

    return (
      <div>
        <CommentForm comment={comment} onSubmit={ (c) => { this.handleOnSubmit(c); } }/>
      </div>      
    );
  }
}

const mapStateToProps = state => ({ posts: state.posts.posts, comments: state.comments.comments });
const mapDispatchToProps = dispatch => bindActionCreators({ addComment }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CommentAdd);