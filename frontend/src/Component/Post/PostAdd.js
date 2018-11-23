import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import { addPost } from '../../Actions/PostActions';

class PostAdd extends Component {
  render() { 
    const { addPost, history } = this.props;

    return (
      <div>
        <PostForm
          onSubmit={post => {
            addPost(post);
            history.push('/');
          }}
        />
      </div>
    );
  }
}
 
const mapDispatchToProps = dispatch => bindActionCreators({ addPost }, dispatch)
export default connect(null, mapDispatchToProps)(PostAdd);