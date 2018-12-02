import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import { updateComment } from '../../Actions/CommentActions';

class CommentEdit extends Component {
  
  handleOnSubmit (comment) {
    const { history, updateComment } = this.props;
    console.log('CommentEdit.handleOnSubmit');
    console.log(comment);
    updateComment(comment)
    history.push(`/posts/${comment.parentId}`);
  }

  render() { 
    const { comments } = this.props;
    const { id } = this.props.match.params;
    const comment = comments.find(p => p.id === id);
    //console.log(comment);

    return (
      <div>
        <CommentForm comment={comment} onSubmit={ (c) => { this.handleOnSubmit(c); } }/>
      </div>      
    );
  }
}
 
const mapStateToProps = state => ({ comments: state.comments.comments });
const mapDispatchToProps = dispatch => bindActionCreators({ updateComment }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);